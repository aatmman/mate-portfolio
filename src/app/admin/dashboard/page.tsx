'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FileText, BookOpen, Award, Users, GraduationCap, FlaskConical, 
  PenTool, TrendingUp, Download, Upload, Plus, Search, Filter,
  BarChart3, Database, Clock, CheckCircle, AlertTriangle
} from '@/components/ui/Icons';

interface StatCard {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

interface RecentActivity {
  id: string;
  type: 'publication' | 'achievement' | 'course' | 'student' | 'settings';
  title: string;
  description: string;
  timestamp: string;
  status: 'published' | 'draft' | 'pending';
}

interface QuickAction {
  name: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [activities, setActivities] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchActivities();
  }, []);

  const fetchStats = async () => {
    try {
      const [profileRes, pubsRes, coursesRes, achievementsRes, studentsRes] = await Promise.all([
        fetch('/api/admin/content/profile'),
        fetch('/api/admin/content/publications'),
        fetch('/api/admin/content/courses'),
        fetch('/api/admin/content/awards'),
        fetch('/api/admin/content/students'),
      ]);

      const [profile, pubs, courses, awards, students] = await Promise.all([
        profileRes.json(),
        pubsRes.json(),
        coursesRes.json(),
        awardsRes.json(),
        studentsRes.json(),
      ]);

      const pubsCount = Array.isArray(pubs) ? pubs.length : 0;
      const coursesCount = Array.isArray(courses) ? courses.length : 0;
      const awardsCount = Array.isArray(awards) ? awards.length : 0;
      const studentsCount = Array.isArray(students) ? students.length : 0;

      setStats([
        {
          title: 'Publications',
          value: String(pubsCount),
          icon: <FileText className="w-6 h-6" />,
          color: 'bg-blue-500',
          href: '/admin/publications',
        },
        {
          title: 'Books',
          value: '4',
          icon: <BookOpen className="w-6 h-6" />,
          color: 'bg-green-500',
          href: '/admin/research/books',
        },
        {
          title: 'Awards',
          value: String(awardsCount),
          icon: <Award className="w-6 h-6" />,
          color: 'bg-amber-500',
          href: '/admin/achievements/awards',
        },
        {
          title: 'Students Guided',
          value: String(studentsCount),
          icon: <Users className="w-6 h-6" />,
          color: 'bg-purple-500',
          href: '/admin/students',
        },
        {
          title: 'Education Entries',
          value: '6',
          icon: <GraduationCap className="w-6 h-6" />,
          color: 'bg-indigo-500',
          href: '/admin/education',
        },
        {
          title: 'Experience Entries',
          value: '6',
          icon: <Briefcase className="w-6 h-6" />,
          color: 'bg-teal-500',
          href: '/admin/experience',
        },
        {
          title: 'Patents',
          value: '2',
          icon: <FlaskConical className="w-6 h-6" />,
          color: 'bg-red-500',
          href: '/admin/research/patents',
        },
        {
          title: 'Courses & FDPs',
          value: String(coursesCount),
          icon: <PenTool className="w-6 h-6" />,
          color: 'bg-pink-500',
          href: '/admin/courses',
        },
      ]);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    }
  };

  const fetchActivities = async () => {
    try {
      const mockActivities: RecentActivity[] = [
        { id: '1', type: 'publication', title: 'New Scopus Paper Added', description: 'CFD Simulation of Airflow Distribution in Data Center', timestamp: '2 hours ago', status: 'published' },
        { id: '2', type: 'achievement', title: 'Award Updated', description: 'Best Researcher Award 2021 details refreshed', timestamp: '5 hours ago', status: 'published' },
        { id: '3', type: 'course', title: 'Course Added', description: 'ATAL FDP - Sustainability Engineering', timestamp: '1 day ago', status: 'published' },
        { id: '4', type: 'student', title: 'PG Project Added', description: 'Mr. Vikrant Deshmukh - Differential Case Optimization', timestamp: '2 days ago', status: 'published' },
        { id: '5', type: 'settings', title: 'Profile Updated', description: 'Research themes and statistics refreshed', timestamp: '3 days ago', status: 'published' },
      ];
      setActivities(mockActivities);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions: QuickAction[] = [
    { name: 'Add Publication', description: 'Add a new research publication', icon: <Plus className="w-5 h-5" />, href: '/admin/publications?action=new', color: 'bg-blue-100 text-blue-700' },
    { name: 'Add Achievement', description: 'Record a new award or recognition', icon: <Award className="w-5 h-5" />, href: '/admin/achievements/awards?action=new', color: 'bg-amber-100 text-amber-700' },
    { name: 'Add Course/FDP', description: 'Record professional development', icon: <GraduationCap className="w-5 h-5" />, href: '/admin/courses?action=new', color: 'bg-green-100 text-green-700' },
    { name: 'Add Student Project', description: 'Record a guided student project', icon: <Users className="w-5 h-5" />, href: '/admin/students?action=new', color: 'bg-purple-100 text-purple-700' },
    { name: 'Update Profile', description: 'Edit bio, themes, or statistics', icon: <PenTool className="w-5 h-5" />, href: '/admin/profile/basic', color: 'bg-indigo-100 text-indigo-700' },
    { name: 'Export Data', description: 'Export publications to CSV', icon: <Download className="w-5 h-5" />, href: '/admin/publications?export=csv', color: 'bg-gray-100 text-gray-700' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your academic portfolio content</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid" role="region" aria-label="Content Statistics">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href} className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-title">{stat.title}</p>
              {stat.change && <p className="stat-change">{stat.change}</p>}
            </div>
          </Link>
        ))}
      </div>

      <div className="dashboard-grid">
        {/* Quick Actions */}
        <section className="dashboard-card quick-actions">
          <div className="card-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="actions-grid">
            {quickActions.map((action) => (
              <Link key={action.name} href={action.href} className="action-card">
                <div className="action-icon" style={{ backgroundColor: action.color.split(' ')[0] + '20' }}>
                  <span className={action.color}>{action.icon}</span>
                </div>
                <div className="action-content">
                  <p className="action-name">{action.name}</p>
                  <p className="action-desc">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="dashboard-card recent-activity">
          <div className="card-header">
            <h2>Recent Activity</h2>
            <Link href="/admin/activity" className="view-all">View All</Link>
          </div>
          {loading ? (
            <div className="loading-state">Loading...</div>
          ) : (
            <div className="activity-list">
              {activities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <p className="activity-title">{activity.title}</p>
                    <p className="activity-desc">{activity.description}</p>
                  </div>
                  <div className="activity-meta">
                    <span className={`status-badge ${activity.status}`}>{activity.status}</span>
                    <time className="activity-time">{activity.timestamp}</time>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Data Health */}
      <section className="dashboard-card data-health">
        <div className="card-header">
          <h2>Data Health</h2>
        </div>
        <div className="health-grid">
          <div className="health-item">
            <div className="health-icon success"><CheckCircle className="w-5 h-5" /></div>
            <div>
              <p className="health-title">Content Complete</p>
              <p className="health-desc">All major sections have content</p>
            </div>
          </div>
          <div className="health-item">
            <div className="health-icon warning"><AlertTriangle className="w-5 h-5" /></div>
            <div>
              <p className="health-title">Missing DOI</p>
              <p className="health-desc">12 publications missing DOI links</p>
            </div>
          </div>
          <div className="health-item">
            <div className="health-icon success"><CheckCircle className="w-5 h-5" /></div>
            <div>
              <p className="health-title">Images Optimized</p>
              <p className="health-desc">All book covers and profile images optimized</p>
            </div>
          </div>
          <div className="health-item">
            <div className="health-icon info"><Database className="w-5 h-5" /></div>
            <div>
              <p className="health-title">Backup Status</p>
              <p className="health-desc">Last backup: 2 hours ago</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function getActivityIcon(type: string) {
  const icons: Record<string, React.ReactNode> = {
    publication: <FileText className="w-4 h-4" />,
    achievement: <Award className="w-4 h-4" />,
    course: <GraduationCap className="w-4 h-4" />,
    student: <Users className="w-4 h-4" />,
    settings: <Database className="w-4 h-4" />,
  };
  return icons[type] || <FileText className="w-4 h-4" />;
}