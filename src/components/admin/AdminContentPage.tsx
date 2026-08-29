'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Plus, Search, Filter, Download, Upload, Edit, Trash2, 
  Eye, MoreVertical, ChevronDown, ChevronUp, Loader2,
  FileText, X, Check, ArrowUpDown, Save, Copy
} from '@/components/ui/Icons';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, value: unknown) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

export interface AdminContentPageProps<T extends Record<string, unknown>> {
  collection: string;
  title: string;
  description?: string;
  columns: Column<T>[];
  getItemId: (item: T) => string;
  searchKeys?: (keyof T)[];
  filterOptions?: Record<string, string[]>;
  bulkActions?: Array<{ label: string; action: (ids: string[]) => Promise<void> }>;
  onCreate?: () => void;
  onEdit?: (item: T) => void;
  onView?: (item: T) => void;
  onDelete?: (item: T) => Promise<void>;
  onBulkImport?: () => void;
  onExport?: () => void;
  defaultSort?: { key: string; direction: 'asc' | 'desc' };
  pageSize?: number;
}

export default function AdminContentPage<T extends Record<string, unknown>>({
  collection,
  title,
  description,
  columns,
  getItemId,
  searchKeys = [],
  filterOptions = {},
  bulkActions = [],
  onCreate,
  onEdit,
  onView,
  onDelete,
  onBulkImport,
  onExport,
  defaultSort,
  pageSize = 25,
}: AdminContentPageProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<T[]>([]);
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>(
    defaultSort || { key: '', direction: 'asc' }
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<T>>({});
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<T[] | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content/${collection}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (error) {
      console.error(`Failed to fetch ${collection}:`, error);
    } finally {
      setLoading(false);
    }
  }, [collection]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    let result = [...data];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        searchKeys.some(key => 
          String(item[key] || '').toLowerCase().includes(query)
        )
      );
    }

    // Filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(item => String(item[key] || '') === value);
      }
    });

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aVal = String(a[sortConfig.key] || '');
        const bVal = String(b[sortConfig.key] || '');
        const comparison = aVal.localeCompare(bVal, undefined, { numeric: true });
        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }

    setFilteredData(result);
    setCurrentPage(1);
  }, [data, searchQuery, filters, sortConfig, searchKeys]);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectionChange = (id: string, checked: boolean) => {
    setSelectedIds(prev => checked ? [...prev, id] : prev.filter(i => i !== id));
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredData.map(getItemId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleDelete = async (item: T) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/content/${collection}?id=${getItemId(item)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchData();
      }
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleBulkAction = async (action: (ids: string[]) => Promise<void>) => {
    if (selectedIds.length === 0) return;
    setSaving(true);
    try {
      await action(selectedIds);
      setSelectedIds([]);
      fetchData();
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = async () => {
    if (onExport) {
      onExport();
      return;
    }
    
    // Default CSV export
    const headers = columns.map(c => c.header).join(',');
    const rows = filteredData.map(item => 
      columns.map(c => {
        const value = item[c.key as keyof T];
        const rendered = c.render ? c.render(item, value) : String(value || '');
        return `"${String(rendered).replace(/"/g, '""')}"`;
      }).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${collection}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (file: File) => {
    setImportFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(l => l.trim());
        const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
        const preview = lines.slice(1, 6).map(line => {
          const values = line.split(',').map(v => v.replace(/"/g, '').trim());
          const obj: Partial<T> = {};
          headers.forEach((h, i) => { obj[h as keyof T] = values[i] as any; });
          return obj as T;
        });
        setImportPreview(preview);
      } catch (error) {
        console.error('Import preview failed:', error);
      }
    };
    reader.readAsText(file);
  };

  const confirmImport = async () => {
    if (!importFile) return;
    setSaving(true);
    try {
      const text = await importFile.text();
      const lines = text.split('\n').filter(l => l.trim());
      const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim());
      const items = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.replace(/"/g, '').trim());
        const obj: Partial<T> = {};
        headers.forEach((h, i) => { obj[h as keyof T] = values[i] as any; });
        return obj as T;
      });
      
      const res = await fetch(`/api/admin/content/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'bulkImport', items }),
      });
      
      if (res.ok) {
        setShowImportModal(false);
        setImportFile(null);
        setImportPreview(null);
        fetchData();
      }
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setSaving(false);
    }
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredData.length / pageSize);

  return (
    <div className="admin-content-page">
      <div className="page-header">
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        <div className="page-actions">
          {onExport && (
            <button className="btn btn-secondary" onClick={onExport}>
              <Download className="w-4 h-4" /> Export
            </button>
          )}
          {onBulkImport && (
            <button className="btn btn-secondary" onClick={() => setShowImportModal(true)}>
              <Upload className="w-4 h-4" /> Import CSV
            </button>
          )}
          {onCreate && (
            <button className="btn btn-primary" onClick={onCreate}>
              <Plus className="w-4 h-4" /> Add New
            </button>
          )}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="toolbar">
        <div className="search-box">
          <Search className="w-4 h-4" />
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="w-4 h-4" />
          Filters
          {Object.values(filters).some(v => v) && (
            <span className="filter-badge">{Object.values(filters).filter(v => v).length}</span>
          )}
          {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>

        {showFilters && (
          <div className="filter-panel">
            {Object.entries(filterOptions).map(([key, options]) => (
              <div key={key} className="filter-group">
                <label>{key}</label>
                <select
                  value={filters[key] || ''}
                  onChange={(e) => setFilters(prev => ({ ...prev, [key]: e.target.value }))}
                  className="filter-select"
                >
                  <option value="">All</option>
                  {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            ))}
            <button className="btn btn-secondary btn-sm" onClick={() => setFilters({})}>
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="table-wrapper">
        {selectedIds.length > 0 && (
          <div className="bulk-bar">
            <span>{selectedIds.length} selected</span>
            <div className="bulk-actions">
              {bulkActions.map((action, i) => (
                <button key={i} className="btn btn-secondary btn-sm" onClick={() => handleBulkAction(action.action)}>
                  {action.label}
                </button>
              ))}
              <button className="btn btn-ghost btn-sm" onClick={() => setSelectedIds([])}>
                <X className="w-3 h-3" /> Clear
              </button>
            </div>
          </div>
        )}

        <table className="data-table" role="grid">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selectedIds.length === paginatedData.length && paginatedData.length > 0}
                  onChange={handleSelectAll}
                  aria-label="Select all"
                />
              </th>
              {columns.map((col, i) => (
                <th
                  key={i}
                  style={{ width: col.width }}
                  onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
                  className={col.sortable ? 'sortable' : ''}
                >
                  <div className="th-content">
                    <span>{col.header}</span>
                    {col.sortable && (
                      sortConfig.key === String(col.key) && (
                        sortConfig.direction === 'asc' 
                          ? <ChevronUp className="w-4 h-4" />
                          : <ChevronDown className="w-4 h-4" />
                      )
                    )}
                  </div>
                </th>
              ))}
              <th style={{ width: '100px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length + 2} className="loading-cell">
                <Loader2 className="w-6 h-6 animate-spin" /> Loading...
              </td></tr>
            ) : paginatedData.length === 0 ? (
              <tr><td colSpan={columns.length + 2} className="empty-cell">
                No records found
              </td></tr>
            ) : (
              paginatedData.map((item, rowIndex) => (
                <tr key={getItemId(item)}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(getItemId(item))}
                      onChange={(e) => handleSelectionChange(getItemId(item), e.target.checked)}
                    />
                  </td>
                  {columns.map((col, colIndex) => (
                    <td key={colIndex}>
                      {editingId === getItemId(item) && col.key !== 'actions' ? (
                        <input
                          type="text"
                          value={String(editForm[col.key as keyof T] || '')}
                          onChange={(e) => setEditForm(prev => ({ ...prev, [col.key]: e.target.value }))}
                          className="edit-input"
                          autoFocus
                        />
                      ) : (
                        col.render 
                          ? col.render(item, item[col.key as keyof T])
                          : String(item[col.key as keyof T] || '')
                      )}
                    </td>
                  ))}
                  <td>
                    <div className="action-menu">
                      {editingId === getItemId(item) ? (
                        <div className="edit-actions">
                          <button className="icon-btn success" onClick={() => { setEditingId(null); setEditForm({}); }}>
                            <Check className="w-4 h-4" />
                          </button>
                          <button className="icon-btn danger" onClick={() => { setEditingId(null); setEditForm({}); }}>
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <button className="icon-btn" onClick={() => onView?.(item)}>
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="icon-btn" onClick={() => { setEditForm(item as Partial<T>); setEditingId(getItemId(item)); }}>
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="icon-btn danger" onClick={() => handleDelete(item)}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of {totalPages} ({filteredData.length} total)
          </span>
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="modal-overlay" onClick={() => { setShowImportModal(false); setImportFile(null); setImportPreview(null); }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Import CSV</h3>
              <button className="icon-btn" onClick={() => { setShowImportModal(false); setImportFile(null); setImportPreview(null); }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="modal-body">
              {!importFile ? (
                <div className="import-dropzone" onClick={() => document.getElementById('csv-import')?.click()}>
                  <Upload className="w-12 h-12" />
                  <p>Click or drag CSV file here</p>
                  <input 
                    id="csv-import" 
                    type="file" 
                    accept=".csv" 
                    onChange={(e) => e.target.files?.[0] && handleImportFile(e.target.files[0])}
                    className="hidden"
                  />
                  <button className="btn btn-secondary btn-sm" onClick={() => document.getElementById('csv-import')?.click()}>
                    Choose File
                  </button>
                </div>
              ) : (
                <>
                  <div className="file-info">
                    <FileText className="w-5 h-5" />
                    <span>{importFile.name}</span>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setImportFile(null); setImportPreview(null); }}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  {importPreview && (
                    <div className="import-preview">
                      <p>Preview (first 5 rows):</p>
                      <table className="preview-table">
                        <thead>
                          <tr>{Object.keys(importPreview[0]).map(k => <th key={k}>{k}</th>)}</tr>
                        </thead>
                        <tbody>
                          {importPreview.map((row, i) => (
                            <tr key={i}>{Object.values(row).map((v, j) => <td key={j}>{String(v)}</td>)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  <div className="modal-actions">
                    <button className="btn btn-secondary" onClick={() => { setImportFile(null); setImportPreview(null); }}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={confirmImport} disabled={saving}>
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Import'}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}