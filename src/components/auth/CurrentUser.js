import {useEffect, useState} from "react";
import { auth } from "../../firebase";
import {UserDataCollection} from "../../firestoreCollections";

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
            memoedUser = { uid: user.uid, ...data }
            setCurrentUser({ uid: user.uid, ...data })
          })
      } else {
        memoedUser = null
        setCurrentUser(null)
      }
    })
  }, [])
  
  return currentUser
}