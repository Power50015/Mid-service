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
    const auth = useAuthStore();
    const q = query(
      collection(db, "hospitals"),
      where("email", "==", user.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
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
      auth.apositive = doc.data().apositive;
      auth.anegative = doc.data().anegative;
      auth.bpositive = doc.data().bpositive;
      auth.bnegative = doc.data().bnegative;
      auth.abpositive = doc.data().abpositive;
      auth.abnegative = doc.data().abnegative;
      auth.opositive = doc.data().opositive;
      auth.onegative = doc.data().onegative;
    });
    auth.featchReservations();
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
    apositive: 0,
    anegative: 0,
    bpositive: 0,
    bnegative: 0,
    abpositive: 0,
    abnegative: 0,
    opositive: 0,
    onegative: 0,
    reservations: [],
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
            apositive: 0,
            anegative: 0,
            bpositive: 0,
            bnegative: 0,
            abpositive: 0,
            abnegative: 0,
            opositive: 0,
            onegative: 0,
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
            this.apositive = 0;
            this.anegative = 0;
            this.bpositive = 0;
            this.bnegative = 0;
            this.abpositive = 0;
            this.abnegative = 0;
            this.opositive = 0;
            this.onegative = 0;
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
            this.apositive = doc.data().apositive;
            this.anegative = doc.data().anegative;
            this.bpositive = doc.data().bpositive;
            this.bnegative = doc.data().bnegative;
            this.abpositive = doc.data().abpositive;
            this.abnegative = doc.data().abnegative;
            this.opositive = doc.data().opositive;
            this.onegative = doc.data().onegative;
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
        this.apositive = 0;
        this.anegative = 0;
        this.bpositive = 0;
        this.bnegative = 0;
        this.abpositive = 0;
        this.abnegative = 0;
        this.opositive = 0;
        this.onegative = 0;
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
        case obj.hasOwnProperty("apositive"):
          this.apositive = Number(obj.apositive);
          break;
        case obj.hasOwnProperty("anegative"):
          this.anegative = Number(obj.anegative);
          break;
        case obj.hasOwnProperty("bpositive"):
          this.bpositive = Number(obj.bpositive);
          break;
        case obj.hasOwnProperty("bnegative"):
          this.bnegative = Number(obj.bnegative);
          break;
        case obj.hasOwnProperty("abpositive"):
          this.abpositive = Number(obj.abpositive);
          break;
        case obj.hasOwnProperty("abnegative"):
          this.abnegative = Number(obj.abnegative);
          break;
        case obj.hasOwnProperty("opositive"):
          this.opositive = Number(obj.opositive);
          break;
        case obj.hasOwnProperty("onegative"):
          this.onegative = Number(obj.onegative);
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
    async featchReservations() {
      this.reservations = [];
      const q = query(
        collection(db, "reservation"),
        where("hospital", "==", this.email)
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        this.reservations.push({ id: doc.id, ...doc.data() });
      });
    },
    editReservations(id: any) {
      updateDoc(doc(db, "reservation", id), {
        state: 1,
      }).then(() => {
        this.featchReservations();
      });
    },
  },
});
