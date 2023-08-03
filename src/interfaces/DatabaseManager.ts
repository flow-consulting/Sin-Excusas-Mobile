// src/interfaces/DatabaseManager.ts
import { AxiosManager } from '../services/AxiosManager';

export interface DatabaseManager<T> {
  get(collection: string, field: string, value: string): Promise<T>;
  getAll(collection: string): Promise<T[]>;
  update(collection: string, id: string, updates: Partial<T>): Promise<void>;
  delete(collection: string, id: string): Promise<void>;
  add(collection: string, document: T): Promise<void>;
  query(collection: string, query: object): Promise<T[]>;
}

// change this to update manager
// const dbManager = new FirestoreManager();
const dbManager = new AxiosManager();

export default dbManager;