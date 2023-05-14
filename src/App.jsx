import './App.css';
import { Login } from './pages/login/Login';
import { createTheme, ThemeProvider } from "@mui/material"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { colors } from './values/Colors';
import { query, collection, getDocs, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {auth, db, logout} from './db/firebase';
import useToken from './db/useToken'
import { LoginLayout } from './pages/login/LoginLayout';
import Dashboard from './pages/admin/dashboard/Dashboard';
import { AdminLayout } from './pages/admin/AdminLayout';
import Society from './pages/admin/society/Society';
import Residents from './pages/admin/residents/Residents';
import Houses from './pages/admin/houses/Houses';
import Account from './pages/admin/account/Account';
import SubDashboard from './pages/admin/dashboard/SubDashboard';
import AcceptRequests from './pages/admin/acceptrequests/AcceptRequests';
import SocietyInformations from './pages/admin/dashboard/SocietyInformations';
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const theme = createTheme({
  palette:{
    primary: {
      main: colors.primaryColor,
      light: colors.primaryLightColor
    },
    secondary: {
      main: colors.secondaryColor
    },
    background: {
      paper: colors.backgroundColor,
      default: colors.backgroundColor
    },
    error:{
      main: colors.errorColor
    },
    active:{
      main: colors.activeColor
    },
    inactive:{
      main: colors.inActiveColor
    }
  },
  typography:{
    allVariants:{
      fontFamily: 'PoppinsRegular',
      fontWeightLight: 400,
      fontWeightRegular: 600,
      fontWeightBold: 900
    }
  }
});

const App = () => {
  // const [user, setUser] = useState("");
  // const [userId, setUserId] = useState("");
  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "admin"), where("id", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setUserId(auth.currentUser.id);
  //     setUser(data.admin_name);
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // };
  // useEffect(() => {
  //   fetchUserName();
  //   // dashboarddata();
  // }, []);
  const { user, setUser } = useToken()
  // console.log(user)
  return (
    <ThemeProvider theme={theme}>
    

    <BrowserRouter>
      <Routes>

        <Route element={<LoginLayout user={user}/>}>
          <Route path='/'>
            <Route index element={<Login setUser={setUser}/>} />
            {/* <Route path='forgotPassword' element={<ForgotPassword />} /> */}
          </Route>
        </Route>

        <Route element={<AdminLayout user={user}/>}>
          <Route path='/admin'>
            <Route index element={<Dashboard/>} />
            <Route path='subdashboard' element={<SubDashboard/>} />
            <Route path='subdashboard/societyinformations' element={<SocietyInformations/>} />
            <Route path='society' element={<Society/>} />
            {/* <Route path='society' element={<Society/>} /> */}
            {/* <Route path='courses/new' element={<AddCourse/>} />
            <Route path='courses/:id/update' element={<UpdateCourse/>} /> */}
            <Route path='acceptrequests' element={<AcceptRequests/>} />

            {/* <Route path='houses' element={<Houses/>} /> */}
            {/* <Route path='programmes/new' element={<AddProgramme/>} />
            <Route path='programmes/:id/update' element={<UpdateProgramme/>} /> */}

            {/* <Route path='residents' element={<Residents/>} /> */}
            {/* <Route path='departments/new' element={<AddDepartment/>} />
            <Route path='departments/:id/update' element={<UpdateDepartment/>} /> */}
            <Route path='account' element={<Account />} />
          </Route>
        </Route>
        </Routes>
        </BrowserRouter>

      {/* <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router> */}
        </ThemeProvider>
  );
}

export default App;
