import { db } from "../firebase/firebase";
import {
  collection,
  addDoc,
  DocumentData,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  query,
  where,
  getDocs,
  WhereFilterOp,
  orderBy,
  setDoc,
  DocumentReference,
} from "firebase/firestore";

// Function to add a document
export const addDocument = async ({
  collectionName,
  data,
}: {
  collectionName: string;
  data: DocumentData;
}): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);

    console.log(
      `Database Service: Document written with ID: [${docRef.id}] to Collection: [${collectionName}]`
    );
    return docRef.id;
  } catch (error) {
    console.error(`Database Service [addDocument] Error: ${error}`);
    throw error;
  }
};

// Function to add a document with a custom ID
export const addDocumentWithId = async ({
  collectionName,
  data,
  customId,
}: {
  collectionName: string;
  data: DocumentData;
  customId: string; // Add a parameter for the custom ID
}): Promise<string> => {
  try {
    const docRef = doc(collection(db, collectionName), customId);
    await setDoc(docRef, data);

    console.log(
      `Database Service: Document written with custom ID: [${customId}] to Collection: [${collectionName}]`
    );
    return customId; // Return the custom ID instead of docRef.id
  } catch (error) {
    console.error(`Database Service [addDocumentWithId] Error: ${error}`);
    throw error;
  }
};

// Function to delete a document
export const deleteDocument = async ({
  collectionName,
  documentId,
}: {
  collectionName: string;
  documentId: string;
}): Promise<void> => {
  try {
    await deleteDoc(doc(db, collectionName, documentId));

    console.log(
      `Database Service: Document with ID: [${documentId}] successfully deleted from Collection [${collectionName}]`
    );
  } catch (error) {
    console.error(`Database Service [deleteDocument] Error: ${error}`);
    throw error;
  }
};

// Function to update a document
export const updateDocument = async ({
  collectionName,
  documentId,
  data,
}: {
  collectionName: string;
  documentId: string;
  data: Record<string, any>;
}): Promise<void> => {
  try {
    const documentRef = doc(db, collectionName, documentId);
    await updateDoc(documentRef, data);
    console.log(
      `Database Service: Document with ID: [${documentId}] successfully updated in Collection [${collectionName}]`
    );
  } catch (error) {
    console.error(`Database Service [updateDocument] Error ${error}`);
    throw error;
  }
};

// Function to get a document by its ID
export const getDocumentById = async ({
  collectionName,
  documentId,
  userId,
}: {
  collectionName: string;
  documentId: string;
  userId: string;
}): Promise<any> => {
  try {
    const documentRef = doc(db, collectionName, documentId);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists() && documentSnapshot.data().userId === userId) {
      console.log(
        `Database Service: Document with ID: [${documentId}] successfully retrieved from Collection [${collectionName}]`
      );
      return { id: documentSnapshot.id, ...documentSnapshot.data() };
    } else {
      console.log(
        `Database Service: No document found with ID: [${documentId}] in Collection [${collectionName}] for userId: [${userId}]`
      );
      return null;
    }
  } catch (error) {
    console.error(`Database Service [getDocumentById] Error ${error}`);
    throw error;
  }
};

// Function to get documents by filters, including userId
export const getDocumentsByFilters = async ({
  collectionName,
  filters,
  userId,
}: {
  collectionName: string;
  filters: Array<{
    field: string;
    operator: WhereFilterOp;
    value: any;
  }>;
  userId: string;
}): Promise<{ documents: any[]; count: number }> => {
  try {
    const collectionRef = collection(db, collectionName);
    const queryConstraints = [
      where("userId", "==", userId),
      ...filters.map((filter) => where(filter.field, filter.operator, filter.value)),
    ];
    const q = query(collectionRef, ...queryConstraints);

    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (documents.length > 0) {
      console.log(
        `Database Service: Successfully retrieved ${documents.length} documents from Collection [${collectionName}] for userId: [${userId}]`
      );
    } else {
      console.log(
        `Database Service: No documents found in Collection [${collectionName}] with specified filters for userId: [${userId}]`
      );
    }

    return { documents, count: querySnapshot.size };
  } catch (error) {
    console.error(`Database Service [getDocumentsByFilters] Error ${error}`);
    throw error;
  }
};

// Function to get all documents for a specific userId
export const getAllDocuments = async <T>({
  collectionName,
  userId,
  sortBy = "",
  sortOrder = "asc",
}: {
  collectionName: string;
  userId: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}): Promise<{
  documents: (T & { id: string })[]; // Ensures each document includes an `id`
  count: number;
}> => {
  try {
    let q;
    if (sortBy) {
      q = query(
        collection(db, collectionName),
        where("userId", "==", userId),
        orderBy(sortBy, sortOrder)
      );
    } else {
      q = query(collection(db, collectionName), where("userId", "==", userId));
    }

    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as T), // Explicitly cast `doc.data()` to type `T`
    }));

    if (documents.length > 0) {
      console.log(
        `Database Service: Successfully retrieved ${documents.length} documents from Collection [${collectionName}] for userId: [${userId}]`
      );
    } else {
      console.log(
        `Database Service: No documents found in Collection [${collectionName}] for userId: [${userId}]`
      );
    }

    return {
      documents,
      count: querySnapshot.size,
    };
  } catch (error) {
    console.error(
      `Database Service: Error fetching documents from Collection [${collectionName}] for userId: [${userId}]`,
      error
    );
    throw error;
  }
};

// Helper to create a document reference
export const createRefFromString = ({
  collectionName,
  idString,
}: {
  collectionName: string;
  idString: string;
}): DocumentReference => {
  const docRef = doc(db, collectionName, idString);
  return docRef;
};

export default {
  addDocument,
  deleteDocument,
  updateDocument,
  getDocumentById,
  getDocumentsByFilters,
  getAllDocuments,
  addDocumentWithId,
  createRefFromString,
};


