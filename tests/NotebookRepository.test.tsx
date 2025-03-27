import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { NotebookRepository } from '../app/api/NotebookRepository';
import {supabase, login} from '../app/api/api-supabase';

const repository = new NotebookRepository();

const TEST_USER_EMAIL = 'user@test.ru';
const TEST_USER_PASSWORD = '1234';
const TEST_USER_ID = '6a8bcfb7-cd54-4b71-aacc-70a6869cde8e';


beforeAll(async () => {
    await login(TEST_USER_EMAIL, TEST_USER_PASSWORD);
    console.log('Подключение к тестовой базе Supabase');
});

afterAll(async () => {
    await supabase.from('notebooks').delete().not('id', 'is', null);
});

beforeEach(async () => {
    await supabase.from('notebooks').delete().not('id', 'is', null);
});

describe('NotebookRepository (реальная Supabase)', () => {
  it('должен создавать ноутбук', async () => {
    const id = await repository.create('Test Notebook', TEST_USER_ID);
    expect(id).toBeTruthy();

    const { data } = await supabase
      .from('notebooks')
      .select('*')
      .eq('id', id)
      .single();
    
    expect(data).toMatchObject({
      id,
      name: 'Test Notebook',
      user_id: TEST_USER_ID,
    });
  });

  it('должен получать список ноутбуков', async () => {
    await repository.create('Notebook 1', TEST_USER_ID);
    await repository.create('Notebook 2', TEST_USER_ID);

    const notebooks = await repository.getAll() || [];
    expect(notebooks.length).toBeGreaterThanOrEqual(2);
  });

  it('должен получать ноутбук по ID', async () => {
    const id = await repository.create('Test Notebook', TEST_USER_ID) || -1;
    const notebook = await repository.getById(id);

    expect(notebook).toMatchObject({
      id,
      name: 'Test Notebook',
      user_id: TEST_USER_ID,
    });
  });

  it('должен обновлять ноутбук', async () => {
    const id = await repository.create('Old Name', TEST_USER_ID) || -1;
    const success = await repository.update(id, { name: 'New Name' });

    expect(success).toBe(true);

    const { data } = await supabase
      .from('notebooks')
      .select('name')
      .eq('id', id)
      .single();

    expect(data?.name).toBe('New Name');
  });

  it('должен удалять ноутбук', async () => {
    const id = await repository.create('Notebook to Delete', TEST_USER_ID) || -1;
    const success = await repository.delete(id, TEST_USER_ID);

    expect(success).toBe(true);

    const { data } = await supabase
      .from('notebooks')
      .select('*')
      .eq('id', id);

    expect(data).toEqual([]);
  });
});
