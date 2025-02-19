import { notifySearchEngines } from '../utils/indexnow';

type ActionFunction = (...args: any[]) => Promise<any>;

export function withIndexNow(paths: string[], action: ActionFunction): ActionFunction {
  return async (...args: any[]) => {
    try {
      // Execute the original action
      const result = await action(...args);

      // Notify search engines of the changes
      await notifySearchEngines(paths);

      return result;
    } catch (error) {
      console.error('Error in withIndexNow:', error);
      throw error;
    }
  };
}
