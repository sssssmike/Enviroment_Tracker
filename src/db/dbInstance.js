import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBC7CYTus4U-4AU1fEMxjPvId0IYHcguvE",
    authDomain: "envirodb-6e5a0.firebaseapp.com",
    projectId: "envirodb-6e5a0",
    storageBucket: "envirodb-6e5a0.appspot.com",
    messagingSenderId: "362215290282",
    appId: "1:362215290282:web:9ae3b83fe9edba5f0267d3",
    measurementId: "G-SYCSG6ESW8"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { db }; 
