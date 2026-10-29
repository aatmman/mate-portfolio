import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, updateAdminUsername, getAdminUser } from '@/lib/auth';

export async function GET() {
  try {
    await requireAdmin();
    const user = getAdminUser();
    return NextResponse.json({
      username: user.username,
      email: user.email,
      name: user.name,
    });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { newUsername } = body;

    if (!newUsername || typeof newUsername !== 'string') {
      return NextResponse.json(
        { error: 'New username is required' },
        { status: 400 }
      );
    }

    const clean = newUsername.trim();
    if (clean.length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters long' },
        { status: 400 }
      );
    }

    if (!/^[a-zA-Z0-9_.-]+$/.test(clean)) {
      return NextResponse.json(
        { error: 'Username can only contain letters, numbers, hyphens, and underscores' },
        { status: 400 }
      );
    }

    await updateAdminUsername(clean);

    return NextResponse.json({
      success: true,
      username: clean,
      message: `Username updated to '${clean}' successfully.`,
    });
  } catch (error) {
    console.error('Username change error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update username' },
      { status: 500 }
    );
  }
}
