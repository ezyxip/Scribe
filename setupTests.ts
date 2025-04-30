import {vi} from 'vitest';

global.localStorage = {
    getItem: (key: string) => {
      if (key === 'supabase-url') return process.env.SUPABASE_URL!;
      if (key === 'supabase-anon-key') return process.env.SUPABASE_ANON_KEY!;
      return null;
    },
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  } as any;
  