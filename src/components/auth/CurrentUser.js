import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { UserDataCollection } from "../../firestoreCollections";

let memoedUser = null

export function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(memoedUser)

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        UserDataCollection.doc(user?.uid)
          .get()
          .then((ref) => {
            const data = ref.data()
            memoedUser = { ...user, ...data }
            setCurrentUser({ ...user, ...data })
          })
      } else {
        memoedUser = null
        setCurrentUser(null)
      }
    })
  }, [])

  useEffect(() => {
    const unsubscribe = currentUser &&
      UserDataCollection.doc(currentUser?.uid)
        .onSnapshot((snapshot) => {
          const data = snapshot.data()
          memoedUser = { ...currentUser, ...data }
          setCurrentUser({ ...currentUser, ...data })
        });
    return unsubscribe
  }, []);

  return currentUser
}