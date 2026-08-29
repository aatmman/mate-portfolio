'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, GraduationCap, Briefcase, FlaskConical, BookOpen, Award, 
  Users, Settings, FileText, PenTool, Database, LogOut, ChevronDown, 
  ChevronRight, User, Shield, Key
} from '@/components/ui/Icons';

const navigation = [
  { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { 
    name: 'Profile', 
    href: '/admin/profile', 
    icon: User,
    children: [
      { name: 'Basic Info', href: '/admin/profile/basic' },
      { name: 'Research Themes', href: '/admin/profile/themes' },
      { name: 'Statistics', href: '/admin/profile/stats' },
    ]
  },
  { 
    name: 'Academics & Experience', 
    icon: GraduationCap,
    children: [
      { name: 'Education', href: '/admin/education' },
      { name: 'Academic Career', href: '/admin/experience' },
      { name: 'Admin Experience', href: '/admin/experience/admin' },
      { name: 'Academic Contributions', href: '/admin/experience/contributions' },
      { name: 'Courses & FDPs', href: '/admin/courses' },
    ]
  },
  { 
    name: 'Research & Publications', 
    icon: FlaskConical,
    children: [
      { name: 'Research Overview', href: '/admin/research' },
      { name: 'Patents', href: '/admin/research/patents' },
      { name: 'Research Grants', href: '/admin/research/grants' },
      { name: 'Consultancy', href: '/admin/research/consultancy' },
      { name: 'Books', href: '/admin/research/books' },
      { name: 'Publications', href: '/admin/publications' },
      { name: 'Conference Papers', href: '/admin/publications/conferences' },
      { name: 'Students Guided', href: '/admin/students' },
    ]
  },
  { 
    name: 'Achievements', 
    icon: Award,
    children: [
      { name: 'Awards', href: '/admin/achievements/awards' },
      { name: 'Memberships', href: '/admin/achievements/memberships' },
      { name: 'Editorial Roles', href: '/admin/achievements/editorial' },
      { name: 'Conferences Organized', href: '/admin/achievements/conferences' },
      { name: 'Extra-Curricular', href: '/admin/achievements/extracurricular' },
    ]
  },
  { name: 'Media Library', href: '/admin/media', icon: Database },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSection = (sectionName: string) => {
    setOpenSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(s => s !== sectionName)
        : [...prev, sectionName]
    );
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`} aria-label="Admin navigation">
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-brand">
            <div className="brand-icon">
              <Shield className="w-6 h-6" />
            </div>
            <span>Admin Portal</span>
          </div>
        )}
        <button
          className="collapse-toggle"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navigation.map((item) => {
          const hasChildren = 'children' in item && item.children;
          const isOpen = hasChildren && openSections.includes(item.name);
          const active = hasChildren 
            ? item.children?.some(child => isActive(child.href))
            : isActive(item.href);

          if (hasChildren) {
            return (
              <details key={item.name} className="nav-section" open={isOpen}>
                <summary className={`nav-section-header ${active ? 'active' : ''}`} onClick={(e) => {
                  e.preventDefault();
                  toggleSection(item.name!);
                }}>
                  <item.icon className="w-5 h-5" />
                  {!collapsed && <span>{item.name}</span>}
                  {!collapsed && <ChevronDown className={`w-4 h-4 ${isOpen ? 'rotate-180' : ''}`} />}
                </summary>
                {!collapsed && (
                  <ul className="nav-submenu">
                    {item.children!.map((child) => (
                      <li key={child.name}>
                        <Link
                          href={child.href}
                          className={`nav-link ${isActive(child.href) ? 'active' : ''}`}
                        >
                          {child.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </details>
            );
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`nav-link ${active ? 'active' : ''}`}
            >
              <item.icon className="w-5 h-5" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && (
          <div className="user-info">
            <div className="user-avatar">
              <User className="w-5 h-5" />
            </div>
            <div className="user-details">
              <p className="user-name">Dr. D. M. Mate</p>
              <p className="user-role">Administrator</p>
            </div>
          </div>
        )}
        <Link href="/admin/login?logout=true" className="logout-link">
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Logout</span>}
        </Link>
      </div>
    </aside>
  );
}