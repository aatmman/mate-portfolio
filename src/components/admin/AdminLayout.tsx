'use client';
import { ReactNode, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, ExternalLink, Settings, UserCog, LogOut } from '@/components/ui/Icons';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Auto-close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
    setShowUserMenu(false);
  }, [pathname]);

  // Load preferences from localStorage
  useEffect(() => {
    const savedCollapsed = localStorage.getItem('admin-sidebar-collapsed');
    if (savedCollapsed) {
      setSidebarCollapsed(savedCollapsed === 'true');
    }
  }, []);

  const toggleSidebarCollapse = () => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    localStorage.setItem('admin-sidebar-collapsed', String(next));
  };

  const handleLogout = () => {
    fetch('/api/auth/logout', { method: 'POST' }).then(() => {
      router.push('/admin/login?logout=true');
      router.refresh();
    });
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={`admin-wrapper ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <header className="admin-header">
          <div className="admin-header-left">
            <button 
              className="mobile-menu-toggle" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation menu"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <div className="header-title">
              <h1>{getPageTitle(pathname)}</h1>
            </div>
          </div>
          
          <div className="header-actions">
            <Link href="/" target="_blank" className="icon-btn" title="View live portfolio site" aria-label="View live website">
              <ExternalLink className="w-5 h-5" />
            </Link>
            
            <div className="user-menu-wrapper">
              <button 
                className="user-menu-trigger"
                onClick={() => setShowUserMenu(!showUserMenu)}
                aria-expanded={showUserMenu}
                aria-label="User menu"
              >
                <div className="user-avatar">DM</div>
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <div style={{ padding: '0.625rem 0.875rem', borderBottom: '1px solid rgba(96, 121, 132, 0.12)' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--graphite)' }}>Dr. D. M. Mate</div>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--steel)' }}>Mechanical Eng. Dept.</div>
                  </div>
                  <Link href="/admin/profile/basic" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    <UserCog className="w-4 h-4" />
                    Profile Details
                  </Link>
                  <Link href="/admin/settings" className="dropdown-item" onClick={() => setShowUserMenu(false)}>
                    <Settings className="w-4 h-4" />
                    Settings &amp; Backup
                  </Link>
                  <hr />
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        
        <main className="admin-main">
          {children}
        </main>
      </div>
      
      {sidebarOpen && (
        <div 
          className="sidebar-overlay visible" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function getPageTitle(pathname: string): string {
  const titles: Record<string, string> = {
    '/admin/dashboard': 'Dashboard',
    '/admin/profile/basic': 'Profile - Basic Info',
    '/admin/profile/themes': 'Profile - Research Themes',
    '/admin/profile/stats': 'Profile - Statistics',
    '/admin/education': 'Education',
    '/admin/experience': 'Academic Career',
    '/admin/experience/admin': 'Admin Experience',
    '/admin/experience/contributions': 'Academic Contributions',
    '/admin/courses': 'Courses & FDPs',
    '/admin/research': 'Research Overview',
    '/admin/research/patents': 'Patents',
    '/admin/research/grants': 'Research Grants',
    '/admin/research/consultancy': 'Consultancy',
    '/admin/research/books': 'Books',
    '/admin/publications': 'Publications',
    '/admin/publications/conferences': 'Conference Papers',
    '/admin/students': 'Students Guided',
    '/admin/achievements/awards': 'Awards',
    '/admin/achievements/memberships': 'Memberships',
    '/admin/achievements/editorial': 'Editorial Roles',
    '/admin/achievements/conferences': 'Conferences Organized',
    '/admin/achievements/extracurricular': 'Extra-Curricular',
    '/admin/media': 'Media Library',
    '/admin/settings': 'Settings',
  };
  
  return titles[pathname] || 'Admin Portal';
}