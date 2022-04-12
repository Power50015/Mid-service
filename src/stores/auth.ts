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
import {
  getStorage,
  ref,
  uploadBytesResumable,
  uploadString,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

// wait until auth is ready
const unsub = await onAuthStateChanged(auth, async (user) => {
  if (user) {
    const q = query(
      collection(db, "hospitals"),
      where("email", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const auth = useAuthStore();
      auth.userId = doc.id;
      auth.isLogin = true;
      auth.name = doc.data().name;
      auth.email = doc.data().email;
      auth.map = doc.data().map;
      auth.address = doc.data().address;
      auth.area = doc.data().area;
      auth.image = doc.data().image;
      auth.nurseries = doc.data().nurseries;
      auth.isolation = doc.data().isolation;
      auth.room = doc.data().room;
      auth.intensive = doc.data().intensive;
      auth.APositive = doc.data().APositive;
      auth.ANegative = doc.data().ANegative;
      auth.BPositive = doc.data().BPositive;
      auth.BNegative = doc.data().BNegative;
      auth.ABPositive = doc.data().ABPositive;
      auth.ABNegative = doc.data().ABNegative;
      auth.OPositive = doc.data().OPositive;
      auth.ONegative = doc.data().ONegative;
    });
  }
  unsub();
});

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isLogin: false,
    userId: "",
    name: "",
    email: "",
    map: "",
    area: "",
    address: "",
    image: "",
    nurseries: 0,
    isolation: 0,
    room: 0,
    intensive: 0,
    APositive: 0,
    ANegative: 0,
    BPositive: 0,
    BNegative: 0,
    ABPositive: 0,
    ABNegative: 0,
    OPositive: 0,
    ONegative: 0,
  }),
  actions: {
    addHostpital(
      name: string,
      address: string,
      map: string,
      area: string,
      email: string,
      password: string,
      image: string
    ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // Add a new document in collection "hospitals"
          addDoc(collection(db, "hospitals"), {
            name: name,
            email: email,
            address: address,
            map: map,
            area: area,
            image: image,
            nurseries: 0,
            isolation: 0,
            room: 0,
            intensive: 0,
            APositive: 0,
            ANegative: 0,
            BPositive: 0,
            BNegative: 0,
            ABPositive: 0,
            ABNegative: 0,
            OPositive: 0,
            ONegative: 0,
          }).then((user) => {
            this.userId = user.id;
            this.isLogin = true;
            this.name = name;
            this.email = email;
            this.address = address;
            this.map = map;
            this.area = area;
            this.image = image;
            this.nurseries = 0;
            this.isolation = 0;
            this.room = 0;
            this.intensive = 0;
            this.APositive = 0;
            this.ANegative = 0;
            this.BPositive = 0;
            this.BNegative = 0;
            this.ABPositive = 0;
            this.ABNegative = 0;
            this.OPositive = 0;
            this.ONegative = 0;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    login(email: string, password: string) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const q = query(
            collection(db, "hospitals"),
            where("email", "==", email)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            this.isLogin = true;
            this.name = doc.data().name;
            this.email = doc.data().email;
            this.map = doc.data().map;
            this.area = doc.data().area;
            this.address = doc.data().address;
            this.nurseries = doc.data().nurseries;
            this.isolation = doc.data().isolation;
            this.room = doc.data().room;
            this.intensive = doc.data().intensive;
            this.APositive = doc.data().APositive;
            this.ANegative = doc.data().ANegative;
            this.BPositive = doc.data().BPositive;
            this.BNegative = doc.data().BNegative;
            this.ABPositive = doc.data().ABPositive;
            this.ABNegative = doc.data().ABNegative;
            this.OPositive = doc.data().OPositive;
            this.ONegative = doc.data().ONegative;
            this.userId = doc.id;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    logout() {
      signOut(auth).then(() => {
        this.isLogin = false;
        this.name = "";
        this.email = "";
        this.area = "";
        this.address = "";
        this.map = "";
        this.nurseries = 0;
        this.isolation = 0;
        this.room = 0;
        this.intensive = 0;
        this.APositive = 0;
        this.ANegative = 0;
        this.BPositive = 0;
        this.BNegative = 0;
        this.ABPositive = 0;
        this.ABNegative = 0;
        this.OPositive = 0;
        this.ONegative = 0;
      });
    },
    async editData(obj: any) {
      updateDoc(doc(db, "hospitals", this.userId), obj).then(async () => {
        this.editDataLocal(obj);
      });
    },
    editDataLocal(obj: any) {
      switch (true) {
        case obj.hasOwnProperty("nurseries"):
          this.nurseries = Number(obj.nurseries);
          break;
        case obj.hasOwnProperty("isolation"):
          this.isolation = Number(obj.isolation);
          break;
        case obj.hasOwnProperty("room"):
          this.room = Number(obj.room);
          break;
        case obj.hasOwnProperty("intensive"):
          this.intensive = Number(obj.intensive);
          break;
        case obj.hasOwnProperty("APositive"):
          this.APositive = Number(obj.APositive);
          break;
        case obj.hasOwnProperty("ANegative"):
          this.ANegative = Number(obj.ANegative);
          break;
        case obj.hasOwnProperty("BPositive"):
          this.BPositive = Number(obj.BPositive);
          break;
        case obj.hasOwnProperty("BNegative"):
          this.BNegative = Number(obj.BNegative);
          break;
        case obj.hasOwnProperty("ABPositive"):
          this.ABPositive = Number(obj.ABPositive);
          break;
        case obj.hasOwnProperty("ABNegative"):
          this.ABNegative = Number(obj.ABNegative);
          break;
        case obj.hasOwnProperty("OPositive"):
          this.OPositive = Number(obj.OPositive);
          break;
        case obj.hasOwnProperty("ONegative"):
          this.ONegative = Number(obj.ONegative);
          break;
        default:
          break;
      }
    },
    async editHostpital(
      name: string,
      address: string,
      map: string,
      area: string,
      image: string
    ) {
      updateDoc(doc(db, "hospitals", this.userId), {
        name: name,
        address: address,
        map: map,
        area: area,
        image: image,
      }).then(async () => {
        this.name = name;
        this.address = address;
        this.map = map;
        this.area = area;
        this.image = image;
      });
    },
  },
});
