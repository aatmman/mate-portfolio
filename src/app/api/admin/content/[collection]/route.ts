import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { 
  getAll, getById, create, update, remove, reorder, bulkImport 
} from '@/lib/content';

const VALID_COLLECTIONS = [
  'profile', 'education', 'experience', 'patents', 'researchGrant', 
  'consultancy', 'books', 'publications', 'conferencePapers', 'courses',
  'awards', 'memberships', 'editorialRoles', 'conferencesOrganized', 
  'extraCurricular', 'students', 'researchThemes'
];

function getCollectionFilename(collection: string): string {
  const map: Record<string, string> = {
    profile: 'profile.ts',
    education: 'education.ts',
    experience: 'experience.ts',
    patents: 'patents.ts',
    researchGrant: 'patents.ts',
    consultancy: 'patents.ts',
    books: 'achievements.ts',
    publications: 'publications.ts',
    conferencePapers: 'publications.ts',
    courses: 'courses.ts',
    awards: 'achievements.ts',
    memberships: 'achievements.ts',
    editorialRoles: 'achievements.ts',
    conferencesOrganized: 'achievements.ts',
    extraCurricular: 'achievements.ts',
    students: 'achievements.ts',
    researchThemes: 'profile.ts',
  };
  return map[collection] || `${collection}.ts`;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    await requireAdmin();
    const { collection } = await params;
    const searchParams = request.nextUrl.searchParams;
    
    if (!VALID_COLLECTIONS.includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const id = searchParams.get('id');
    const filename = getCollectionFilename(collection);
    
    if (id) {
      const item = await getById(filename, id);
      if (!item) {
        return NextResponse.json({ error: 'Not found' }, { status: 404 });
      }
      return NextResponse.json(item);
    }
    
    const items = await getAll(filename);
    return NextResponse.json(items);
  } catch (error) {
    if (error instanceof Response) throw error;
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    await requireAdmin();
    const { collection } = await params;
    
    if (!VALID_COLLECTIONS.includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const body = await request.json();
    const { action, data, items } = body;
    const filename = getCollectionFilename(collection);
    
    if (action === 'bulkImport' && items) {
      const result = await bulkImport(filename, items);
      return NextResponse.json(result);
    }
    
    if (action === 'reorder' && items) {
      await reorder(filename, items);
      return NextResponse.json({ success: true });
    }
    
    const newItem = await create(filename, data);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    if (error instanceof Response) throw error;
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    await requireAdmin();
    const { collection } = await params;
    
    if (!VALID_COLLECTIONS.includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }

    const body = await request.json();
    const { id, ...updates } = body;
    const filename = getCollectionFilename(collection);
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const updated = await update(filename, id, updates);
    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Response) throw error;
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  try {
    await requireAdmin();
    const { collection } = await params;
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');
    
    if (!VALID_COLLECTIONS.includes(collection)) {
      return NextResponse.json({ error: 'Invalid collection' }, { status: 400 });
    }
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    
    const filename = getCollectionFilename(collection);
    const deleted = await remove(filename, id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Response) throw error;
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}