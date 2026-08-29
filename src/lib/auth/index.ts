import { createHash, randomBytes, timingSafeEqual } from 'crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const SESSION_COOKIE = 'admin_session';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface AdminUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: 'admin' | 'editor';
  createdAt: string;
  updatedAt: string;
}

interface SessionData {
  userId: string;
  email: string;
  name: string;
  role: string;
  expiresAt: number;
}

const ADMIN_USER: AdminUser = {
  id: 'admin-1',
  email: 'admin@dnyaneshwarmate.com',
  name: 'Dr. Dnyaneshwar M. Mate',
  passwordHash: hashPassword('Mate@2024!Admin'), // Default password
  role: 'admin',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const hash = createHash('sha256').update(password + salt).digest('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, passwordHash: string): boolean {
  const [salt, hash] = passwordHash.split(':');
  if (!salt || !hash) return false;
  const computedHash = createHash('sha256').update(password + salt).digest('hex');
  return timingSafeEqual(Buffer.from(hash), Buffer.from(computedHash));
}

export async function createSession(user: AdminUser): Promise<string> {
  const sessionId = randomBytes(32).toString('hex');
  const sessionData: SessionData = {
    userId: user.id,
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

export function getAdminUser(): AdminUser {
  return ADMIN_USER;
}

export function verifyAdminPassword(password: string): AdminUser | null {
  if (verifyPassword(password, ADMIN_USER.passwordHash)) {
    return ADMIN_USER;
  }
  return null;
}

export async function updateAdminPassword(newPassword: string): Promise<void> {
  ADMIN_USER.passwordHash = hashPassword(newPassword);
  ADMIN_USER.updatedAt = new Date().toISOString();
}

export type { AdminUser, SessionData };