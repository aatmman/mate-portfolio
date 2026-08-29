'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Eye, EyeOff, AlertCircle, Loader2 } from '@/components/ui/Icons';

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isLogout = searchParams.get('logout') === 'true';
  
  const [email, setEmail] = useState('admin@dnyaneshwarmate.com');
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
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Login failed');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/admin/dashboard');
        router.refresh();
      }, 500);
    } catch {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-brand">
              <Shield className="w-10 h-10 text-terracotta" />
            </div>
            <h1>Admin Portal</h1>
            <p>Sign in to manage the portfolio</p>
          </div>

          {isLogout && (
            <div className="alert alert-success">
              You have been logged out successfully.
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              Login successful! Redirecting...
            </div>
          )}

          {error && (
            <div className="alert alert-error">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
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
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="demo-credentials">
              <strong>Demo:</strong> admin@dnyaneshwarmate.com / Mate@2024!Admin
            </p>
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