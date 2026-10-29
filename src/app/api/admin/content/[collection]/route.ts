import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { 
  getAll, getById, create, update, remove, reorder, bulkImport, loadStore, resetStore 
} from '@/lib/content';

const VALID_COLLECTIONS = [
  'profile', 'education', 'experience', 'adminExperience', 'academicContributions', 
  'patents', 'researchGrant', 'consultancy', 'books', 'publications', 
  'conferencePapers', 'courses', 'awards', 'memberships', 'editorialRoles', 
  'conferencesOrganized', 'extraCurricular', 'students', 'researchThemes', 'all'
];

async function checkAuth(): Promise<boolean> {
  const session = await getSession();
  return Boolean(session && session.role === 'admin');
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const isAuthed = await checkAuth();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { collection } = await params;
    const searchParams = request.nextUrl.searchParams;
    
    if (!VALID_COLLECTIONS.includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    if (collection === 'all') {
      const store = await loadStore();
      return NextResponse.json(store);
    }

    const id = searchParams.get('id');
    
    if (id) {
      const item = await getById(collection, id);
      if (!item) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json(item);
    }
    
    const items = await getAll(collection);
    return NextResponse.json(items);
  } catch (error) {
    console.error('API GET error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const isAuthed = await checkAuth();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { collection } = await params;
    
    if (!VALID_COLLECTIONS.includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const body = await request.json();
    const { action, data, items } = body;

    if (action === 'reset') {
      const restored = await resetStore();
      return NextResponse.json({ success: true, store: restored });
    }
    
    if (action === 'bulkImport' && items) {
      const result = await bulkImport(collection, items);
      return NextResponse.json(result);
    }
    
    if (action === 'reorder' && items) {
      await reorder(collection, items);
      return NextResponse.json({ success: true });
    }
    
    const newItem = await create(collection, data || body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error('API POST error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const isAuthed = await checkAuth();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { collection } = await params;
    
    if (!VALID_COLLECTIONS.includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const body = await request.json();
    const id = body.id || (collection === 'profile' ? 'profile-main' : collection === 'researchGrant' ? 'grant-aicte' : undefined);
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const { id: _, ...updates } = body;
    const updated = await update(collection, id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('API PUT error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    const isAuthed = await checkAuth();
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { collection } = await params;
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!VALID_COLLECTIONS.includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const deleted = await remove(collection, id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API DELETE error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}