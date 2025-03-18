import {supabase} from "./api-supabase"

export class NotebookRepository {
    async create(name: string, userId: string): Promise<number | null> {
      const { data, error } = await supabase.from('notebooks').insert([{ name, user_id: userId, cell_ids: [] }]).select().single();
      if (error) {
        console.error('Ошибка при создании блокнота:', error.message);
        return null;
      }
      return data.id;
    }
  
    async getAll(): Promise<INotebook[] | null> {
      const { data, error } = await supabase.from('notebooks').select('id, name, cell_ids');
      if (error) {
        console.error('Ошибка при получении блокнотов:', error.message);
        return null;
      }
      return data;
    }
  
    async getById(id: number): Promise<INotebook | null> {
      const { data, error } = await supabase.from('notebooks').select().eq('id', id).single();
      if (error) {
        console.error('Ошибка при получении блокнота:', error.message);
        return null;
      }
      return data;
    }
  
    async delete(id: number, userId: string): Promise<boolean> {
      const { error } = await supabase.from('notebooks').delete().match({ id, user_id: userId });
      if (error) {
        console.error('Ошибка при удалении блокнота:', error.message);
        return false;
      }
      return true;
    }
  
    async update(id: number, newData: Partial<INotebook>): Promise<boolean> {
      const { error } = await supabase.from('notebooks').update(newData).eq('id', id);
      if (error) {
        console.error('Ошибка при обновлении блокнота:', error.message);
        return false;
      }
      return true;
    }
}