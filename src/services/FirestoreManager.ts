// src/services/FirestoreManager.ts
// import { DatabaseManager } from './DatabaseManager'; // Make sure to use the correct path to the file
// import { generateId } from './../utils/IdManager'; // Make sure to use the correct path to the file

// export class FirestoreManager<T> implements DatabaseManager<T> {
//   async add(collectionName: string, data: T) {
//     // Generate a new identifier for the document
//     const id = generateId();

//     // Add the identifier to the document
//     const document = { id, ...data };

//     // Implementation to add a document to a collection in Firestore
//     await firestore().collection(collectionName).add(document);
//   }

//   async get(collectionName: string, id: string) {
//     // Implementation to get a document from a collection in Firestore
//     const document = await firestore().collection(collectionName).doc(id).get();
//     return document.data() as T;
//   }

//   async update(collectionName: string, id: string, updates: Partial<T>) {
//     // Implementation to update a document in a collection in Firestore
//     await firestore().collection(collectionName).doc(id).update(updates);
//   }

//   async delete(collectionName: string, id: string) {
//     // Implementation to delete a document from a collection in Firestore
//     await firestore().collection(collectionName).doc(id).delete();
//   }
// }
