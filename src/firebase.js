import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyB0sm_PC7eksRdURvQ46x_u1oq0wn2qZcY",
  authDomain: "stay-fit-278605.firebaseapp.com",
  databaseURL: "https://stay-fit-278605.firebaseio.com",
  projectId: "stay-fit-278605",
  storageBucket: "stay-fit-278605.appspot.com",
  messagingSenderId: "976853098641",
  appId: "1:976853098641:web:5895177ba86b44afc11f30",
  measurementId: "G-F1HF1N4S93"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const firestore = firebase.firestore();

export { auth, firestore };
