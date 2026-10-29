'use client';
import { useEffect, useState, useCallback, ReactNode } from 'react';
import { 
  Plus, Search, Filter, Download, Upload, Edit, Trash2, 
  Eye, ChevronDown, ChevronUp, Loader2,
  FileText, X, Check, CheckCircle2, AlertCircle
} from '@/components/ui/Icons';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T, value: unknown) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  formType?: 'text' | 'textarea' | 'number' | 'select' | 'checkbox';
  formOptions?: string[];
  required?: boolean;
  placeholder?: string;
  editable?: boolean;
}

export interface AdminContentPageProps<T extends object> {
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

export default function AdminContentPage<T extends object>({
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
  
  // Inline edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, unknown>>({});

  // Full Modal Create/Edit state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [modalForm, setModalForm] = useState<Record<string, unknown>>({});
  const [activeItem, setActiveItem] = useState<T | null>(null);

  // View modal state
  const [viewItem, setViewItem] = useState<T | null>(null);

  // CSV Import state
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPreview, setImportPreview] = useState<T[] | null>(null);

  // Toast feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/content/${collection}`);
      if (res.ok) {
        const json = await res.json();
        setData(Array.isArray(json) ? json : []);
      } else {
        showToast(`Failed to load ${title}`, 'error');
      }
    } catch (error) {
      console.error(`Failed to fetch ${collection}:`, error);
      showToast(`Network error loading ${title}`, 'error');
    } finally {
      setLoading(false);
    }
  }, [collection, title]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filtering & Sorting
  useEffect(() => {
    let result = [...data];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        searchKeys.length > 0
          ? searchKeys.some(key => String(item[key] || '').toLowerCase().includes(query))
          : Object.values(item).some(val => String(val || '').toLowerCase().includes(query))
      );
    }

    // Filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        result = result.filter(item => String((item as Record<string, unknown>)[key] || '') === value);
      }
    });

    // Sort
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aVal = String((a as Record<string, unknown>)[sortConfig.key] || '');
        const bVal = String((b as Record<string, unknown>)[sortConfig.key] || '');
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

  // Open Create Modal
  const handleOpenCreate = () => {
    if (onCreate) {
      onCreate();
      return;
    }
    const initialForm: Record<string, unknown> = {};
    columns.forEach(col => {
      if (col.key !== 'id' && col.editable !== false) {
        if (col.formType === 'checkbox') initialForm[col.key as string] = false;
        else if (col.formType === 'number') initialForm[col.key as string] = new Date().getFullYear();
        else initialForm[col.key as string] = '';
      }
    });
    setModalForm(initialForm);
    setModalMode('create');
    setActiveItem(null);
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: T) => {
    if (onEdit) {
      onEdit(item);
      return;
    }
    const formVals: Record<string, unknown> = {};
    columns.forEach(col => {
      const val = (item as Record<string, unknown>)[col.key as string];
      formVals[col.key as string] = val !== undefined ? val : '';
    });
    setModalForm(formVals);
    setModalMode('edit');
    setActiveItem(item);
    setIsModalOpen(true);
  };

  // Save Modal (Create or Edit)
  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (modalMode === 'create') {
        const res = await fetch(`/api/admin/content/${collection}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(modalForm),
        });
        if (res.ok) {
          showToast(`Successfully added to ${title}`);
          setIsModalOpen(false);
          fetchData();
        } else {
          const err = await res.json();
          showToast(err.error || 'Failed to create entry', 'error');
        }
      } else if (modalMode === 'edit' && activeItem) {
        const id = getItemId(activeItem);
        const res = await fetch(`/api/admin/content/${collection}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, ...modalForm }),
        });
        if (res.ok) {
          showToast(`Updated ${title} entry successfully`);
          setIsModalOpen(false);
          fetchData();
        } else {
          const err = await res.json();
          showToast(err.error || 'Failed to update entry', 'error');
        }
      }
    } catch (err) {
      console.error('Modal submit error:', err);
      showToast('Network error while saving', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Delete Action
  const handleDelete = async (item: T) => {
    if (!confirm('Are you sure you want to delete this entry? This action cannot be undone.')) return;
    setSaving(true);
    try {
      if (onDelete) {
        await onDelete(item);
        showToast('Entry deleted successfully');
        fetchData();
        return;
      }

      const res = await fetch(`/api/admin/content/${collection}?id=${encodeURIComponent(getItemId(item))}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast('Entry deleted successfully');
        fetchData();
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to delete entry', 'error');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      showToast('Error deleting entry', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Inline Save
  const handleSaveInline = async (item: T) => {
    setSaving(true);
    try {
      const id = getItemId(item);
      const res = await fetch(`/api/admin/content/${collection}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...editForm }),
      });
      if (res.ok) {
        showToast('Entry updated');
        setEditingId(null);
        setEditForm({});
        fetchData();
      } else {
        showToast('Failed to save inline edit', 'error');
      }
    } catch (err) {
      console.error('Failed to save inline edit:', err);
      showToast('Error saving changes', 'error');
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
      showToast(`Bulk action executed for ${selectedIds.length} items`);
      fetchData();
    } catch (error) {
      console.error('Bulk action failed:', error);
      showToast('Bulk action failed', 'error');
    } finally {
      setSaving(false);
    }
  };

  // CSV Export
  const handleExport = async () => {
    if (onExport) {
      onExport();
      return;
    }
    const exportCols = columns.filter(c => c.key !== 'actions');
    const headers = exportCols.map(c => c.header).join(',');
    const rows = filteredData.map(item => 
      exportCols.map(c => {
        const value = item[c.key as keyof T];
        return `"${String(value !== undefined && value !== null ? value : '').replace(/"/g, '""')}"`;
      }).join(',')
    );
    const csv = [headers, ...rows].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${collection}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported CSV file');
  };

  // CSV Import
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
          const obj: Record<string, unknown> = {};
          headers.forEach((h, i) => { obj[h] = values[i]; });
          return obj as unknown as T;
        });
        setImportPreview(preview);
      } catch (error) {
        console.error('Import preview failed:', error);
        showToast('Could not parse CSV', 'error');
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
        const obj: Record<string, unknown> = {};
        headers.forEach((h, i) => { obj[h] = values[i]; });
        return obj;
      });
      
      const res = await fetch(`/api/admin/content/${collection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'bulkImport', items }),
      });
      
      if (res.ok) {
        const data = await res.json();
        showToast(`Imported ${data.created || items.length} records successfully!`);
        setShowImportModal(false);
        setImportFile(null);
        setImportPreview(null);
        fetchData();
      } else {
        showToast('Failed to import records', 'error');
      }
    } catch (error) {
      console.error('Import failed:', error);
      showToast('Error during CSV import', 'error');
    } finally {
      setSaving(false);
    }
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;

  return (
    <div className="admin-content-page">
      {/* Toast Feedback */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>{title}</h1>
          {description && <p>{description}</p>}
        </div>
        <div className="page-actions">
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="btn btn-secondary" onClick={() => setShowImportModal(true)}>
            <Upload className="w-4 h-4" /> Import CSV
          </button>
          <button className="btn btn-primary" onClick={handleOpenCreate}>
            <Plus className="w-4 h-4" /> Add New
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="toolbar">
        <div className="search-box">
          <Search className="w-4 h-4" />
          <input
            type="search"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        {Object.keys(filterOptions).length > 0 && (
          <div className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            <Filter className="w-4 h-4" />
            Filters
            {Object.values(filters).some(v => v) && (
              <span className="filter-badge">{Object.values(filters).filter(v => v).length}</span>
            )}
            {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        )}

        {showFilters && Object.keys(filterOptions).length > 0 && (
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
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              {columns.map((col, index) => (
                <th 
                  key={index} 
                  style={{ width: col.width }}
                  onClick={() => col.sortable && handleSort(col.key as string)}
                  className={col.sortable ? 'sortable' : ''}
                >
                  <div className="th-content">
                    <span>{col.header}</span>
                    {col.sortable && sortConfig.key === col.key && (
                      <span className="sort-icon">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
              ))}
              <th style={{ width: '110px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 2} className="loading-cell">
                  <div className="loading-state">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Loading data...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 2} className="empty-cell">
                  <div className="empty-state">
                    <FileText className="w-12 h-12 text-steel" />
                    <p>No entries found</p>
                    <button className="btn btn-primary btn-sm" onClick={handleOpenCreate}>
                      <Plus className="w-4 h-4" /> Add First Item
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item, rowIndex) => {
                const itemId = getItemId(item);
                const isEditingThis = editingId === itemId;

                return (
                  <tr key={itemId || rowIndex} className={selectedIds.includes(itemId) ? 'selected' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(itemId)}
                        onChange={(e) => handleSelectionChange(itemId, e.target.checked)}
                      />
                    </td>
                    {columns.map((col, colIndex) => (
                      <td key={colIndex}>
                        {isEditingThis && col.key !== 'id' && col.editable !== false ? (
                          <input
                            type="text"
                            value={String(editForm[col.key as string] !== undefined ? editForm[col.key as string] : '')}
                            onChange={(e) => setEditForm(prev => ({ ...prev, [col.key as string]: e.target.value }))}
                            className="edit-input"
                            autoFocus={colIndex === 0}
                          />
                        ) : (
                          col.render 
                            ? col.render(item, item[col.key as keyof T])
                            : String(item[col.key as keyof T] !== undefined && item[col.key as keyof T] !== null ? item[col.key as keyof T] : '—')
                        )}
                      </td>
                    ))}
                    <td>
                      <div className="action-menu" style={{ justifyContent: 'center' }}>
                        {isEditingThis ? (
                          <div className="edit-actions">
                            <button className="icon-btn success" title="Save" onClick={() => handleSaveInline(item)} disabled={saving}>
                              <Check className="w-4 h-4" />
                            </button>
                            <button className="icon-btn danger" title="Cancel" onClick={() => { setEditingId(null); setEditForm({}); }}>
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <button className="icon-btn" title="View details" onClick={() => {
                              if (onView) onView(item);
                              else setViewItem(item);
                            }}>
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="icon-btn" title="Edit entry" onClick={() => handleOpenEdit(item)}>
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="icon-btn danger" title="Delete entry" onClick={() => handleDelete(item)} disabled={saving}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
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
            Page {currentPage} of {totalPages} ({filteredData.length} items total)
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

      {/* Create / Edit Modal Dialog */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '640px' }}>
            <div className="modal-header">
              <h3>{modalMode === 'create' ? `Add New ${title}` : `Edit ${title} Entry`}</h3>
              <button className="icon-btn" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveModal}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '68vh', overflowY: 'auto' }}>
                {columns
                  .filter(c => c.key !== 'id' && c.key !== 'actions' && c.editable !== false)
                  .map((col, idx) => {
                    const key = col.key as string;
                    const val = modalForm[key];

                    return (
                      <div key={idx} className="form-group">
                        <label>
                          {col.header}
                          {col.required && <span style={{ color: 'var(--terracotta)', marginLeft: 4 }}>*</span>}
                        </label>
                        {col.formType === 'textarea' ? (
                          <textarea
                            value={String(val !== undefined && val !== null ? val : '')}
                            onChange={(e) => setModalForm(prev => ({ ...prev, [key]: e.target.value }))}
                            placeholder={col.placeholder || `Enter ${col.header.toLowerCase()}...`}
                            required={col.required}
                            rows={3}
                          />
                        ) : col.formType === 'select' && col.formOptions ? (
                          <select
                            value={String(val !== undefined && val !== null ? val : '')}
                            onChange={(e) => setModalForm(prev => ({ ...prev, [key]: e.target.value }))}
                            required={col.required}
                          >
                            <option value="">Select an option...</option>
                            {col.formOptions.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : col.formType === 'checkbox' ? (
                          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'none', letterSpacing: 'normal' }}>
                            <input
                              type="checkbox"
                              checked={Boolean(val)}
                              onChange={(e) => setModalForm(prev => ({ ...prev, [key]: e.target.checked }))}
                              style={{ width: 'auto' }}
                            />
                            <span>{col.header}</span>
                          </label>
                        ) : (
                          <input
                            type={col.formType === 'number' ? 'number' : 'text'}
                            value={String(val !== undefined && val !== null ? val : '')}
                            onChange={(e) => setModalForm(prev => ({ ...prev, [key]: col.formType === 'number' ? Number(e.target.value) : e.target.value }))}
                            placeholder={col.placeholder || `Enter ${col.header.toLowerCase()}...`}
                            required={col.required}
                          />
                        )}
                      </div>
                    );
                  })}
              </div>
              <div className="modal-actions" style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(96,121,132,0.12)', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : modalMode === 'create' ? 'Create Entry' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Item Modal */}
      {viewItem && (
        <div className="modal-overlay" onClick={() => setViewItem(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '580px' }}>
            <div className="modal-header">
              <h3>{title} Details</h3>
              <button className="icon-btn" onClick={() => setViewItem(null)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {Object.entries(viewItem).map(([k, v]) => (
                <div key={k} style={{ borderBottom: '1px solid rgba(96,121,132,0.08)', paddingBottom: '0.5rem' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--steel)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {k}
                  </div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', color: 'var(--graphite)', marginTop: '0.2rem', wordBreak: 'break-word' }}>
                    {typeof v === 'boolean' ? (v ? 'Yes' : 'No') : typeof v === 'object' ? JSON.stringify(v) : String(v || '—')}
                  </div>
                </div>
              ))}
            </div>
            <div className="modal-actions" style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(96,121,132,0.12)', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary" onClick={() => setViewItem(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {showImportModal && (
        <div className="modal-overlay" onClick={() => { setShowImportModal(false); setImportFile(null); setImportPreview(null); }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Import CSV to {title}</h3>
              <button className="icon-btn" onClick={() => { setShowImportModal(false); setImportFile(null); setImportPreview(null); }}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="modal-body">
              {!importFile ? (
                <div className="import-dropzone" onClick={() => document.getElementById('csv-import')?.click()}>
                  <Upload className="w-12 h-12" style={{ margin: '0 auto 0.75rem', color: 'var(--terracotta)' }} />
                  <p style={{ fontWeight: 500, color: 'var(--graphite)' }}>Click to upload a CSV file</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--steel)', marginTop: '0.25rem' }}>Column names in the first row should match entry fields</p>
                  <input 
                    id="csv-import" 
                    type="file" 
                    accept=".csv" 
                    onChange={(e) => e.target.files?.[0] && handleImportFile(e.target.files[0])}
                    style={{ display: 'none' }}
                  />
                  <button type="button" className="btn btn-secondary btn-sm" style={{ marginTop: '1rem' }} onClick={() => document.getElementById('csv-import')?.click()}>
                    Select File
                  </button>
                </div>
              ) : (
                <>
                  <div className="file-info" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', background: 'rgba(96,121,132,0.08)', borderRadius: 8, marginBottom: '1rem' }}>
                    <FileText className="w-5 h-5 text-terracotta" />
                    <span style={{ flex: 1, fontWeight: 500 }}>{importFile.name}</span>
                    <button className="btn btn-ghost btn-sm" onClick={() => { setImportFile(null); setImportPreview(null); }}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  {importPreview && importPreview.length > 0 && (
                    <div className="import-preview" style={{ marginBottom: '1rem' }}>
                      <p style={{ fontSize: '0.8rem', color: 'var(--steel)', marginBottom: '0.5rem' }}>Preview (first 5 rows):</p>
                      <div style={{ overflowX: 'auto', border: '1px solid rgba(96,121,132,0.15)', borderRadius: 6 }}>
                        <table className="preview-table" style={{ width: '100%', fontSize: '0.75rem' }}>
                          <thead>
                            <tr style={{ background: 'var(--warm-white)' }}>{Object.keys(importPreview[0]).map(k => <th key={k} style={{ padding: '0.4rem 0.6rem', textAlign: 'left' }}>{k}</th>)}</tr>
                          </thead>
                          <tbody>
                            {importPreview.map((row, i) => (
                              <tr key={i} style={{ borderTop: '1px solid rgba(96,121,132,0.1)' }}>{Object.values(row).map((v, j) => <td key={j} style={{ padding: '0.4rem 0.6rem' }}>{String(v)}</td>)}</tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  <div className="modal-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                    <button className="btn btn-secondary" onClick={() => { setImportFile(null); setImportPreview(null); }}>
                      Cancel
                    </button>
                    <button className="btn btn-primary" onClick={confirmImport} disabled={saving}>
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Confirm Import'}
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