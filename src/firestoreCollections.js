import { firestore as firestoreInstance } from "./firebase";

export const UserDataCollection = firestoreInstance.collection('user-data')