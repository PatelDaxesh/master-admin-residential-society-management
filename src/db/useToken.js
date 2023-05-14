import { useEffect, useState } from 'react'
import {initializeApp} from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import "firebase/auth";
import {app,auth} from '../db/firebase'

import {firebase} from "firebase/app";
import "firebase/auth";

export default function useToken() {
  const [currentUser,setcurrentuser]=useState(null);
  useEffect(()=>{
    // app.auth().onAuthStateChanged(setcurrentuser);
    // firebase.auth().currentUser;
  },[]);

  const getUser = () => {
    // const app = initializeApp(firebaseConfig);
    // const user = localStorage.getItem('user')
    // const user = auth.currentUser;
    console.log(currentUser);
    return JSON.parse(currentUser)
  }

  const [user, setUser] = useState(currentUser)

  const saveUser = user => {
    if(user){
      localStorage.setItem('user', JSON.stringify(user))
    }else{
      localStorage.removeItem('user')
    }
    setUser(user)
  }

  return {
    setUser: saveUser,
    user
  }
}