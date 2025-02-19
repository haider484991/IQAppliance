import { revalidatePath } from 'next/cache';
import { notifySearchEngines } from '../utils/indexnow';

export async function revalidateAndNotify(paths: string[]) {
  try {
    // Revalidate each path
    for (const path of paths) {
      revalidatePath(path);
    }

    // Notify search engines
    await notifySearchEngines(paths);
  } catch (error) {
    console.error('Error in revalidateAndNotify:', error);
    throw error;
  }
}
