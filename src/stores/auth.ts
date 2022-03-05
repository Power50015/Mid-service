import { defineStore } from "pinia";
import app from "../firebase";
import { getFirestore } from "firebase/firestore";
import {
  doc,
  updateDoc,
  setDoc,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const auth = getAuth();
const db = getFirestore();

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isLogin: false,
    name: "",
    email: "",
  }),
  actions: {
    addHostpital(
      name: string,
      address: string,
      area: string,
      email: string,
      password: string
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Add a new document in collection "cities"
          addDoc(collection(db, "Hospital"), {
            name: name,
            email: email,
            address: address,
            area: area,
          }).then(() => {
            // context.commit("userData", {
            //   type: payload.type,
            //   name: payload.form.name,
            //   email: payload.form.email,
            //   login: true,
            // });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
  },
});
