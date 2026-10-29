import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import fs from 'fs';
import path from 'path';

const SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours
const AUTH_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'auth-config.json');

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  allowedEmails: string[];
  name: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  createdAt: string;
  updatedAt: string;
}

export interface SessionData {
  userId: string;
  username: string;
  email: string;
  name: string;
  role: string;
  expiresAt: number;
}

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256').update(password + salt).digest('hex');
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, passwordHash: string): boolean {
  try {
    const [salt, hash] = passwordHash.split(':');
    if (!salt || !hash) return false;
    const computedHash = createHash('sha256').update(password + salt).digest('hex');
    const hashBuf = Buffer.from(hash, 'hex');
    const compBuf = Buffer.from(computedHash, 'hex');
    if (hashBuf.length !== compBuf.length) return false;
    return timingSafeEqual(hashBuf, compBuf);
  } catch {
    return false;
  }
}

// Default secure credentials tailored for Dr. Mate
const DEFAULT_USERNAME = process.env.ADMIN_USERNAME || 'drmate';
const DEFAULT_PRIMARY_EMAIL = process.env.ADMIN_EMAIL || 'dr.mate@dnyaneshwarmate.com';
const DEFAULT_ALLOWED_EMAILS = [
  DEFAULT_PRIMARY_EMAIL.toLowerCase(),
  'prof.mate@dnyaneshwarmate.com',
  'admin@dnyaneshwarmate.com',
  'dnyaneshwarmate@gmail.com',
];
const DEFAULT_PASSWORD = process.env.ADMIN_PASSWORD || 'Mate@MechEngg#2025';

function getAuthConfig(): AdminUser {
  try {
    if (fs.existsSync(AUTH_FILE_PATH)) {
      const data = fs.readFileSync(AUTH_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(data);
      if (parsed.passwordHash) {
        return {
          id: parsed.id || 'admin-1',
          username: parsed.username || DEFAULT_USERNAME,
          email: parsed.email || DEFAULT_PRIMARY_EMAIL,
          allowedEmails: Array.isArray(parsed.allowedEmails) ? parsed.allowedEmails : DEFAULT_ALLOWED_EMAILS,
          name: parsed.name || 'Dr. Dnyaneshwar M. Mate',
          passwordHash: parsed.passwordHash,
          role: parsed.role || 'admin',
          createdAt: parsed.createdAt || new Date().toISOString(),
          updatedAt: parsed.updatedAt || new Date().toISOString(),
        };
      }
    }
  } catch (err) {
    console.error('Failed to read auth config, using defaults:', err);
  }

  // Initialize and persist default configuration
  const defaultUser: AdminUser = {
    id: 'admin-1',
    username: DEFAULT_USERNAME,
    email: DEFAULT_PRIMARY_EMAIL,
    allowedEmails: DEFAULT_ALLOWED_EMAILS,
    name: 'Dr. Dnyaneshwar M. Mate',
    passwordHash: hashPassword(DEFAULT_PASSWORD),
    role: 'admin',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    const dir = path.dirname(AUTH_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(defaultUser, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write initial auth-config.json:', err);
  }

  return defaultUser;
}

export function getAdminUser(): AdminUser {
  return getAuthConfig();
}

export function verifyAdminCredentials(loginIdentifier: string, password: string): AdminUser | null {
  const user = getAuthConfig();
  const normalized = (loginIdentifier || '').trim().toLowerCase();
  
  const isUsernameMatch = user.username && user.username.toLowerCase() === normalized;
  const isEmailMatch = 
    user.email.toLowerCase() === normalized ||
    user.allowedEmails.map(e => e.toLowerCase()).includes(normalized);

  if (!isUsernameMatch && !isEmailMatch) {
    return null;
  }

  if (verifyPassword(password, user.passwordHash)) {
    return user;
  }

  // Fallback check against environment variable override if changed during deployment
  if (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) {
    return user;
  }

  return null;
}

export function verifyAdminPassword(password: string): AdminUser | null {
  const user = getAuthConfig();
  if (verifyPassword(password, user.passwordHash)) {
    return user;
  }
  if (process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD) {
    return user;
  }
  return null;
}

export async function updateAdminUsername(newUsername: string): Promise<void> {
  const cleanUsername = (newUsername || '').trim();
  if (!cleanUsername || cleanUsername.length < 3) {
    throw new Error('Username must be at least 3 characters long');
  }
  if (!/^[a-zA-Z0-9_.-]+$/.test(cleanUsername)) {
    throw new Error('Username can only contain letters, numbers, dots, hyphens, and underscores');
  }

  const user = getAuthConfig();
  user.username = cleanUsername;
  user.updatedAt = new Date().toISOString();

  try {
    const dir = path.dirname(AUTH_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(user, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist updated username:', err);
    throw new Error('Failed to save updated username');
  }
}

export async function updateAdminPassword(newPassword: string): Promise<void> {
  const user = getAuthConfig();
  user.passwordHash = hashPassword(newPassword);
  user.updatedAt = new Date().toISOString();

  try {
    const dir = path.dirname(AUTH_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(user, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to persist updated password:', err);
    throw new Error('Failed to save updated password');
  }
}

export async function createSession(user: AdminUser): Promise<string> {
  const sessionId = randomBytes(32).toString('hex');
  const sessionData: SessionData = {
    userId: user.id,
    username: user.username,
    email: user.email,
    name: user.name,
    role: user.role,
    expiresAt: Date.now() + SESSION_DURATION,
  };
  
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, JSON.stringify(sessionData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
  
  return sessionId;
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  
  if (!sessionCookie?.value) return null;
  
  try {
    const sessionData: SessionData = JSON.parse(sessionCookie.value);
    
    if (sessionData.expiresAt < Date.now()) {
      await destroySession();
      return null;
    }
    
    return sessionData;
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function requireAuth(): Promise<SessionData> {
  const session = await getSession();
  if (!session) {
    redirect('/admin/login');
  }
  return session;
}

export async function requireAdmin(): Promise<SessionData> {
  const session = await requireAuth();
  if (session.role !== 'admin') {
    redirect('/admin/login');
  }
  return session;
}