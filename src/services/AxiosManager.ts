// src/services/AxiosManager.ts
import axios from 'axios';
import { generateId } from './../utils/IdManager'; // Make sure to use the correct path to the file
import { DatabaseManager } from './DatabaseManager'; // Make sure to use the correct path to the file

const baseURL = 'http://192.168.0.18:3000';

export class AxiosManager<T> implements DatabaseManager<T> {

  async get(collectionName: string, field: string, value: string) {
    try {
      // Log the request
      console.log(`GET ${baseURL}/${collectionName}?${field}=${value}`);

      // Implementation to get a document from a collection on your backend server using axios
      const response = await axios.get(`${baseURL}/${collectionName}?${field}=${value}`);

      // Log the response
      // console.log(response);

      return response.data[0];
    } catch (error) {
      // Log the error
      console.error(error);
    }
  }

  async getAll(collectionName: string) {
    try {
      // Log the request
      console.log(`GET ${baseURL}/${collectionName}`);

      // Implementation to get all documents from a collection on your backend server using axios
      const response = await axios.get(`${baseURL}/${collectionName}`);

      // Log the response
      // console.log(response);

      return response.data;
    } catch (error) {
      // Log the error
      console.error(error);
    }
  }

  async update(collectionName: string, id: string, updates: Partial<T>) {
    try {
      // Log the request
      console.log(`PUT ${baseURL}/${collectionName}/${id}`, updates);

      // Implementation to update a document in a collection on your backend server using axios
      await axios.put(`${baseURL}/${collectionName}/${id}`, updates);

      // Log the response
      console.log('Document updated successfully');
    } catch (error) {
      // Log the error
      console.error(error);
    }
  }

  async delete(collectionName: string, id: string) {
    try {
      // Log the request
      console.log(`DELETE ${baseURL}/${collectionName}/${id}`);

      // Implementation to delete a document from a collection on your backend server using axios
      await axios.delete(`${baseURL}/${collectionName}/${id}`);

      // Log the response
      console.log('Document deleted successfully');
    } catch (error) {
      // Log the error
      console.error(error);
    }
  }

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

    async query(collectionName: string, query: object) {
    try {
      // Convert the query object to a query string
      const queryString = Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      // Log the request
      console.log(`GET ${baseURL}/${collectionName}/query?${queryString}`);

      // Implementation to query documents from a collection on your backend server using axios
      const response = await axios.get(`${baseURL}/${collectionName}/query?${queryString}`);

      // Log the response
      console.log(response);

      return response.data;
    } catch (error) {
      // Log the error
      console.error(error);
    }
  }
}
