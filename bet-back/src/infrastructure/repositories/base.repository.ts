import { IBaseRepository } from '../../domain/interfaces/repository.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {

  async create(item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async update(id: string, item: T): Promise<T> {
    throw new Error('Method not implemented.');
  }

  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async find(item: Partial<T>): Promise<T[]> {
    throw new Error('Method not implemented.');
  }

  async findOne(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
} 