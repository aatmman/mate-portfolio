import { promises as fs } from 'fs';
import path from 'path';

import { education, Degree } from '@/data/education';
import { experience, adminExperience, academicContributions, Position } from '@/data/experience';
import { patents, researchGrant, consultancy } from '@/data/patents';
import { publications, conferencePapers, Publication, ConferencePaper } from '@/data/publications';
import { 
  books, awards, memberships, editorialRoles, 
  conferencesOrganized, extraCurricular, students, StudentProject 
} from '@/data/achievements';
import { courses, Course } from '@/data/courses';
import { profile } from '@/data/profile';

export interface ContentItem {
  id: string;
  [key: string]: unknown;
}

const STORE_FILE = path.join(process.cwd(), 'src', 'data', 'content-store.json');

export function getInitialStore(): Record<string, ContentItem[]> {
  return {
    profile: [{ id: 'profile-main', ...(profile as unknown as Record<string, unknown>) }],
    education: JSON.parse(JSON.stringify(education)),
    experience: JSON.parse(JSON.stringify(experience)),
    adminExperience: JSON.parse(JSON.stringify(adminExperience)),
    academicContributions: JSON.parse(JSON.stringify(academicContributions)),
    patents: JSON.parse(JSON.stringify(patents)),
    researchGrant: [{ id: 'grant-aicte', ...(researchGrant as unknown as Record<string, unknown>) }],
    consultancy: JSON.parse(JSON.stringify(consultancy)),
    books: JSON.parse(JSON.stringify(books)),
    publications: JSON.parse(JSON.stringify(publications)),
    conferencePapers: JSON.parse(JSON.stringify(conferencePapers)),
    courses: JSON.parse(JSON.stringify(courses)),
    awards: JSON.parse(JSON.stringify(awards)),
    memberships: JSON.parse(JSON.stringify(memberships)),
    editorialRoles: JSON.parse(JSON.stringify(editorialRoles)),
    conferencesOrganized: JSON.parse(JSON.stringify(conferencesOrganized)),
    extraCurricular: JSON.parse(JSON.stringify(extraCurricular)),
    students: JSON.parse(JSON.stringify(students)),
    researchThemes: profile.researchThemes.map((theme, i) => ({
      id: `theme-${i + 1}`,
      name: theme,
    })),
  };
}

let memoryStore: Record<string, ContentItem[]> | null = null;

export async function loadStore(): Promise<Record<string, ContentItem[]>> {
  if (memoryStore) {
    return memoryStore;
  }

  const initial = getInitialStore();

  try {
    const raw = await fs.readFile(STORE_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    memoryStore = { ...initial, ...parsed };
  } catch {
    memoryStore = initial;
    try {
      await fs.writeFile(STORE_FILE, JSON.stringify(initial, null, 2), 'utf-8');
    } catch {
      // Ignore if filesystem is read-only
    }
  }

  return memoryStore || initial;
}

export async function persistStore(): Promise<void> {
  if (!memoryStore) return;
  try {
    await fs.writeFile(STORE_FILE, JSON.stringify(memoryStore, null, 2), 'utf-8');
  } catch {
    // If running in a read-only filesystem (e.g. serverless), keep in memory
  }
}

export async function resetStore(): Promise<Record<string, ContentItem[]>> {
  memoryStore = getInitialStore();
  await persistStore();
  return memoryStore;
}

export async function getAll<T extends ContentItem>(collection: string): Promise<T[]> {
  const store = await loadStore();
  const list = store[collection] || [];
  return list as T[];
}

export async function getById<T extends ContentItem>(collection: string, id: string): Promise<T | null> {
  const items = await getAll<T>(collection);
  return items.find(item => item.id === id) || null;
}

export async function create<T extends ContentItem>(collection: string, item: T): Promise<T> {
  const store = await loadStore();
  if (!store[collection]) {
    store[collection] = [];
  }
  const toAdd = {
    ...item,
    id: item.id || `${collection}-${Date.now()}`,
  };
  store[collection].push(toAdd);
  await persistStore();
  return toAdd as T;
}

export async function update<T extends ContentItem>(collection: string, id: string, updates: Partial<T>): Promise<T | null> {
  const store = await loadStore();
  const list = store[collection] || [];
  const index = list.findIndex(item => item.id === id);
  if (index === -1) {
    // If single document collection like profile or researchGrant and array empty or mismatched id
    if (list.length === 1 && (collection === 'profile' || collection === 'researchGrant')) {
      list[0] = { ...list[0], ...updates };
      await persistStore();
      return list[0] as T;
    }
    return null;
  }
  list[index] = { ...list[index], ...updates };
  await persistStore();
  return list[index] as T;
}

export async function remove(collection: string, id: string): Promise<boolean> {
  const store = await loadStore();
  const list = store[collection] || [];
  const filtered = list.filter(item => item.id !== id);
  if (filtered.length === list.length) return false;
  store[collection] = filtered;
  await persistStore();
  return true;
}

export async function reorder(collection: string, items: ContentItem[]): Promise<void> {
  const store = await loadStore();
  store[collection] = items;
  await persistStore();
}

export async function bulkImport(collection: string, items: ContentItem[]): Promise<{ created: number; errors: string[] }> {
  const store = await loadStore();
  const existing = store[collection] || [];
  const existingIds = new Set(existing.map(item => item.id));
  const errors: string[] = [];
  let created = 0;

  for (const item of items) {
    if (existingIds.has(item.id)) {
      errors.push(`Duplicate ID: ${item.id}`);
      continue;
    }
    existing.push(item);
    existingIds.add(item.id);
    created++;
  }

  store[collection] = existing;
  await persistStore();
  return { created, errors };
}

export async function getPortfolioData() {
  const store = await loadStore();
  const rawProfile = (store.profile?.[0] || profile) as unknown as typeof profile;
  
  // Re-sync research themes from themes collection if available
  const themes = store.researchThemes && store.researchThemes.length > 0
    ? store.researchThemes.map(t => String(t.name || t.id || ''))
    : rawProfile.researchThemes || profile.researchThemes;

  const resolvedProfile = {
    ...rawProfile,
    researchThemes: themes,
  };

  return {
    profile: resolvedProfile,
    education: (store.education as unknown as Degree[]) || education,
    experience: (store.experience as unknown as Position[]) || experience,
    adminExperience: (store.adminExperience as unknown as typeof adminExperience) || adminExperience,
    academicContributions: (store.academicContributions as unknown as typeof academicContributions) || academicContributions,
    courses: (store.courses as unknown as Course[]) || courses,
    patents: (store.patents as unknown as typeof patents) || patents,
    researchGrant: (store.researchGrant?.[0] as unknown as typeof researchGrant) || researchGrant,
    consultancy: (store.consultancy as unknown as typeof consultancy) || consultancy,
    books: (store.books as unknown as typeof books) || books,
    publications: (store.publications as unknown as Publication[]) || publications,
    conferencePapers: (store.conferencePapers as unknown as ConferencePaper[]) || conferencePapers,
    students: (store.students as unknown as StudentProject[]) || students,
    awards: (store.awards as unknown as typeof awards) || awards,
    memberships: (store.memberships as unknown as typeof memberships) || memberships,
    editorialRoles: (store.editorialRoles as unknown as typeof editorialRoles) || editorialRoles,
    conferencesOrganized: (store.conferencesOrganized as unknown as typeof conferencesOrganized) || conferencesOrganized,
    extraCurricular: (store.extraCurricular as unknown as typeof extraCurricular) || extraCurricular,
    researchThemes: themes,
  };
}