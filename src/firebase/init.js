import firebase from "firebase"
import firestore from "firebase/firestore"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCmByB_3rZbB_KhP-k5Uk7BBs3ncR5j_0E",
    authDomain: "library-27d3d.firebaseapp.com",
    projectId: "library-27d3d",
    storageBucket: "library-27d3d.appspot.com",
    messagingSenderId: "921275090009",
    appId: "1:921275090009:web:52ebf7f613e1db819e9d48",
    measurementId: "G-NB41PE69V8"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

firebase.analytics();
export default firebaseApp.firestore()