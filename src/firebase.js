import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, inMemoryPersistence } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDkUREWRKelG7la3nVy3dAgiRpN0UTqQec",
  authDomain: "hotel-booking-app-a54ef.firebaseapp.com",
  projectId: "hotel-booking-app-a54ef",
  storageBucket: "hotel-booking-app-a54ef.appspot.com",
  messagingSenderId: "577482399239",
  appId: "1:577482399239:web:7f910ef26de91d7a5714a2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, inMemoryPersistence); 
