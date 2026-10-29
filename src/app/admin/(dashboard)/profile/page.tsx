'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Save, Loader2, CheckCircle2, AlertCircle, Plus, Trash2, User, Sparkles, BarChart3, Mail, Phone, MapPin } from '@/components/ui/Icons';

interface StatItem {
  number: string;
  label: string;
}

interface ProfileData {
  id?: string;
  name: string;
  shortName: string;
  title: string;
  department: string;
  institution: string;
  location: string;
  email: string;
  phone: string;
  objective: string;
  statsNote: string;
  stats: StatItem[];
  keyStrengths: string[];
  researchThemes: string[];
}

export default function ProfileAdminPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'basic';

  const [activeTab, setActiveTab] = useState<'basic' | 'stats' | 'themes' | 'strengths'>(
    initialTab === 'stats' ? 'stats' : initialTab === 'themes' ? 'themes' : 'basic'
  );

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // New items temp inputs
  const [newTheme, setNewTheme] = useState('');
  const [newStrength, setNewStrength] = useState('');
  const [newStatNumber, setNewStatNumber] = useState('');
  const [newStatLabel, setNewStatLabel] = useState('');

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content/profile');
      if (res.ok) {
        const data = await res.json();
        const main = Array.isArray(data) ? data[0] : data;
        setProfile(main);
      } else {
        showToast('Failed to load profile', 'error');
      }
    } catch {
      showToast('Error loading profile data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!profile) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/content/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: profile.id || 'profile-main', ...profile }),
      });
      if (res.ok) {
        showToast('Profile information saved successfully!');
        fetchProfile();
      } else {
        const err = await res.json();
        showToast(err.error || 'Failed to save changes', 'error');
      }
    } catch {
      showToast('Error saving profile changes', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !profile) {
    return (
      <div className="admin-content-page" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ margin: '0 auto 1rem', color: 'var(--terracotta)' }} />
        <p style={{ color: 'var(--steel)' }}>Loading Profile Details...</p>
      </div>
    );
  }

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
          <h1>Profile &amp; Personal Info</h1>
          <p>Manage personal details, academic title, contact info, bio statement, and key stats</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => handleSave()} disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save All Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid rgba(96,121,132,0.15)', marginBottom: '2rem' }}>
        <button
          className={`btn ${activeTab === 'basic' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('basic')}
          style={{ borderRadius: '8px 8px 0 0' }}
        >
          <User className="w-4 h-4" /> Basic &amp; Contact
        </button>
        <button
          className={`btn ${activeTab === 'stats' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('stats')}
          style={{ borderRadius: '8px 8px 0 0' }}
        >
          <BarChart3 className="w-4 h-4" /> Statistics
        </button>
        <button
          className={`btn ${activeTab === 'themes' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('themes')}
          style={{ borderRadius: '8px 8px 0 0' }}
        >
          <Sparkles className="w-4 h-4" /> Research Themes
        </button>
        <button
          className={`btn ${activeTab === 'strengths' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('strengths')}
          style={{ borderRadius: '8px 8px 0 0' }}
        >
          Key Strengths
        </button>
      </div>

      {/* Tab 1: Basic & Contact */}
      {activeTab === 'basic' && (
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '840px' }}>
          <div style={{ background: 'var(--warm-white)', padding: '1.75rem', borderRadius: 12, border: '1px solid rgba(96,121,132,0.15)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile({ ...profile, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Short Name (for Navbar &amp; Badges)</label>
              <input
                type="text"
                value={profile.shortName}
                onChange={e => setProfile({ ...profile, shortName: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Professional Title</label>
              <input
                type="text"
                value={profile.title}
                onChange={e => setProfile({ ...profile, title: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                value={profile.department}
                onChange={e => setProfile({ ...profile, department: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Institution</label>
              <input
                type="text"
                value={profile.institution}
                onChange={e => setProfile({ ...profile, institution: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={e => setProfile({ ...profile, location: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ background: 'var(--warm-white)', padding: '1.75rem', borderRadius: 12, border: '1px solid rgba(96,121,132,0.15)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            <div className="form-group">
              <label><Mail className="w-3.5 h-3.5" style={{ display: 'inline', marginRight: 4 }} /> Email Address</label>
              <input
                type="email"
                value={profile.email}
                onChange={e => setProfile({ ...profile, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label><Phone className="w-3.5 h-3.5" style={{ display: 'inline', marginRight: 4 }} /> Phone Number</label>
              <input
                type="text"
                value={profile.phone}
                onChange={e => setProfile({ ...profile, phone: e.target.value })}
                required
              />
            </div>
          </div>

          <div style={{ background: 'var(--warm-white)', padding: '1.75rem', borderRadius: 12, border: '1px solid rgba(96,121,132,0.15)' }}>
            <div className="form-group">
              <label>Professional Objective / Bio Statement</label>
              <textarea
                rows={4}
                value={profile.objective}
                onChange={e => setProfile({ ...profile, objective: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Basic Info
            </button>
          </div>
        </form>
      )}

      {/* Tab 2: Statistics */}
      {activeTab === 'stats' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '840px' }}>
          <div style={{ background: 'var(--warm-white)', padding: '1.75rem', borderRadius: 12, border: '1px solid rgba(96,121,132,0.15)' }}>
            <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--graphite)' }}>
              Hero Banner Counter Statistics
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {profile.stats.map((st, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={st.number}
                    onChange={e => {
                      const updated = [...profile.stats];
                      updated[i].number = e.target.value;
                      setProfile({ ...profile, stats: updated });
                    }}
                    placeholder="e.g. 20+"
                    style={{ width: '110px' }}
                  />
                  <input
                    type="text"
                    value={st.label}
                    onChange={e => {
                      const updated = [...profile.stats];
                      updated[i].label = e.target.value;
                      setProfile({ ...profile, stats: updated });
                    }}
                    placeholder="e.g. Years of Experience"
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    className="icon-btn danger"
                    title="Remove stat"
                    onClick={() => {
                      const updated = profile.stats.filter((_, idx) => idx !== i);
                      setProfile({ ...profile, stats: updated });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add New Stat */}
            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px dashed rgba(96,121,132,0.2)', display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Number (e.g. 15+)"
                value={newStatNumber}
                onChange={e => setNewStatNumber(e.target.value)}
                style={{ width: '120px' }}
              />
              <input
                type="text"
                placeholder="Stat Label (e.g. Patents Filed)"
                value={newStatLabel}
                onChange={e => setNewStatLabel(e.target.value)}
                style={{ flex: 1 }}
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  if (newStatNumber && newStatLabel) {
                    setProfile({
                      ...profile,
                      stats: [...profile.stats, { number: newStatNumber, label: newStatLabel }],
                    });
                    setNewStatNumber('');
                    setNewStatLabel('');
                  }
                }}
              >
                <Plus className="w-4 h-4" /> Add Stat
              </button>
            </div>
          </div>

          <div style={{ background: 'var(--warm-white)', padding: '1.75rem', borderRadius: 12, border: '1px solid rgba(96,121,132,0.15)' }}>
            <div className="form-group">
              <label>Statistics Footnote Note</label>
              <textarea
                rows={2}
                value={profile.statsNote}
                onChange={e => setProfile({ ...profile, statsNote: e.target.value })}
              />
            </div>
          </div>

          <div>
            <button type="button" className="btn btn-primary" onClick={() => handleSave()} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Statistics
            </button>
          </div>
        </div>
      )}

      {/* Tab 3: Research Themes */}
      {activeTab === 'themes' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '840px' }}>
          <div style={{ background: 'var(--warm-white)', padding: '1.75rem', borderRadius: 12, border: '1px solid rgba(96,121,132,0.15)' }}>
            <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--graphite)' }}>
              Specialized Research Themes
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {profile.researchThemes.map((th, i) => (
                <div
                  key={i}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(220,235,240,0.45)',
                    border: '1px solid rgba(96,121,132,0.25)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 6,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                  }}
                >
                  <span>{th}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const updated = profile.researchThemes.filter((_, idx) => idx !== i);
                      setProfile({ ...profile, researchThemes: updated });
                    }}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--terracotta)', padding: 0 }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                placeholder="Add new research theme (e.g. Nanotechnology, Cryogenics)..."
                value={newTheme}
                onChange={e => setNewTheme(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newTheme.trim()) {
                      setProfile({ ...profile, researchThemes: [...profile.researchThemes, newTheme.trim()] });
                      setNewTheme('');
                    }
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  if (newTheme.trim()) {
                    setProfile({ ...profile, researchThemes: [...profile.researchThemes, newTheme.trim()] });
                    setNewTheme('');
                  }
                }}
              >
                <Plus className="w-4 h-4" /> Add Theme
              </button>
            </div>
          </div>

          <div>
            <button type="button" className="btn btn-primary" onClick={() => handleSave()} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Research Themes
            </button>
          </div>
        </div>
      )}

      {/* Tab 4: Key Strengths */}
      {activeTab === 'strengths' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '840px' }}>
          <div style={{ background: 'var(--warm-white)', padding: '1.75rem', borderRadius: 12, border: '1px solid rgba(96,121,132,0.15)' }}>
            <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--graphite)' }}>
              Professional Key Strengths &amp; Highlights
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.5rem' }}>
              {profile.keyStrengths.map((str, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={str}
                    onChange={e => {
                      const updated = [...profile.keyStrengths];
                      updated[i] = e.target.value;
                      setProfile({ ...profile, keyStrengths: updated });
                    }}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    className="icon-btn danger"
                    title="Remove item"
                    onClick={() => {
                      const updated = profile.keyStrengths.filter((_, idx) => idx !== i);
                      setProfile({ ...profile, keyStrengths: updated });
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                placeholder="Add new strength / highlight..."
                value={newStrength}
                onChange={e => setNewStrength(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newStrength.trim()) {
                      setProfile({ ...profile, keyStrengths: [...profile.keyStrengths, newStrength.trim()] });
                      setNewStrength('');
                    }
                  }
                }}
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  if (newStrength.trim()) {
                    setProfile({ ...profile, keyStrengths: [...profile.keyStrengths, newStrength.trim()] });
                    setNewStrength('');
                  }
                }}
              >
                <Plus className="w-4 h-4" /> Add Highlight
              </button>
            </div>
          </div>

          <div>
            <button type="button" className="btn btn-primary" onClick={() => handleSave()} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Strengths
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
