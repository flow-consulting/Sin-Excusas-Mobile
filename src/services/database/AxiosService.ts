// src/services/database/AxiosService.ts
import axios from 'axios';
import { generateId } from '../../utils/IdManager'; // Make sure to use the correct path to the file
import DatabaseService from './DatabaseService';

const baseURL = 'http://192.168.0.18:3000';

class AxiosService<T> implements DatabaseService<T> {
  async get(tableName: string, field: string, value: string) {
    try {
      // Log the method call
      console.log(
        'AxiosService.ts - get - tableName:',
        tableName,
        'field:',
        field,
        'value:',
        value,
      );

      // Log the request
      console.log(`GET ${baseURL}/${tableName}?${field}=${value}`);

      // Implementation to get a document from a collection on your backend server using axios
      const response = await axios.get(
        `${baseURL}/${tableName}?${field}=${value}`,
      );

      // Log the response
      console.log('AxiosService.ts - get - response:', response.data[0]);

      return response.data[0];
    } catch (error) {
      // Log the error
      console.error(error);
    }
  }

  async getAll(tableName: string) {
    try {
      // Log the method call
      console.log('AxiosService.ts - getAll - tableName:', tableName);

      // Log the request
      console.log(`GET ${baseURL}/${tableName}`);

      // Implementation to get all documents from a collection on your backend server using axios
      const response = await axios.get(`${baseURL}/${tableName}`);

      // Log the response
      console.log('AxiosService.ts - getAll - response:', response.data);

      return response.data;
    } catch (error) {
      // Log the error
      console.error(error);
    }
  }

  async update(tableName: string, id: string, updates: Partial<T>) {
    try {
      // Log the method call
      console.log(
        'AxiosService.ts - update - tableName:',
        tableName,
        'id:',
        id,
        'updates:',
        updates,
      );

      // Log the request
      console.log(`PUT ${baseURL}/${tableName}/${id}`, updates);

      // Implementation to update a document in a collection on your backend server using axios
      await axios.put(`${baseURL}/${tableName}/${id}`, updates);

      // Log the response
      console.log('Document updated successfully');
    } catch (error) {
      // Log the error
      console.error(error);
    }
  }

  async delete(tableName: string, id: string) {
    try {
      // Log the method call
      console.log(
        'AxiosService.ts - delete - tableName:',
        tableName,
        'id:',
        id,
      );

      // Log the request
      console.log(`DELETE ${baseURL}/${tableName}/${id}`);

      // Implementation to delete a document from a collection on your backend server using axios
      await axios.delete(`${baseURL}/${tableName}/${id}`);

      // Log the response
      console.log('Document deleted successfully');
    } catch (error) {
      // Log the error
      console.error(error);
    }
  }

  async add(tableName: string, data: T) {
    try {
      // Log the method call
      console.log(
        'AxiosService.ts - add - tableName:',
        tableName,
        'data:',
        data,
      );

      // Generate a new identifier for the document
      const id = generateId();

      // Log the generatedId
      console.log('AxiosService.ts - add - generateId', id);

      // Add the identifier to the document
      const document = {...data, id};

      // Log the document
      console.log('AxiosService.ts - add - document', document);

      // Log the request
      console.log(
        'AxiosService.ts - add - POST',
        `${baseURL}/${tableName}`,
        document,
      );

      // Implementation to add a document to a collection on your backend server using axios
      const response = await axios.post(`${baseURL}/${tableName}`, document);

      // Log the response
      console.log('AxiosService.ts - add - response:', response.data);

      // Return the inserted document
      return response.data;
    } catch (error) {
      // Log the error
      console.error(error);
    }
  }

  async query(tableName: string, query: object) {
    try {
      // Convert the query object to a query string
      const queryString = Object.entries(query)
        .map(([key, value]) => `${key}=${value}`)
        .join('&');

      // Log the method call
      console.log(
        'AxiosService.ts - query - tableName:',
        tableName,
        'query:',
        query,
      );

      // Log the request
      console.log(`GET ${baseURL}/${tableName}/query?${queryString}`);

      // Implementation to query documents from a collection on your backend server using axios
      const response = await axios.get(
        `${baseURL}/${tableName}/query?${queryString}`,
      );

      // Log the response
      console.log('AxiosService.ts - query - response:', response.data);

      return response.data;
    } catch (error) {
      // Log the error
      console.error(error);
    }
  }
}

export default AxiosService;
