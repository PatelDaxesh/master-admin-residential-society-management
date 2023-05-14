import React, { useState } from 'react'
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
  } from "@mui/material"
import { useForm } from "react-hook-form"
import { PageHeader } from "../../../components/pageHeader/PageHeader"
import profileBackground from "../../../assets/images/profileBackground.png"
import { useOutletContext } from 'react-router-dom'
import { useEffect } from 'react'
// import Service from '../../../db/service'
import LogoutIcon from '@mui/icons-material/Logout'
import { BackdropProgress } from '../../../components/backdropProgress/BackdropProgress'
import { AlertDialog } from '../../../components/alertDialog/AlertDialog'
import { AlertDialogWithTwoAction } from '../../../components/alertDialog/AlertDialogWithTwoAction'
import { colors } from '../../../values/Colors'
import { db, logout} from '../../../db/firebase';
import { query, collection, getDocs, where } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';

const Account = () => {
    // const [user, loading, error] = useAuthState(auth);

    // State for handling form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // State for storing admin
    const [admin, setAdmin] = useState()
    const navigate = useNavigate();
    

    // State for tracking Alert Dialog
    const [alert, setAlert] = useState({status:'success',open:false,message:''})

    // State for tracking Alert Dialog of Logout
    const [alertForLogout, setAlertForLogout] = useState({status:'Logout',open:false,message:'Do you really want to logout?'})

    // State for tracking Backdrop Progress
    const [backdropProgress, setBackdropProgress] = useState(false)

    // Method for changing Backdrop Progress status
    const handleBackdropProgress = (status) => {
        setBackdropProgress(status)
    }

    // Fetching info from LocalStorage
    // const user = useOutletContext()
    // const bearer = user.token
    // const adminID = user.userID

    // Fetching admin from database
    // useEffect(()=>{
    //     const service = new Service()
  
    //     service.Get(`api/admins/${adminID}`, bearer)
    //     .then(res => {
    //     console.log(res)
    //     if(res.status===401){
    //         throw Error('401')
    //     }
    //     if(!res.ok){
    //         throw Error('Could not fetch the data!')
    //     }
    //     return res.json()
    //     })
    //     .then(data => {
    //         setAdmin({dataLoaded:true, status:data.status, data:data.data, error:null})
    //     })
    //     .catch(err => {
    //         setAdmin({dataLoaded:true, status:null, data:null, error:err.message})
    //     })
    // },[bearer, adminID])
    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener
            if (user) {
              console.log(user.uid);
            //   setUser(user.uid);
                // ...your code to handle authenticated users. 
                // navigate("/admin");
                fetchUserName(user.uid);
        //   Fetchdata();
               
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
        // dashboarddata();
      }, []);

      const fetchUserName = async (user_uid) => {
        try {
          const q = query(collection(db, "admin"), where("id", "==", user_uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          console.log(data);
          setAdmin(data);
        //   console.log(admin.admin_name)
        //   setName(data.admin_name);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };
     

    // Submitting form data to database
    const onSubmit = (accountData) => {

        // handleBackdropProgress(true)

        // const service = new Service()
        // service.Put(`api/admins/${adminID}`, bearer, accountData)
        // .then(res => {
        //   handleBackdropProgress(false)
        //   if(!res.ok){
        //     throw Error('Could not perform the operation!')
        //   }
        //   return res.json()
        // })
        // .then(data => {
        //   if(data.status){
        //     setAlert(prevState => ({...prevState, open:true, status:'success', message:data.message}))
        //   }else{
        //     setAlert(prevState => ({...prevState, open:true, status:'error', message:data.message}))
        //   }
        // })
        // .catch(err => {
        //   handleBackdropProgress(false)
        //   setAlert(prevState => ({...prevState, open:true, status:'error', message:err.message}))
        // })
      }

    // Logout user from system (Clearing LocalStorage)
    const logoutUser = () => {
        logout()
    }
    
  return (
    <>
        {/* {
            !admin.dataLoaded 
            ? 
            (<Box padding={8} display='flex' alignItems='center' justifyContent='center'><CircularProgress/></Box>)
            :
            admin.error!== null
            ?
            admin.error==='401'
            ?
            (<UnAuthorized/>)
            :
            (<ServerDown/>)
            : 
            ( */}
                <Box
                    paddingBottom={8}
                    sx={{
                        backgroundImage: { lg: `url(${profileBackground})` },
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right bottom",
                        backgroundSize: "600px 500px"
                    }}>
                    <PageHeader text={"My Account"} />

                    <Button sx={{marginX:{xs:3, sm:6, md:9}, marginY:{xs:1}}} variant="outlined" startIcon={<LogoutIcon/>} size="large" onClick={()=> setAlertForLogout(prevState => ({...prevState, open:true}))}>Logout</Button>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {
                            admin
                            ?
                                <Stack
                                spacing={2}
                                sx={{
                                    width: { md: "fit-content" },
                                    paddingX: { xs: 3, sm: 6, md: 9 },
                                }}
                                >
        
                                {/* Display Backdrop Progress and Alert Dialog */}
                                <BackdropProgress open={backdropProgress}/>
                                <AlertDialog open={alert.open} status={alert.status} message={alert.message} handleOnClick={()=> setAlert(prevState => ({...prevState, open:false}))}/>
                                
                                {/* Display Alert Dialog With Two Actions For Logout*/}
                                <AlertDialogWithTwoAction open={alertForLogout.open} status={alertForLogout.status} message={alertForLogout.message} handleOkClick={logoutUser} handleDiscardClick={()=> setAlertForLogout(prevState => ({...prevState, open:false}))}/>
        
                                <Typography variant="h6">Admin ID: </Typography>
                                <TextField
                                    variant="filled"
                                    size="medium"
                                    defaultValue={admin.id}
                                    hiddenLabel
                                    inputProps={{
                                    readOnly: true
                                    }}
                                    sx={{ width: { sm: 400 } }}
                                />
        
                                <Typography variant="h6">Admin Name: </Typography>
                                <TextField
                                    variant="filled"
                                    size="medium"
                                    hiddenLabel
                                    defaultValue={admin.admin_name}
                                    {...register("admin_name", {
                                    required: "Required Field",
                                    pattern: {
                                        value: /^[A-Za-z ]{1,}$/,
                                        message: "Please enter valid name",
                                    },
                                    })}
                                    error={!!errors?.admin_name}
                                    helperText={
                                    errors?.admin_name ? errors.admin_name.message : null
                                    }
                                    sx={{ width: { sm: 400 } }}
                                />
        
                                <Typography variant="h6">Admin Email: </Typography>
                                <TextField
                                    variant="filled"
                                    size="medium"
                                    hiddenLabel
                                    defaultValue={admin.admin_email}
                                    {...register("admin_email", {
                                    required: "Required Field",
                                    pattern: {
                                        value: /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,}[.]{1}[A-Za-z.]{2,6}$/,
                                        message: "Please enter valid email",
                                    },
                                    })}
                                    error={!!errors?.admin_email}
                                    helperText={
                                    errors?.admin_email ? errors.admin_email.message : null
                                    }
                                    sx={{ width: { sm: 400 } }}
                                />
        
                                {/* <Typography variant="h6">Admin Contact: </Typography>
                                <TextField
                                    id="standard-basic"
                                    variant="filled"
                                    size="medium"
                                    type="number"
                                    defaultValue={admin.data[0].AdminContact}
                                    hiddenLabel
                                    {...register("AdminContact", {
                                    required: "Required Field",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Please enter valid contact no",
                                    },
                                    })}
                                    error={!!errors?.AdminContact}
                                    helperText={
                                    errors?.AdminContact ? errors.AdminContact.message : null
                                    }
                                    sx={{ width: { sm: 400 } }}
                                />
        
                                <Typography variant="h6">Last Updated At:</Typography>
                                <TextField
                                    variant="filled"
                                    size="medium"
                                    hiddenLabel
                                    defaultValue={admin.data[0].UpdatedAt}
                                    InputProps={{
                                    readOnly: true,
                                    }}
                                    sx={{ width: { sm: 400 } }}
                                /> */}
        
                                <Button
                                    variant="contained"
                                    size="large"
                                    sx={{ width: { sm: 400 } }}
                                    type="submit"
                                >
                                    Save Details
                                </Button>
                                </Stack>
                            :
                            <Typography  sx={{marginX:{xs:3, sm:6, md:9}, marginTop:3}} variant='h5' fontFamily='PoppinsRegular' color='text.primary' bgcolor={colors.inActiveColor} width='fit-content' borderRadius={2} padding={0.5}>No record found!</Typography>
                        }
                    </form>
                </Box>
            {/* )
        } */}
    </>
  )
}
export default Account;