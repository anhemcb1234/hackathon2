// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCx87Mf7Ir1amSfWbO5OBdpKRuVxkewARo",
    authDomain: "hackathon2-ffa32.firebaseapp.com",
    databaseURL: "https://hackathon2-ffa32-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hackathon2-ffa32",
    storageBucket: "hackathon2-ffa32.appspot.com",
    messagingSenderId: "565048692034",
    appId: "1:565048692034:web:bf8b03e29386e7eff90cdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//firestore database //lưu trữ CSDL
const db = getFirestore(app);
const auth = getAuth(app);
export {db, auth};
