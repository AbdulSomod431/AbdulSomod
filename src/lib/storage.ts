import { get, set, del } from 'idb-keyval';

export interface SavedImage {
  id: string;
  name: string;
  data: string;
  timestamp: number;
}

const STORAGE_KEY = 'skypixel_saved_images';

export async function saveImage(name: string, data: string): Promise<SavedImage> {
  const images = await getSavedImages();
  const newImage: SavedImage = {
    id: crypto.randomUUID(),
    name,
    data,
    timestamp: Date.now(),
  };
  
  await set(STORAGE_KEY, [newImage, ...images]);
  return newImage;
}

export async function getSavedImages(): Promise<SavedImage[]> {
  return (await get<SavedImage[]>(STORAGE_KEY)) || [];
}

export async function deleteImage(id: string): Promise<void> {
  const images = await getSavedImages();
  const filtered = images.filter(img => img.id !== id);
  await set(STORAGE_KEY, filtered);
}
