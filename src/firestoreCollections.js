import { firestore as firestoreInstance } from "./firebase";

export const UserDataCollection = firestoreInstance.collection('user-data');
export const WeeklyRoutinesCollection = firestoreInstance.collection('weekly-routines');
export const ActivitiesCollection = firestoreInstance.collection('activities');