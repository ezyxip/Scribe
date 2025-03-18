interface INotebookRepository {
    create(name: string, userId: string): Promise<number | null>;
    getAll(): Promise<INotebook[] | null>;
    getById(id: number): Promise<INotebook | null>;
    delete(id: number, userId: string): Promise<boolean>;
    update(id: number, newData: Partial<INotebook>): Promise<boolean>;
  }