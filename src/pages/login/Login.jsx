import React, {useEffect, useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import {db,logInWithEmailAndPassword,registerWithEmailAndPassword,sendPasswordReset,logout} from "../../db/firebase";

import { Box, Button, Stack, Grid, Typography, TextField, ToggleButtonGroup, ToggleButton, IconButton, InputAdornment} from '@mui/material'
import LoginBackground from '../../assets/images/loginBackground.png'
import { colors } from '../../values/Colors'
import { Controller, useForm } from 'react-hook-form'
import { BackdropProgress } from '../../components/backdropProgress/BackdropProgress'
import { AlertDialog } from '../../components/alertDialog/AlertDialog'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Login = ({setUser}) => {

    const navigate = useNavigate()
    // const ref=firebase.firestore().collection("user_profile");
    // console.log(ref);
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword)
    const handleMouseDownPassword = () => setShowPassword(!showPassword)

    // State for tracking Alert Dialog
    const [alert, setAlert] = useState({status:'success', open:false, message:''})

    // State for tracking Backdrop Progress
    const [backdropProgress, setBackdropProgress] = useState(false)

    // const [user, loading, error] = useAuthState(firebase.auth);

    // Method for changing Backdrop Progress status
    const handleBackdropProgress = (status) => {
        setBackdropProgress(status)
    }

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => { // detaching the listener
            if (user) {
                // ...your code to handle authenticated users. 
                navigate("/admin");
            } else {
                // No user is signed in...code to handle unauthenticated users. 
            }
        });
        return () => unsubscribe(); 
        // if (loading) {
        //   // maybe trigger a loading screen
        //   return;
        // }
        // if (user) 
      }, []);

    // State for handling form
    const {
        register,
        handleSubmit,
        formState: { errors },
        // control
    } = useForm()

    const onSubmit = async (e) => {
        logInWithEmailAndPassword ( e.Emailid, e.Password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigate("/admin")
            console.log(user);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }

  return (
    <Box height='100vh'>

        {/* Display Backdrop Progress and Alert Dialog */}
        <BackdropProgress open={backdropProgress}/>
        <AlertDialog open={alert.open} status={alert.status} message={alert.message} handleOnClick={()=> setAlert(prevState => ({...prevState, open:false}))}/>
                    

        <Grid container height='100%' padding={2}>
            <Grid xs={0} sm={0} md={6} item display='flex' alignItems='center' justifyContent='center' bgcolor={colors.primaryLightColor}>
                <Box sx={{display:{xs:'none', sm:'none', md:'block'}}} maxWidth='100%' component='img' src={LoginBackground}/>
            </Grid>
            <Grid xs={12} sm={12} md={6} item display='flex' paddingY={8} alignItems='center' justifyContent='center'>
                <Stack>
                    <Typography align='left' variant='h3' fontFamily='PoppinsLight'>Hie, Welcome back!</Typography>
                    <Typography align='left' paddingBottom={10}variant='h6' fontFamily='PoppinsLight' color='gray'>Enter your credentials below!</Typography>

                    <form onSubmit={handleSubmit(onSubmit)} variant="filled" sx={{ m: 1, minWidth: 120 }}>
                    <Stack paddingBottom={8} spacing={3} sx={{width:{md:'fit-content'}}}>

                        <Typography align='left' variant="h6">Email ID: </Typography>
                        <TextField
                            id="Emailid"
                            variant="filled"
                            size="medium"
                            hiddenLabel
                            {...register("Emailid", {
                            required: "Email ID is required!"
                            })}
                            error={!!errors?.Emailid}
                            helperText={
                            errors?.Emailid ? errors.Emailid.message : null
                            }
                            sx={{ width: { sm: 400 } }}
                        />

                        <Typography align='left' variant="h6">Password: </Typography>
                        <TextField
                            id="Password"
                            variant="filled"
                            size="medium"
                            hiddenLabel
                            type={showPassword ? "text" : "password"}
                            InputProps={{ // <-- This is where the toggle button is added.
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                                )
                            }}
                            {...register("Password", {
                            required: "Password is required!"
                            })}
                            error={!!errors?.Password}
                            helperText={
                            errors?.Password ? errors.Password.message : null
                            }
                            sx={{ width: { sm: 400 } }}
                        />

                        <Button type='submit' variant='contained' size="large" sx={{width: { sm: 400}}}>Login Now</Button>

                        {/* <Link to='/forgotPassword' style={{ textDecoration: 'none'}}><Typography fontFamily='PoppinsSemiBold' color={colors.textColor} bgcolor={colors.secondaryColor} borderRadius={2} width='fit-content' marginLeft='auto' padding={1}>Forgot Password?</Typography></Link> */}
                    </Stack>
                    </form>
                </Stack>
            </Grid>
        </Grid>
        
    </Box>
  )
}
