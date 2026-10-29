'use client';
import { useState, useEffect } from 'react';
import { 
  Database, Download, RotateCcw, ExternalLink, CheckCircle2, 
  AlertCircle, Loader2, Shield, Key, User 
} from '@/components/ui/Icons';

export default function SettingsAdminPage() {
  const [storeData, setStoreData] = useState<Record<string, unknown[]>>({});
  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Active Username State
  const [currentUsername, setCurrentUsername] = useState('drmate');
  const [newUsernameInput, setNewUsernameInput] = useState('');
  const [updatingUsername, setUpdatingUsername] = useState(false);
  const [usernameError, setUsernameError] = useState<string | null>(null);
  const [usernameSuccess, setUsernameSuccess] = useState<string | null>(null);

  // Security & Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchCredentialsInfo = async () => {
    try {
      const res = await fetch('/api/admin/username');
      if (res.ok) {
        const data = await res.json();
        if (data.username) {
          setCurrentUsername(data.username);
        }
      }
    } catch {
      // Keep default
    }
  };

  const fetchStore = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/content/all');
      if (res.ok) {
        const json = await res.json();
        setStoreData(json);
      }
    } catch {
      showToast('Error loading database statistics', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
    fetchCredentialsInfo();
  }, []);

  const handleDownloadBackup = () => {
    const jsonStr = JSON.stringify(storeData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dr-mate-portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Portfolio backup JSON downloaded successfully!');
  };

  const handleResetToDefaults = async () => {
    if (!confirm('Are you sure you want to restore the original baseline resume data? Any customized entries will be reset.')) {
      return;
    }
    setResetting(true);
    try {
      const res = await fetch('/api/admin/content/all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reset' }),
      });
      if (res.ok) {
        showToast('Successfully restored initial resume baseline!');
        fetchStore();
      } else {
        showToast('Failed to reset store', 'error');
      }
    } catch {
      showToast('Network error during reset', 'error');
    } finally {
      setResetting(false);
    }
  };

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUsernameError(null);
    setUsernameSuccess(null);

    const clean = newUsernameInput.trim();
    if (clean.length < 3) {
      setUsernameError('Username must be at least 3 characters long.');
      return;
    }

    setUpdatingUsername(true);
    try {
      const res = await fetch('/api/admin/username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newUsername: clean }),
      });

      const data = await res.json();

      if (!res.ok) {
        setUsernameError(data.error || 'Failed to update username');
        return;
      }

      setCurrentUsername(clean);
      setNewUsernameInput('');
      setUsernameSuccess(`Username successfully updated to '${clean}'! Use this username to sign in.`);
      showToast(`Username updated to '${clean}'!`);
    } catch {
      setUsernameError('Network error while updating username. Please try again.');
    } finally {
      setUpdatingUsername(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    setUpdatingPassword(true);
    try {
      const res = await fetch('/api/admin/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        setPasswordError(data.error || 'Failed to update password');
        return;
      }

      setPasswordSuccess('Password updated successfully! Keep your new password secure.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      showToast('Admin password updated successfully!');
    } catch {
      setPasswordError('Network error while updating password. Please try again.');
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="admin-content-page">
      {/* Toast */}
      {toast && (
        <div className={`admin-toast ${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Settings &amp; Security</h1>
          <p>Manage faculty login credentials, username, password, backups, and data health</p>
        </div>
        <div className="page-actions">
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <ExternalLink className="w-4 h-4" /> View Live Site
          </a>
        </div>
      </div>

      {/* Security & Credentials Card */}
      <div style={{ background: 'var(--warm-white)', padding: '1.75rem', borderRadius: 12, border: '1px solid rgba(96,121,132,0.15)', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ width: 40, height: 40, background: 'rgba(5,150,105,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.2rem', color: 'var(--graphite)' }}>
              Faculty Login &amp; Security Credentials
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--steel)' }}>
              Dr. Dnyaneshwar M. Mate — Manage your administrative username and secure password
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Active Credentials Summary */}
          <div style={{ padding: '1.25rem', background: 'rgba(220,235,240,0.25)', borderRadius: 10, border: '1px solid rgba(96,121,132,0.12)' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--steel)', marginBottom: '1rem' }}>
              Active Login Details
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--steel)', display: 'block' }}>Primary Username</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--terracotta)', fontWeight: 700 }}>
                  {currentUsername}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--steel)', display: 'block' }}>Email Alias (Optional Alternative)</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--graphite)' }}>
                  dr.mate@dnyaneshwarmate.com
                </span>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--steel)', display: 'block' }}>Brute-Force Rate Limiter</span>
                <span style={{ fontSize: '0.8125rem', color: '#059669', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <CheckCircle2 className="w-3.5 h-3.5" /> 5 Max Attempts • 15-Min Lockout
                </span>
              </div>
            </div>
          </div>

          {/* Change Username Form */}
          <div style={{ padding: '1.25rem', background: 'var(--warm-white)', borderRadius: 10, border: '1px solid rgba(96,121,132,0.12)' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--steel)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User className="w-4 h-4 text-terracotta" /> Change Username
            </h4>

            {usernameSuccess && (
              <div className="alert alert-success" style={{ marginBottom: '0.75rem', padding: '0.65rem', fontSize: '0.8rem' }}>
                <CheckCircle2 className="w-4 h-4" /> {usernameSuccess}
              </div>
            )}

            {usernameError && (
              <div className="alert alert-error" style={{ marginBottom: '0.75rem', padding: '0.65rem', fontSize: '0.8rem' }}>
                <AlertCircle className="w-4 h-4" /> {usernameError}
              </div>
            )}

            <form onSubmit={handleUsernameSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--steel)', display: 'block', marginBottom: '0.25rem' }}>
                  New Username (Current: <strong>{currentUsername}</strong>)
                </label>
                <input
                  type="text"
                  value={newUsernameInput}
                  onChange={(e) => setNewUsernameInput(e.target.value)}
                  placeholder="e.g. drmate or profmate"
                  required
                  style={{ width: '100%', padding: '0.55rem 0.85rem', borderRadius: 6, border: '1px solid rgba(96,121,132,0.2)', fontSize: '0.875rem' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-sm" 
                disabled={updatingUsername}
                style={{ alignSelf: 'flex-start' }}
              >
                {updatingUsername ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...
                  </>
                ) : (
                  'Save Username'
                )}
              </button>
            </form>
          </div>

          {/* Change Password Form */}
          <div style={{ padding: '1.25rem', background: 'var(--warm-white)', borderRadius: 10, border: '1px solid rgba(96,121,132,0.12)' }}>
            <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--steel)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Key className="w-4 h-4 text-terracotta" /> Change Password
            </h4>

            {passwordSuccess && (
              <div className="alert alert-success" style={{ marginBottom: '0.75rem', padding: '0.65rem', fontSize: '0.8rem' }}>
                <CheckCircle2 className="w-4 h-4" /> {passwordSuccess}
              </div>
            )}

            {passwordError && (
              <div className="alert alert-error" style={{ marginBottom: '0.75rem', padding: '0.65rem', fontSize: '0.8rem' }}>
                <AlertCircle className="w-4 h-4" /> {passwordError}
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--steel)', display: 'block', marginBottom: '0.2rem' }}>Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                  required
                  style={{ width: '100%', padding: '0.45rem 0.75rem', borderRadius: 6, border: '1px solid rgba(96,121,132,0.2)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--steel)', display: 'block', marginBottom: '0.2rem' }}>New Password (min 8 chars)</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password"
                  required
                  style={{ width: '100%', padding: '0.45rem 0.75rem', borderRadius: 6, border: '1px solid rgba(96,121,132,0.2)', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: 'var(--steel)', display: 'block', marginBottom: '0.2rem' }}>Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  required
                  style={{ width: '100%', padding: '0.45rem 0.75rem', borderRadius: 6, border: '1px solid rgba(96,121,132,0.2)', fontSize: '0.85rem' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn btn-primary btn-sm" 
                disabled={updatingPassword}
                style={{ alignSelf: 'flex-start', marginTop: '0.25rem' }}
              >
                {updatingPassword ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
        {/* Backup Card */}
        <div style={{ background: 'var(--warm-white)', padding: '1.75rem', borderRadius: 12, border: '1px solid rgba(96,121,132,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: 40, height: 40, background: 'rgba(201,106,69,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--terracotta)' }}>
                <Download className="w-5 h-5" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.15rem', color: 'var(--graphite)' }}>Download Backup</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--steel)' }}>Export all portfolio records to JSON</p>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--graphite)', lineHeight: 1.4, marginBottom: '1.5rem' }}>
              Create an offline snapshot containing all publications, education, career entries, patents, courses, awards, and personal settings.
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleDownloadBackup} disabled={loading}>
            <Download className="w-4 h-4" /> Download JSON Backup
          </button>
        </div>

        {/* Restore Card */}
        <div style={{ background: 'var(--warm-white)', padding: '1.75rem', borderRadius: 12, border: '1px solid rgba(96,121,132,0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: 40, height: 40, background: 'rgba(96,121,132,0.1)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--steel)' }}>
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.15rem', color: 'var(--graphite)' }}>Restore Baseline Resume</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--steel)' }}>Revert back to original CV data</p>
              </div>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--graphite)', lineHeight: 1.4, marginBottom: '1.5rem' }}>
              Resets the data store back to the clean baseline extracted from Dr. Mate&apos;s original 15-page CV.
            </p>
          </div>
          <button className="btn btn-secondary" onClick={handleResetToDefaults} disabled={resetting}>
            {resetting ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
            Restore Default Baseline
          </button>
        </div>
      </div>

      {/* Storage & Collection Breakdown */}
      <div style={{ background: 'var(--warm-white)', padding: '1.75rem', borderRadius: 12, border: '1px solid rgba(96,121,132,0.15)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <Database className="w-5 h-5 text-terracotta" />
          <h3 style={{ fontFamily: 'var(--font-editorial)', fontSize: '1.15rem', color: 'var(--graphite)' }}>Content Store Overview (No Database Server Required)</h3>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--steel)', marginBottom: '1.5rem' }}>
          All data is stored directly in an atomic local file (<code style={{ background: 'rgba(96,121,132,0.1)', padding: '0.2rem 0.4rem', borderRadius: 4 }}>src/data/content-store.json</code>) with in-memory caching for zero latency.
        </p>

        {loading ? (
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <Loader2 className="w-6 h-6 animate-spin" style={{ margin: '0 auto 0.5rem', color: 'var(--terracotta)' }} />
            <p style={{ fontSize: '0.85rem', color: 'var(--steel)' }}>Inspecting collections...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
            {Object.entries(storeData).map(([colName, items]) => (
              <div key={colName} style={{ padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(96,121,132,0.12)', borderRadius: 8 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--steel)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {colName}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--graphite)', marginTop: '0.2rem' }}>
                  {Array.isArray(items) ? items.length : '1'} <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--steel)' }}>items</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
