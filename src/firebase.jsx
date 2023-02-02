import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey: "AIzaSyCaow7i-AexrzSrxGbXY1Vv91kdaj_QYs0",
  authDomain: "supermedia-98695.firebaseapp.com",
  projectId: "supermedia-98695",
  storageBucket: "supermedia-98695.appspot.com",
  messagingSenderId: "267010387609",
  appId: "1:267010387609:web:41edc9207dbd12349f1208"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;