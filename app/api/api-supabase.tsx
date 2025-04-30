import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = localStorage.getItem('supabase-url') || '';
const supabaseKey = localStorage.getItem('supabase-anon-key') || '';

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export async function login(email: string, password: string): Promise<void> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error('Ошибка входа:', error.message);
    return;
  }
  console.log('Вход успешен!');
}

export function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('token') || '';
  const refreshToken = localStorage.getItem('refresh_token') || '';
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
    Refresh: refreshToken,
  };
}