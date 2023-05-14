import { query, collection, getDocs, where } from "firebase/firestore";
import {auth, db, logout} from '../../../db/firebase';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Grid,Typography } from '@mui/material'
import SocietyIcon from '../../../assets/images/society.png'
import {PageHeader} from '../../../components/pageHeader/PageHeader'
import { colors } from '../../../values/Colors'
import { async } from "@firebase/util";
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import { SubDashboardCard } from "../../../components/cards/SubDashboardCard/SubDashboardCard";

const SubDashboard = () => {
    // const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    // const [uid, setuid] = useState("");
    const [totalsociety, settotalsociety] = useState(0);
    // const [societyData,setSocietyData]=({societyname:"",societyaddress:"",gsName:"",totalBlock:"",totalHouse:""})
    const navigate = useNavigate();
    const [society_data,setsociety_data]=useState([]);
    // const [gs,setgs]=useState();
    var doc_ref;
    const fetchUserName = async (user_uid) => {
        try {
          const q = query(collection(db, "admin"), where("id", "==", user_uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          // setuid(auth.currentUser.id);
          setName(data.admin_name);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };
    const Fetchdata = async()=>{
        const doc_ref = await getDocs(collection(db, 'societies_name'))
        const docs = doc_ref.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        // setsociety_data(doc_ref);
        firebase.firestore().collection("societies_name").get().then((snapshot) => {
            // console.log(snapshot.data())
          }).catch((e) => console.log(e))
        // console.log(doc_ref);
        // doc_ref.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        //     var q = query(collection(db, "user_profile"), where("society_name", "==", doc.data().society_name), where("society_address","==",doc.data().society_address), where("user_type","==","gs"));
        //     for (var snapshot in q.docs){
        //         var user_type=snapshot.user_type;
        //         console.log(user_type);
        //     }
            
        //   });
        // const collectionRef = db.collection('societies_name');
        settotalsociety(doc_ref.size);
        // settotalsociety(doc_refs.size);
        // console.log(totalsociety);
        // return snapshot;
    }
    const Fetchdata2=async ()=>{
      console.log("hdjd");
      // const database=firebase.firestore();
      const doc_ref = await getDocs(collection(db, 'societies_name'))
      const docs = doc_ref.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setsociety_data(docs);
      // const docRef=db.collection("societies_name").get().then((doc)=>{
      //   // if(doc.exists){
      //     doc.forEach((snapshot)=>{
      //       console.log(snapshot.data().society_name);
      //       console.log(snapshot.data().society_address);
      //       // db.collection("user_profile").where({"society_name":snapshot.data().society_name}).where({"society_address":snapshot.data().society_address}).where({"user_type":"gs"}).get().then((snapshot2)=>{
      //       //   if(snapshot2.size!=0){
      //       //     snapshot2.forEach((s1)=>{
      //       //       console.log(s1.data().user_name);
      //       //     })
      //       //     // console.log(snapshot2.data());
      //       //   }
             
      //       // })
      //     })
      //     setsociety_data(doc.docs.data());
      //     console.log(doc.docs.data());
      //     // console.log("hello");
      //     // console.log(doc.data());
      //   // }
      // })
    }
    useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener
        if (user) {
          console.log(user.uid);
          // setUser(user.uid);
            // ...your code to handle authenticated users. 
            // navigate("/admin");
            fetchUserName(user.uid);
            Fetchdata2();
           
        } else {
            // No user is signed in...code to handle unauthenticated users. 
            navigate("/");
        }
    });
    return () => unsubscribe(); 
        // if (loading) return;
        // if (!user) return navigate("/");
        // // fetchUserName();
        // // Fetchdata();
        // Fetchdata2();
        // dashboarddata();
      }, []);
  return (
   <>
   <PageHeader text={'Lets Explore Societies'}/>
    <Grid container spacing={3} paddingTop={3} sx={{paddingX:{xs:3, sm:6, md:9}}}>
        {
          society_data?
            society_data.map(society => {
                return <Grid key={society.id} item xs={12} sm={6} md={4}><SubDashboardCard handleCardClick={()=> navigate('/admin/subdashboard/societyinformations', {state: {society}})} society={society} isCardClickable={true}/></Grid>
              })
              :
              <Grid item><Typography variant='h5' fontFamily='PoppinsRegular' color='text.primary' bgcolor={colors.inActiveColor} width='fit-content' borderRadius={2} padding={0.5}>No record found!</Typography></Grid>

          
     
        }
    </Grid>
   </>
  )
}

export default SubDashboard