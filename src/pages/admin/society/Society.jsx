import { Box } from '@mui/system'
import React, { useEffect, useState, useContext } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button, IconButton, Typography,
    ToggleButtonGroup, } from '@mui/material';
import { CloseCircle, FolderOpen, Zoom } from 'iconsax-react';
import { query, collection, getDocs, where } from "firebase/firestore";
import {auth, db, logout} from '../../../db/firebase';
import { useNavigate } from 'react-router-dom';
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import { dataTableTheme } from '../../../values/DataTableTheme'
import { colors } from '../../../values/Colors'
import { ThemeProvider } from "@mui/material/styles"
import { PageHeader } from '../../../components/pageHeader/PageHeader'
import { Controller, useForm } from "react-hook-form"
import { async } from '@firebase/util';
// import AppContext from '../AppContext'




const Society = () => {
  const navigate = useNavigate();
  const [society_data,setsociety_data]=useState([]);
  const [name, setName] = useState("");
  const [alignment, setAlignment] = React.useState('web');

  const ToggleButton = ({isActive, rowId, updateActiveStatus}) =>{
    // setIsActive(isActive);
    const [buttonText, setButtonText]=useState(isActive ? 'Active' : 'InActive');
    const [buttonColor, setButtonColor]=useState(isActive ? 'success' : 'error');
    const handleClick =async () =>{
        const newActiveStatus = !isActive;
        setButtonText(newActiveStatus ? 'Active' : 'InActive');
        await updateActiveStatus(rowId, newActiveStatus);
    };
    return <Button variant="contained" size='large' color={buttonColor} sx={{width:'fit-content',color:colors.whiteColor}} onClick={handleClick}>{buttonText}</Button>
};
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
  const Fetchdata2=async ()=>{
    console.log("hdjd");
    // const database=firebase.firestore();
    // const doc_ref = await getDocs(collection(db, 'societies_name'))
    // const docs = doc_ref.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    

    const snapshot = await db.collection("societies_name").get();
    const data = snapshot.docs.map((doc) => ({
        id:doc.id,
        ...doc.data(),
    // console.log(data);
   
    // setsociety_data(docs);
    // console.log(society_data);
    }));
    setsociety_data(data);

  };
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener
      if (user) {
        console.log(user.uid);
          fetchUserName(user.uid);
          Fetchdata2();
         
      } else {
          navigate("/");
      }
  });
  return () => unsubscribe(); 
    }, []);
       const columns = [
        {
            name: "id",
            label : "ID",
            options: {
              filter:true,
              sort:true,
              display:false,
            }
          },
    {
          name: "society_name",
          label : "Society Name",
          options: {
            filter:true,
            sort:true,
          }
        },
        {
            name: "society_address",
            label: "Society Address",
            options: {
                filter:true,
                sort:true,
            }
          },
      {
        name: "gs",
        label: "Society General Secretory",
        options: {
            filter:true,
            sort:true,
        }
      },
        {
            name: 'isActive',
            label:'Action',
             options: {
                customBodyRender: (value, tableMeta, updateValue) =>(
                    console.log("value is",value),
                    console.log(tableMeta.rowIndex),
                    <ToggleButton
                    isActive={value}
                    rowId={tableMeta.rowIndex}
                    updateActiveStatus={updateActiveStatus}
                    />
                ),
            }
        }
    ];


const updateActiveStatus = async (rowId, isActive)=>{

    console.log("rowId is",rowId);
    const userToUpdate = society_data[rowId];
    console.log(userToUpdate.id);
    await db.collection('societies_name').doc(userToUpdate.id).update({"isActive":isActive});
    // const snapshot = await db.collection("societies_name").get();
    // const data = snapshot.docs.map(doc => doc.data());
    const snapshot = await db.collection("societies_name").get();
    const data = snapshot.docs.map((doc) => ({
        id:doc.id,
        ...doc.data(),
    // console.log(data);
   
    // setsociety_data(docs);
    // console.log(society_data);
    }));
    setsociety_data(data);
}
    
   const options = {
    filter: true,
    onFilterChange: (changedColumn, filterList) => {
      console.log(changedColumn, filterList);
    },
    print: false,
    selectableRows: 'none',
    filterType: 'dropdown',
    responsive: 'standard',
    rowsPerPage: 100,
    downloadOptions:{
      filename: `Society Details`
    },
  }
    return (
        <>
        <PageHeader text={'Manage Society Requests'}/>    
        <Box sx={{paddingX:{xs:3, sm:6, md:9}, paddingY:6}}>
          <ThemeProvider theme={dataTableTheme}>
          {console.log(society_data[0])}
            <MUIDataTable data={society_data} columns={columns} options={options} />
          </ThemeProvider>
        </Box>
      </>
    )
}

export default Society
