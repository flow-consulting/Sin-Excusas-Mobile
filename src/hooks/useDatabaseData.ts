// src/hooks/useDatabaseData.ts
import { useCallback, useMemo, useState } from 'react';
import AxiosService from '../services/database/AxiosService';
import DatabaseService from '../services/database/DatabaseService';

const useDatabaseData = <T>(tableName: string) => {
  // State to store any error that may occur when interacting with the database
  const [error, setError] = useState(null);

  // Create an instance of the AxiosService to interact with the database
  const dbService = useMemo<DatabaseService<T>>(() => new AxiosService(), []);

  // Function to get a single document from the database by field and value
  const get = useCallback(
    (field: string, value: string) => {
      return new Promise<T | null>(resolve => {
        // Log the name of the file and the name of the function
        console.log('useDatabaseData.ts - get function called');

        // Log the values of the function arguments
        console.log('useDatabaseData.ts - get - field:', field);
        console.log('useDatabaseData.ts - get - value:', value);

        // Call the get method on the dbService to get a document from the database
        dbService
          .get(tableName, field, value)
          .then(data => {
            // Log the value of the data variable
            console.log('useDatabaseData.ts - get - data:', data);

            // Resolve the promise with the fetched data
            resolve(data);
          })
          .catch(err => {
            // Log the error
            console.error(err);

            // Update the error state with the error that occurred
            setError(err);

            // Resolve the promise with null to indicate that an error occurred
            resolve(null);
          });
      });
    },
    [dbService, tableName],
  );

  // Function to get all documents from a collection in the database
  const getAll = useCallback(() => {
    return new Promise<T[]>(resolve => {
      // Log the name of the file and the name of the function
      console.log('useDatabaseData.ts - getAll function called');

      // Call the getAll method on the dbService to get all documents from a collection in the database
      dbService
        .getAll(tableName)
        .then(data => {
          // Log the value of the data variable
          console.log('useDatabaseData.ts - getAll - data:', data);

          // Resolve the promise with the fetched data
          resolve(data);
        })
        .catch(err => {
          // Log the error
          console.error(err);

          // Update the error state with the error that occurred
          setError(err);

          // Resolve the promise with an empty array to indicate that an error occurred
          resolve([]);
        });
    });
  }, [dbService, tableName]);

  // Function to update a document in a collection in the database by id and updates object
  const update = useCallback(
    (id: string, updates: Partial<T>) => {
      return new Promise<void>(resolve => {
        // Log the name of the file and the name of the function
        console.log('useDatabaseData.ts - update function called');

        // Log the values of the function arguments
        console.log('useDatabaseData.ts - update - id:', id);
        console.log('useDatabaseData.ts - update - updates:', updates);

        // Call the update method on the dbService to update a document in the database
        dbService
          .update(tableName, id, updates)
          .then(() => {
            // Resolve the promise to indicate that the operation was successful
            resolve();
          })
          .catch(err => {
            // Log the error
            console.error(err);

            // Update the error state with the error that occurred
            setError(err);

            // Resolve the promise to indicate that an error occurred
            resolve();
          });
      });
    },
    [dbService, tableName],
  );

  // Function to delete a document from a collection in the database by id
  const deleteDoc = useCallback(
    (id: string) => {
      return new Promise<void>(resolve => {
        // Log the name of the file and the name of the function
        console.log('useDatabaseData.ts - deleteDoc function called');

        // Log the values of the function arguments
        console.log('useDatabaseData.ts - deleteDoc - id:', id);

        // Call the delete method on the dbService to delete a document from the database
        dbService
          .delete(tableName, id)
          .then(() => {
            // Resolve the promise to indicate that the operation was successful
            resolve();
          })
          .catch(err => {
            // Log the error
            console.error(err);

            // Update the error state with the error that occurred
            setError(err);

            // Resolve the promise to indicate that an error occurred
            resolve();
          });
      });
    },
    [dbService, tableName],
  );

  // Function to add a document to a collection in the database
  const add = useCallback(
    (document: T) => {
      return new Promise<T>(resolve => {
        // Log the name of the file and the name of the function
        console.log('useDatabaseData.ts - add function called');

        // Log the values of the function arguments
        console.log('useDatabaseData.ts - add - document:', document);

        // Call the add method on the dbService to add a document to a collection in the database
        dbService
          .add(tableName, document)
          .then(result => {
            // Log the value of the result variable
            console.log('useDatabaseData.ts - add - result:', result);

            // Resolve the promise with the inserted document
            resolve(result);
          })
          .catch(err => {
            // Log the error
            console.error(err);

            // Update the error state with the error that occurred
            setError(err);

            // Reject the promise to indicate that an error occurred
            reject(err);
          });
      });
    },
    [dbService, tableName],
  );

  // Function to query a collection in the database by a query object
  const query = useCallback(
    (query: object) => {
      return new Promise<T[]>(resolve => {
        // Log the name of the file and the name of the function
        console.log('useDatabaseData.ts - query function called');

        // Log the values of the function arguments
        console.log('useDatabaseData.ts - query - query:', query);

        // Call the query method on the dbService to query a collection in the database
        dbService
          .query(tableName, query)
          .then(data => {
            // Log the value of the data variable
            console.log('useDatabaseData.ts - query - data:', data);

            // Resolve the promise with the fetched data
            resolve(data);
          })
          .catch(err => {
            // Log the error
            console.error(err);

            // Update the error state with the error that occurred
            setError(err);

            // Resolve the promise with an empty array to indicate that an error occurred
            resolve([]);
          });
      });
    },
    [dbService, tableName],
  );

  return {error, get, getAll, update, deleteDoc, add, query};
};

export default useDatabaseData;
