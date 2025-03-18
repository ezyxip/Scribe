class NotebookFactory {
    static create(name: string, userId: string): INotebook {
      return { name, user_id: userId, cell_ids: [] };
    }
  }