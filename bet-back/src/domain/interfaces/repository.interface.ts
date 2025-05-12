export interface IBaseRepository<T> {
  create(item: T): Promise<T>;
  update(id: string, item: T): Promise<T>;
  delete(id: string): Promise<boolean>;
  find(item: Partial<T>): Promise<T[]>;
  findOne(id: string): Promise<T>;
} 