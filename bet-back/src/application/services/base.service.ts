import { IBaseRepository } from '@domain/interfaces/repository.interface';
import { IBaseService } from '@domain/interfaces/service.interface';

export abstract class BaseService<T> implements IBaseService<T> {
  protected constructor(protected readonly repository: IBaseRepository<T>) {}

  async create(item: T): Promise<T> {
    return this.repository.create(item);
  }

  async update(id: string, item: T): Promise<T> {
    return this.repository.update(id, item);
  }

  async delete(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async find(item: Partial<T>): Promise<T[]> {
    return this.repository.find(item);
  }

  async findOne(id: string): Promise<T> {
    return this.repository.findOne(id);
  }
} 