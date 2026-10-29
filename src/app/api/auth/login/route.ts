import { NextRequest, NextResponse } from 'next/server';
import { createSession, verifyAdminCredentials } from '@/lib/auth';

interface AttemptRecord {
  count: number;
  lockedUntil: number;
}

// In-memory brute force protection tracking
const loginAttempts = new Map<string, AttemptRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes lockout

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
               request.headers.get('x-real-ip') || 
               'client-local';

    const now = Date.now();
    const existing = loginAttempts.get(ip);

    if (existing && existing.lockedUntil > now) {
      const minutesLeft = Math.ceil((existing.lockedUntil - now) / 60000);
      return NextResponse.json(
        { 
          error: `Account temporarily locked due to repeated failed attempts. Please try again in ${minutesLeft} minute${minutesLeft > 1 ? 's' : ''}.` 
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const loginIdentifier = body.username || body.email || body.loginIdentifier;
    const { password } = body;

    if (!loginIdentifier || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const user = verifyAdminCredentials(loginIdentifier, password);
    
    if (!user) {
      // Record failed attempt
      const currentCount = (existing && existing.lockedUntil <= now ? 0 : (existing?.count || 0)) + 1;
      
      if (currentCount >= MAX_ATTEMPTS) {
        loginAttempts.set(ip, {
          count: currentCount,
          lockedUntil: now + LOCKOUT_MS,
        });
        return NextResponse.json(
          { 
            error: 'Too many failed login attempts. For security reasons, access is locked for 15 minutes.' 
          },
          { status: 429 }
        );
      } else {
        loginAttempts.set(ip, {
          count: currentCount,
          lockedUntil: 0,
        });
        // Slight artificial delay to prevent rapid automated timing scans
        await new Promise((r) => setTimeout(r, 300));
        const remaining = MAX_ATTEMPTS - currentCount;
        return NextResponse.json(
          { 
            error: `Invalid email or password. (${remaining} attempt${remaining > 1 ? 's' : ''} remaining before lockout)` 
          },
          { status: 401 }
        );
      }
    }

    // Login succeeded: reset rate limit tracking for this IP
    loginAttempts.delete(ip);

    await createSession(user);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login. Please try again.' },
      { status: 500 }
    );
  }
}