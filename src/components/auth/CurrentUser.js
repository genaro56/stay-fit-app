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
            console.log('%c data', 'background: #332167; color: #B3D1F6; font-size: 16px', data)
            memoedUser = { ...user, ...data }
            setCurrentUser({ ...user, ...data })
          })
      } else {
        memoedUser = null
        setCurrentUser(null)
      }
    })
  }, [])
  
  return currentUser
}