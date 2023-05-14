import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import {
//     // ​​  GoogleAuthProvider,
//     getAuth,
//     // ​​  signInWithPopup,
//     signInWithEmailAndPassword,
//     createUserWithEmailAndPassword,
//     sendPasswordResetEmail,
//     signOut,
// } from "firebase/auth";
import 'firebase/compat/auth';
// import {
//     getFirestore,
//         // ​​  query,
//         // ​​  getDocs,
//     collection,
//         // ​​  where,
//     addDoc,
// } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBS6bKrNMeiQSHDZxSvw8oXwCRvXM6RbmA",
    authDomain: "residential-society-management.firebaseapp.com",
    projectId: "residential-society-management",
    storageBucket: "residential-society-management.appspot.com",
    messagingSenderId: "965362853556",
    appId: "1:965362853556:web:fc9d4dd00fddc2008ad9e1",
    measurementId: "G-Q5335PF8PS"
  };

firebase.initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
const db = firebase.firestore();


const logInWithEmailAndPassword = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const registerWithEmailAndPassword = async (name, email, password) => {
    try {
      const res = await firebase.auth().createUserWithEmailAndPassword( email, password);
      const user = res.user;
      db.collection("admin").add({
        id:user.uid,
        admin_name:name,
        admin_email:email,  
        admin_password:password,
      }).then((docref)=>{
        console.log("document added successfully");
      }).catch((error)=>{
        console.log("error adding in documents");
      });
    //   await addDoc(collection(db, "admin"), {
    //     uid: user.uid,
    //     name,
    //     authProvider: "local",
    //     email,
    //   });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
}



    const sendPasswordReset = async (email) => {
        try {
          await firebase.auth().sendPasswordResetEmail( email);
          alert("Password reset link sent!");
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
      };

      const logout = () => {
        firebase.auth().signOut();
      };

      export {
        // app,
        // auth,
        db,
        // signInWithGoogle,
        logInWithEmailAndPassword,
        registerWithEmailAndPassword,
        sendPasswordReset,
        logout,
      };

// export default app;

