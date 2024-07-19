// src/firebase/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAq0eziYd1X47X7yVApoVUUqLjILU4AnS4",
  authDomain: "fir-auth-cd162.firebaseapp.com",
  projectId: "fir-auth-cd162",
  storageBucket: "fir-auth-cd162.appspot.com",
  messagingSenderId: "788019079215",
  appId: "1:788019079215:web:ee0b5aeb3b92df199e7eda",
  measurementId: "G-M4R3VPN4GC"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };

// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: "AIzaSyAq0eziYd1X47X7yVApoVUUqLjILU4AnS4",
//   authDomain: "fir-auth-cd162.firebaseapp.com",
//   projectId: "fir-auth-cd162",
//   storageBucket: "fir-auth-cd162.appspot.com",
//   messagingSenderId: "788019079215",
//   appId: "1:788019079215:web:ee0b5aeb3b92df199e7eda",
//   measurementId: "G-M4R3VPN4GC"
// };

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const firestore = getFirestore(app);

// export { auth, firestore };
