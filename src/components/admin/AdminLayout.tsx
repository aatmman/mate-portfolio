'use client';
import { ReactNode, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, Bell, Moon, Sun, HelpCircle, UserCog, LogOut } from '@/components/ui/Icons';
import AdminSidebar from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('admin-dark-mode');
    if (saved) {
      setDarkMode(saved === 'true');
      document.documentElement.classList.toggle('dark', saved === 'true');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('admin-dark-mode', String(newMode));
    document.documentElement.classList.toggle('dark', newMode);
  };

  const handleLogout = () => {
    fetch('/api/auth/logout', { method: 'POST' }).then(() => {
      router.push('/admin/login');
      router.refresh();
    });
  };

  return (
    <div className="admin-layout">
      <AdminSidebar />
      
      <header className="admin-header">
        <button 
          className="mobile-menu-toggle" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        
        <div className="header-title">
          <h1>{getPageTitle(pathname)}</h1>
        </div>
        
        <div className="header-actions">
          <button className="icon-btn" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          
          <button className="icon-btn" aria-label="Notifications">
            <Bell className="w-5 h-5" />
            <span className="notification-badge">3</span>
          </button>
          
          <div className="user-menu-wrapper">
            <button 
              className="user-menu-trigger"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-expanded={showUserMenu}
            >
              <div className="user-avatar">DM</div>
            </button>
            {showUserMenu && (
              <div className="user-dropdown">
                <Link href="/admin/profile/basic" className="dropdown-item">
                  <UserCog className="w-4 h-4" />
                  Profile Settings
                </Link>
                <Link href="/admin/settings" className="dropdown-item">
                  <HelpCircle className="w-4 h-4" />
                  Settings
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
      
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
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