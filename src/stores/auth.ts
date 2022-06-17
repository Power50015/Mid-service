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
    if (querySnapshot.empty) {
      const q = query(
        collection(db, "admin"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        auth.userId = doc.id;
        auth.isLogin = true;
        auth.name = doc.data().name;
        auth.email = doc.data().email;
        auth.type = "admin";
      });
    } else {
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
        auth.nurseriesprice = doc.data().nurseriesprice;
        auth.isolation = doc.data().isolation;
        auth.isolationprice = doc.data().isolationprice;
        auth.room = doc.data().room;
        auth.roomprice = doc.data().roomprice;
        auth.intensive = doc.data().intensive;
        auth.intensiveprice = doc.data().intensiveprice;
        auth.apositive = doc.data().apositive;
        auth.apositiveprice = doc.data().apositiveprice;
        auth.anegative = doc.data().anegative;
        auth.anegativeprice = doc.data().anegativeprice;
        auth.bpositive = doc.data().bpositive;
        auth.bpositiveprice = doc.data().bpositiveprice;
        auth.bnegative = doc.data().bnegative;
        auth.bnegativeprice = doc.data().bnegativeprice;
        auth.abpositive = doc.data().abpositive;
        auth.abpositiveprice = doc.data().abpositiveprice;
        auth.abnegative = doc.data().abnegative;
        auth.abnegativeprice = doc.data().abnegativeprice;
        auth.opositive = doc.data().opositive;
        auth.opositiveprice = doc.data().opositiveprice;
        auth.onegative = doc.data().onegative;
        auth.onegativeprice = doc.data().onegativeprice;
        auth.type = "hospitals";
      });
      auth.featchReservations();
    }
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
    nurseriesprice: 0,
    isolation: 0,
    isolationprice: 0,
    room: 0,
    roomprice: 0,
    intensive: 0,
    intensiveprice: 0,
    apositive: 0,
    apositiveprice: 0,
    anegative: 0,
    anegativeprice: 0,
    bpositive: 0,
    bpositiveprice: 0,
    bnegative: 0,
    bnegativeprice: 0,
    abpositive: 0,
    abpositiveprice: 0,
    abnegative: 0,
    abnegativeprice: 0,
    opositive: 0,
    opositiveprice: 0,
    onegative: 0,
    onegativeprice: 0,
    reservations: [],
    type: "",
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
            nurseriesprice: 0,
            isolation: 0,
            isolationprice: 0,
            room: 0,
            roomprice: 0,
            intensive: 0,
            intensiveprice: 0,
            apositive: 0,
            apositiveprice: 0,
            anegative: 0,
            anegativeprice: 0,
            bpositive: 0,
            bpositiveprice: 0,
            bnegative: 0,
            bnegativeprice: 0,
            abpositive: 0,
            abpositiveprice: 0,
            abnegative: 0,
            abnegativeprice: 0,
            opositive: 0,
            opositiveprice: 0,
            onegative: 0,
            onegativeprice: 0,
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
            this.nurseriesprice = 0;
            this.isolation = 0;
            this.isolationprice = 0;
            this.room = 0;
            this.roomprice = 0;
            this.intensive = 0;
            this.intensiveprice = 0;
            this.apositive = 0;
            this.apositiveprice = 0;
            this.anegative = 0;
            this.anegativeprice = 0;
            this.bpositive = 0;
            this.bpositiveprice = 0;
            this.bnegative = 0;
            this.bnegativeprice = 0;
            this.abpositive = 0;
            this.abpositiveprice = 0;
            this.abnegative = 0;
            this.abnegativeprice = 0;
            this.opositive = 0;
            this.opositiveprice = 0;
            this.onegative = 0;
            this.onegativeprice = 0;
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    adminAddHostpital(
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
            nurseriesprice: 0,
            isolation: 0,
            isolationprice: 0,
            room: 0,
            roomprice: 0,
            intensive: 0,
            intensiveprice: 0,
            apositive: 0,
            apositiveprice: 0,
            anegative: 0,
            anegativeprice: 0,
            bpositive: 0,
            bpositiveprice: 0,
            bnegative: 0,
            bnegativeprice: 0,
            abpositive: 0,
            abpositiveprice: 0,
            abnegative: 0,
            abnegativeprice: 0,
            opositive: 0,
            opositiveprice: 0,
            onegative: 0,
            onegativeprice: 0,
          }).then((user) => {});
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
            this.nurseriesprice = doc.data().nurseriesprice;
            this.isolation = doc.data().isolation;
            this.isolationprice = doc.data().isolationprice;
            this.room = doc.data().room;
            this.roomprice = doc.data().roomprice;
            this.intensive = doc.data().intensive;
            this.intensiveprice = doc.data().intensiveprice;
            this.apositive = doc.data().apositive;
            this.apositiveprice = doc.data().apositiveprice;
            this.anegative = doc.data().anegative;
            this.anegativeprice = doc.data().anegativeprice;
            this.bpositive = doc.data().bpositive;
            this.bpositiveprice = doc.data().bpositiveprice;
            this.bnegative = doc.data().bnegative;
            this.bnegativeprice = doc.data().bnegativeprice;
            this.abpositive = doc.data().abpositive;
            this.abpositiveprice = doc.data().abpositiveprice;
            this.abnegative = doc.data().abnegative;
            this.abnegativeprice = doc.data().abnegativeprice;
            this.opositive = doc.data().opositive;
            this.opositiveprice = doc.data().opositiveprice;
            this.onegative = doc.data().onegative;
            this.onegativeprice = doc.data().onegativeprice;
            this.userId = doc.id;
            this.type = "hospitals";
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
    },
    adminLogin(email: string, password: string) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const q = query(collection(db, "admin"), where("email", "==", email));
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            this.isLogin = true;
            this.name = doc.data().name;
            this.email = doc.data().email;
            this.userId = doc.id;
            this.type = "admin";
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
        this.nurseriesprice = 0;
        this.isolation = 0;
        this.isolationprice = 0;
        this.room = 0;
        this.roomprice = 0;
        this.intensive = 0;
        this.intensiveprice = 0;
        this.apositive = 0;
        this.apositiveprice = 0;
        this.anegative = 0;
        this.anegativeprice = 0;
        this.bpositive = 0;
        this.bpositiveprice = 0;
        this.bnegative = 0;
        this.bnegativeprice = 0;
        this.abpositive = 0;
        this.abpositiveprice = 0;
        this.abnegative = 0;
        this.abnegativeprice = 0;
        this.opositive = 0;
        this.opositiveprice = 0;
        this.onegative = 0;
        this.onegativeprice = 0;
        this.type = "";
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
        case obj.hasOwnProperty("nurseriesprice"):
          this.nurseriesprice = Number(obj.nurseriesprice);
          break;
        case obj.hasOwnProperty("isolation"):
          this.isolation = Number(obj.isolation);
          break;
        case obj.hasOwnProperty("isolationprice"):
          this.isolationprice = Number(obj.isolationprice);
          break;
        case obj.hasOwnProperty("room"):
          this.room = Number(obj.room);
          break;
        case obj.hasOwnProperty("roomprice"):
          this.roomprice = Number(obj.roomprice);
          break;
        case obj.hasOwnProperty("intensive"):
          this.intensive = Number(obj.intensive);
          break;
        case obj.hasOwnProperty("intensiveprice"):
          this.intensiveprice = Number(obj.intensiveprice);
          break;
        case obj.hasOwnProperty("apositive"):
          this.apositive = Number(obj.apositive);
          break;
        case obj.hasOwnProperty("apositiveprice"):
          this.apositiveprice = Number(obj.apositiveprice);
          break;
        case obj.hasOwnProperty("anegative"):
          this.anegative = Number(obj.anegative);
          break;
        case obj.hasOwnProperty("anegativeprice"):
          this.anegativeprice = Number(obj.anegativeprice);
          break;
        case obj.hasOwnProperty("bpositive"):
          this.bpositive = Number(obj.bpositive);
          break;
        case obj.hasOwnProperty("bpositiveprice"):
          this.bpositiveprice = Number(obj.bpositiveprice);
          break;
        case obj.hasOwnProperty("bnegative"):
          this.bnegative = Number(obj.bnegative);
          break;
        case obj.hasOwnProperty("bnegativeprice"):
          this.bnegativeprice = Number(obj.bnegativeprice);
          break;
        case obj.hasOwnProperty("abpositive"):
          this.abpositive = Number(obj.abpositive);
          break;
        case obj.hasOwnProperty("abpositiveprice"):
          this.abpositiveprice = Number(obj.abpositiveprice);
          break;
        case obj.hasOwnProperty("abnegative"):
          this.abnegative = Number(obj.abnegative);
          break;
        case obj.hasOwnProperty("abnegativeprice"):
          this.abnegativeprice = Number(obj.abnegativeprice);
          break;
        case obj.hasOwnProperty("opositive"):
          this.opositive = Number(obj.opositive);
          break;
        case obj.hasOwnProperty("opositiveprice"):
          this.opositiveprice = Number(obj.opositiveprice);
          break;
        case obj.hasOwnProperty("onegative"):
          this.onegative = Number(obj.onegative);
          break;
        case obj.hasOwnProperty("onegativeprice"):
          this.onegativeprice = Number(obj.onegativeprice);
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
