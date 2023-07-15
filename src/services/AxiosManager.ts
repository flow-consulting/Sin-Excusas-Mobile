// src/services/AxiosManager.ts
import axios from 'axios';
import { DatabaseManager } from './DatabaseManager'; // Make sure to use the correct path to the file
import { generateId } from './../utils/IdManager'; // Make sure to use the correct path to the file

const baseURL = 'http://177.222.33.149:3000';

export class AxiosManager<T> implements DatabaseManager<T> {
  async add(collectionName: string, data: T) {
    // Generate a new identifier for the document
    const id = generateId();

    // Add the identifier to the document
    const document = { id, ...data };

    // Implementation to add a document to a collection on your backend server using axios
    await axios.post(`${baseURL}/${collectionName}`, document);

    // Return the generated identifier
    return id;
  }

  async get(collectionName: string, id: string) {
    // Implementation to get a document from a collection on your backend server using axios
    const response = await axios.get(`${baseURL}/${collectionName}/${id}`);
    return response.data;
  }

  async update(collectionName: string, id: string, updates: Partial<T>) {
    // Implementation to update a document in a collection on your backend server using axios
    await axios.put(`${baseURL}/${collectionName}/${id}`, updates);
  }

  async delete(collectionName: string, id: string) {
    // Implementation to delete a document from a collection on your backend server using axios
    await axios.delete(`${baseURL}/${collectionName}/${id}`);
  }
}
