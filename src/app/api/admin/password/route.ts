import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, verifyAdminPassword, updateAdminPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

    const body = await request.json();
    const { currentPassword, newPassword, confirmPassword } = body;

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        { error: 'New password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    if (confirmPassword && newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: 'New password and confirmation do not match' },
        { status: 400 }
      );
    }

    const verified = verifyAdminPassword(currentPassword);
    if (!verified) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 401 }
      );
    }

    await updateAdminPassword(newPassword);

    return NextResponse.json({
      success: true,
      message: 'Password updated successfully. Please keep your new password in a safe place.',
    });
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { error: 'Failed to update password. Please check your credentials.' },
      { status: 500 }
    );
  }
}
