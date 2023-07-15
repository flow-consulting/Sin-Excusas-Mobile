// src/services/DatabaseManager.ts
import { AxiosManager } from './AxiosManager'; 
// import { FirestoreManager } from './FirestoreManager'; 

export interface DatabaseManager<T> {
  add(collection: string, data: T): Promise<void>;
  get(collection: string, id: string): Promise<T>;
  update(collection: string, id: string, updates: Partial<T>): Promise<void>;
  delete(collection: string, id: string): Promise<void>;
}

// Cambiar esta línea para usar la implementación del gestor 
const dbManager = new AxiosManager();

export default dbManager;
