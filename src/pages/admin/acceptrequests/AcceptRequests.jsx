import { Box } from '@mui/system'
import React, { useEffect, useState, useContext } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button, IconButton, Typography } from '@mui/material';
import { CloseCircle, FolderOpen, Zoom } from 'iconsax-react';
import { query, collection, getDocs, where } from "firebase/firestore";
import {auth, db, logout} from '../../../db/firebase';
import { useNavigate } from 'react-router-dom';
import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import { dataTableTheme } from '../../../values/DataTableTheme'
import { ThemeProvider } from "@mui/material/styles"
import { PageHeader } from '../../../components/pageHeader/PageHeader'

const AcceptRequests = () => {
  const [teams, setteams] = useState()
  const [tempteam, settempteam] = useState()
  const [action, setaction] = useState()
  const [showteam, setshowteam] = useState(false)
  const navigate = useNavigate();
  const [society_data,setsociety_data]=useState([]);
  const [name, setName] = useState("");
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
    

    const snapshot = await db.collection("user_profile").where("isadminapprove","==","false").where("user_type","==","gs").get();
    const data = snapshot.docs.map(doc => doc.data());
    console.log(data);
    return data;
    // setsociety_data(docs);
    // console.log(society_data);
  }
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener
      if (user) {
        console.log(user.uid);
          fetchUserName(user.uid);
          Fetchdata2().then(data => setsociety_data(data));
         
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
                display:false
              }
            },
{
      name: "user_name",
      label : "User Name",
      options: {
        filter:true,
        sort:true,
      }
    },
    {
        name: "society_name",
        label: "Society Name",
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
    name: "block_number",
    label: "Block Number",
    options: {
        filter:true,
        sort:true,
    }
  },
  {
    name: "house_number",
    label: "House Number",
    options: {
        filter:true,
        sort:true,
    }
  },
  {
    name: "phone_number",
    label: "Phone Number",
    options: {
        filter:true,
        sort:true,
    }
  },
    {
        name: 'Action', options: {
            customBodyRender: (value, tableMeta, updateValue) => {
                return (
                    <Box>
                        <Button sx={{ marginRight: '1rem' }} variant='contained'
                            onClick={() => {
                                console.log(tableMeta.rowData[0]);
                                console.log(tableMeta);
                                db.collection("user_profile").doc(tableMeta.rowData[0]).update({"isadminapprove":"true"}).then((snapshot)=>{
                                    console.log(tableMeta); 
                                    Fetchdata2().then(data => setsociety_data(data));
                                //     db.collection("user_profile").doc(tableMeta.rowData[0]).get().then((value)=>{
                                //       var society_namme=value.get('society_name');
                                //       var society_addess=value.get('society_address');
                                //       console.log("society nammm",society_namme);
                                //       console.log("society nammm",society_addess);
                                //       db.collection("societies_name").where("society_name","==",society_namme).where("society_address","==",society_addess).get().then((snapshot)=>{
                                //         var id, isActivestatus;
                                //         const q = query(collection(db, "societies_name"), where("society_name","==",society_namme) , where("society_address","==",society_addess));
                                //           const doc = getDocs(q);
                                //           console.log(doc);
                                //           const data = doc.docs[0].data();
                                //           // setuid(auth.currentUser.id);
                                //           id=data.id;
                                //           isActivestatus=data.isActivestatus;
                                //         // for(var j in snapshot.docs){
                                          
                                //         // console.log(j);
                                //         //   id=j['id'];
                                //         //   isActivestatus=j['isActivestatus'];
                                //         //   console.log("society nammm",id);
                                //         //   console.log("society nammm",isActivestatus);
                                //         // }
                                //         db.collection("societies_name").doc(id).update({
                                //           'isActive':true,
                                //         })
                                //     })
                                // })

                                // api.post('/approveteam', { name: tableMeta.rowData[0] })
                                //     .then(res => {
                                //         alert(res.data.message)
                                //         api.get('/notapprovedteams')
                                //             .then(res => {
                                //                 console.log(res.data)
                                //                 setteams(res.data)
                                //             })
                                //             .catch(e => { })
                                //     })
                                //     .catch(err => { })
                            }).catch((e)=>{
                                    console.log(e);
                                });
                            }}>
                            Accept
                        </Button>
                        <Button variant='outlined'
                            onClick={() => {
                                console.log(tableMeta.rowData[0]);
                                console.log(tableMeta);
                                db.collection("user_profile").doc(tableMeta.rowData[0]).update({"isadminapprove":"disabled"}).then((snapshot)=>{
                                    console.log(tableMeta); 
                                    Fetchdata2().then(data => setsociety_data(data));
                                }).catch((e)=>{
                                    console.log(e);
                                });
                                // api.post('/deleteteam', { name: tableMeta.rowData[0] })
                                //     .then(res => {
                                //         alert(res.data.message)
                                //         api.get('/notapprovedteams')
                                //             .then(res => {
                                //                 console.log(res.data)
                                //                 setteams(res.data)
                                //             })
                                //             .catch(e => { })
                                //     })
                                //     .catch(err => { })
                            }}>
                            Reject
                        </Button>
                    </Box>

                )
            },
        }
    }
];
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
//    if(society_data) {
    return (
        <>
        <PageHeader text={'Manage Society Requests'}/>
        {/* <Stack width='fit-content' sx={{paddingX:{xs:3, sm:6, md:9}}} spacing={3}>
            <Button variant="outlined" startIcon={<AddIcon/>} size="large" onClick={()=> navigate('/admin/students/new') }>Add Students</Button>
        </Stack> */}
        
        <Box sx={{paddingX:{xs:3, sm:6, md:9}, paddingY:6}}>
          <ThemeProvider theme={dataTableTheme}>
          {console.log(society_data[0])}
            <MUIDataTable data={society_data} columns={columns} options={options} />
          </ThemeProvider>
        </Box>
      </>
    )
}

export default AcceptRequests
