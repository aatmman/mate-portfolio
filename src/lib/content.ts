import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');

export interface ContentItem {
  id: string;
  [key: string]: unknown;
}

export async function readDataFile<T extends ContentItem>(filename: string): Promise<T[]> {
  try {
    const filePath = path.join(DATA_DIR, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    const module = eval(content);
    return module.default || module[Object.keys(module).find(k => Array.isArray(module[k]))] || [];
  } catch {
    return [];
  }
}

export async function writeDataFile<T extends ContentItem>(filename: string, data: T[]): Promise<void> {
  const filePath = path.join(DATA_DIR, filename);
  const content = `export const ${filename.replace('.ts', '')} = ${JSON.stringify(data, null, 2)};\n`;
  await fs.writeFile(filePath, content, 'utf-8');
}

export async function getAll<T extends ContentItem>(filename: string): Promise<T[]> {
  return readDataFile(filename);
}

export async function getById<T extends ContentItem>(filename: string, id: string): Promise<T | null> {
  const data = await readDataFile(filename);
  return data.find(item => item.id === id) || null;
}

export async function create<T extends ContentItem>(filename: string, item: T): Promise<T> {
  const data = await readDataFile(filename);
  data.push(item);
  await writeDataFile(filename, data);
  return item;
}

export async function update<T extends ContentItem>(filename: string, id: string, updates: Partial<T>): Promise<T | null> {
  const data = await readDataFile(filename);
  const index = data.findIndex(item => item.id === id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...updates };
  await writeDataFile(filename, data);
  return data[index];
}

export async function remove(filename: string, id: string): Promise<boolean> {
  const data = await readDataFile(filename);
  const filtered = data.filter(item => item.id !== id);
  if (filtered.length === data.length) return false;
  await writeDataFile(filename, filtered);
  return true;
}

export async function reorder(filename: string, items: ContentItem[]): Promise<void> {
  await writeDataFile(filename, items);
}

export async function bulkImport(filename: string, items: ContentItem[]): Promise<{ created: number; errors: string[] }> {
  const existing = await readDataFile(filename);
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
  
  await writeDataFile(filename, existing);
  return { created, errors };
}