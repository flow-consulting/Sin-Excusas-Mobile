// src/services/database/DatabaseService.ts
export default interface DatabaseService<T> {
  get(tableName: string, field: string, value: string): Promise<T>;
  getAll(tableName: string): Promise<T[]>;
  update(tableName: string, id: string, updates: Partial<T>): Promise<void>;
  delete(tableName: string, id: string): Promise<void>;
  add(tableName: string, document: T): Promise<T>;
  query(tableName: string, query: object): Promise<T[]>;
}
