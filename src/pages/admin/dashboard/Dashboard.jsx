// import {  signOut } from "firebase/auth";
// import {auth, db, logout} from '../../../db/firebase';
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Box, Grid } from '@mui/material'
import SocietyIcon from '../../../assets/images/society.png'
import {PageHeader} from '../../../components/pageHeader/PageHeader'
import { DashboardCard } from "../../../components/cards/dashboardCard/DashboardCard";
import {db,logInWithEmailAndPassword,registerWithEmailAndPassword,sendPasswordReset,logout} from "../../../db/firebase";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
 
const Dashboard = () => {
    // const [user, loading, error] = useAuthState(firebase);
    const [user,setUser]=useState();
  const [name, setName] = useState("");
  const [uid, setuid] = useState("");
  const [totalsociety, settotalsociety] = useState(0);
    const navigate = useNavigate();

    const fetchUserName = async (user_uid) => {
        try {
          // db.collection("admin").where("id","==",user).get()
          // console.log(user);
          const q = query(collection(db, "admin"), where("id", "==",user_uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          // setuid(firebase.user.uid);
          setName(data.admin_name);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };
     
 
    // Fetch the required data using the get() method
    const Fetchdata = async()=>{
        // db.collection("societies_name").get().then((querySnapshot) => {
            
        //     // Loop through the data and store
        //     // it in array to display
        //     querySnapshot.forEach(element => {
        //         var data = element.data();
        //         setInfo(arr => [...arr , data]);
                 
        //     });
        // })
        const doc_refs = await getDocs(collection(db, 'societies_name'))
        // const collectionRef = db.collection('societies_name');
        // total_society = doc_refs.size;
        settotalsociety(doc_refs.size);
        console.log(totalsociety);
        // return snapshot;
    }

      useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener
          if (user) {
            console.log(user.uid);
            setUser(user.uid);
              // ...your code to handle authenticated users. 
              // navigate("/admin");
              fetchUserName(user.uid);
        Fetchdata();
             
          } else {
              // No user is signed in...code to handle unauthenticated users. 
              navigate("/");
          }
      });
      return () => unsubscribe(); 
        // if (loading) return;
        // if (!user) return navigate("/");
        // fetchUserName();
        // Fetchdata();
        // // dashboarddata();
      }, []);
 

   
    return(
        <>
            <PageHeader text={`Hie, Welcome back ${name}`}/>
            <Grid container spacing={6} sx={{paddingX:{xs:3, sm:6, md:9}}}>
              <Grid item xs={12} sm={6} md={3}><DashboardCard handleCardClick={()=> navigate('/admin/subdashboard')} text={'Total Society'} numbers={totalsociety} icon={SocietyIcon} isCardClickable={true}/></Grid>
              {/* <Grid item xs={12} sm={6} md={3}><DashboardCard text={'Programmes'} numbers={dashboard.data[12].table_rows} icon={ProgrammesIcon} isCardClickable={false} handleCardClick={null}/></Grid>
              <Grid item xs={12} sm={6} md={3}><DashboardCard text={'Departments'} numbers={dashboard.data[6].table_rows} icon={DepartmentsIcon} isCardClickable={false} handleCardClick={null}/></Grid>
              <Grid item xs={12} sm={6} md={3}><DashboardCard text={'Faculties'} numbers={dashboard.data[9].table_rows} icon={FacultiesIcon} isCardClickable={false} handleCardClick={null}/></Grid>
              <Grid item xs={12} sm={6} md={3}><DashboardCard text={'Students'} numbers={dashboard.data[14].table_rows} icon={StudentsIcon} isCardClickable={false} handleCardClick={null}/></Grid>
              <Grid item xs={12} sm={6} md={3}><DashboardCard text={'Subjects'} numbers={dashboard.data[16].table_rows} icon={SubjectsIcon} isCardClickable={false} handleCardClick={null}/></Grid>
              <Grid item xs={12} sm={6} md={3}><DashboardCard text={'Exam Types'} numbers={dashboard.data[8].table_rows} icon={ExamTypesIcon} isCardClickable={false} handleCardClick={null}/></Grid>
              <Grid item xs={12} sm={6} md={3}><DashboardCard text={'Exams'} numbers={dashboard.data[7].table_rows} icon={ExamsIcon} isCardClickable={false} handleCardClick={null}/></Grid>
              <Grid item xs={12} sm={6} md={3}><DashboardCard text={'Results'} numbers={dashboard.data[7].table_rows} icon={ResultsIcon} isCardClickable={false} handleCardClick={null}/></Grid>
              <Grid item xs={12} sm={6} md={3}><DashboardCard text={'Notices'} numbers={dashboard.data[11].table_rows} icon={NoticesIcon} isCardClickable={false} handleCardClick={null}/></Grid>
              <Grid item xs={12} sm={6} md={3}><DashboardCard text={'Activities'} numbers={dashboard.data[0].table_rows} icon={CoursesIcon} isCardClickable={false} handleCardClick={null}/></Grid> */}
            </Grid>
          </>
    )
}
 
export default Dashboard;