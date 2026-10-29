'use client';
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Eye, EyeOff, AlertCircle, Loader2 } from '@/components/ui/Icons';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLogout = searchParams.get('logout') === 'true';
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid username or password');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/dashboard');
        router.refresh();
      }, 500);
    } catch {
      setError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-brand">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1>Faculty Portal</h1>
            <p>Dr. Dnyaneshwar M. Mate — Portfolio Management</p>
          </div>

          {isLogout && (
            <div className="alert alert-success">
              You have been logged out securely.
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              Authentication successful! Redirecting to dashboard...
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                placeholder="Enter username (e.g. drmate)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={loading}
                autoComplete="username"
                autoFocus
              />
            </div>

            <div className="form-group">
              <div className="form-label-row">
                <label htmlFor="password">Password</label>
              </div>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your secure password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>

          <div className="login-footer">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--steel)', fontSize: '0.78rem', marginBottom: '0.75rem' }}>
              <Shield className="w-4 h-4" style={{ color: '#059669' }} />
              <span>256-Bit Encrypted Session • Authorized Personnel Only</span>
            </div>
            <a href="/" style={{ fontSize: '0.8rem', color: 'var(--terracotta)', textDecoration: 'none', fontWeight: 500 }}>
              ← Return to Public Portfolio
            </a>
          </div>
        </div>

        <div className="login-info">
          <h2>Dr. Dnyaneshwar M. Mate</h2>
          <p>Academic Portfolio Administration</p>
          <div className="info-stats">
            <div className="stat">
              <span className="stat-value">20+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="stat">
              <span className="stat-value">40+</span>
              <span className="stat-label">Publications</span>
            </div>
            <div className="stat">
              <span className="stat-value">4</span>
              <span className="stat-label">Books</span>
            </div>
            <div className="stat">
              <span className="stat-value">2</span>
              <span className="stat-label">Patents</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="login-page">
        <div className="login-container">
          <div className="login-card" style={{ padding: '2rem', textAlign: 'center' }}>
            <p>Loading Admin Portal...</p>
          </div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}