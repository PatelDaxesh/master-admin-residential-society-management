import { query, collection, getDocs, where } from "firebase/firestore";
import { auth, db, logout } from "../../../db/firebase";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { cardColors, colors } from "../../../values/Colors";
import {
  Box,
  Stack,
  Grid,
  Typography,
  List,
  ListItem,
  Avatar,
  Card,
  Divider,
  ListItemButton,
} from "@mui/material";
import { PageHeader } from "../../../components/pageHeader/PageHeader";

const SocietyInformations = () => {
  const location = useLocation();
  const society = location.state.society;
  const [name, setName] = useState("");
  // const [uid, setuid] = useState("");
  const [totalsociety, settotalsociety] = useState(0);
  // const [societyData,setSocietyData]=({societyname:"",societyaddress:"",gsName:"",totalBlock:"",totalHouse:""})
  const navigate = useNavigate();
  const [society_data, setsociety_data] = useState([]);
  const [data, setdata] = useState([]);
  const [tenantdata, settenantdata] = useState([]);
  const [totalhouse, settotalhouse] = useState();
  const [OwnerCount, setOwnerCount] = useState(0);
  const [TenantCount, setTenantCount] = useState(0);
  const [OwnerHouse, setOwnerHouse] = useState([]);
  const [TenantHouse, setTenantHouse] = useState([]);

  var block_number = [];
  var house_number = [];
  var owner_name = [];
  var phone_number = [];
  // var OwnerCount=0;
  // var TenantCount=0;
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
  const Fetchdata2 = async (society) => {
    var owner = 0;
    var tenant = 0;
    var count=0;
    console.log("hdjdgg");
    // const database=firebase.firestore();
    const doc_ref = await getDocs(collection(db, "societies_name"));
    const docs = doc_ref.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // setsociety_data(docs);
    db.collection("user_profile")
      .where("society_name", "==", society.society_name)
      .where("society_address", "==", society.society_address).where("house_status","==","Owner")
      .get()
      .then((snapshot) => {
        console.log(snapshot.size);

        if (snapshot.size != 0) {
          console.log(snapshot.docs);
          const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setdata(data);
          block_number = [];
          house_number = [];
          owner_name = [];
          phone_number = [];

          data.forEach((element) => {
            // console.log(element)
            // console.log(element['block_number']);
            // block_number.push(element['block_number']);
            // house_number.push(element['house_number']);
            // console.log(block_number);
            // console.log(house_number);
            // console.log(block_number.indexOf(element['block_number']) > -1);
            if (
              block_number.indexOf(element["block_number"]) > -1 &&
              house_number.indexOf(element["house_number"]) > -1
            ) {
            } else {
              block_number.push(element["block_number"]);
              house_number.push(element["house_number"]);
              // owner_name.push(element["user_name"]);
              // phone_number.push(element["phone_number"]);
              // db.collection("user_profile")
              //   .where("block_number", "==", element["block_number"])
              //   .where("house_number", "==", element["house_number"])
              //   .get()
              //   .then((snapshots) => {
              //     if (snapshots.size != 0) {
              //       var datt = snapshots.docs[0].data;
              //       console.log(datt["house_status"]);

              //       const data2 = snapshots.docs.map((doc) => ({
              //         id: doc.id,
              //         ...doc.data(),
              //       }));
              //       const dataa = data2[0];
              //       console.log(dataa);
              //       console.log("sdd", dataa["house_status"]);

              //       if (dataa["house_status"] == "Owner") {
              //         owner++;
              //         console.log("Owner is", owner);
              //       }
              //       if (dataa["house_status"] == "Tenant") {
              //         tenant++;
              //         console.log("Tenant is", tenant);
              //       }
              //     }
              //   });
              // console.log("owner", owner);
              // console.log("tenant", tenant);
            }
          });
          console.log("block number length is ",block_number.length);
          settotalhouse(block_number.length);
          count=block_number.length;
          console.log("length is",block_number.length);
          console.log(house_number.length);
          settotalhouse(block_number.length);
          console.log("acxxxxxxxxxxxxxxzzzddddddddddzzz");
          console.log("xcx",count.length);
          for(var i=0;i<block_number.length;i++){
            console.log("xcx",block_number[i]);
            console.log("dfd",house_number[i]);
            db.collection("user_profile").where("society_name","==",society.society_name).where("society_address","==",society.society_address).where("block_number","==",block_number[i]).where("house_number","==",house_number[i]).where("house_status","==","Owner").get().then((snapshot)=>{
             var ownerdata= snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setsociety_data(...society_data, ownerdata);
              // setsociety_data(ownerdata);
              console.log(ownerdata);
              setOwnerHouse(ownerdata);
              
              console.log(society_data);
            });
            db.collection("user_profile").where("society_name","==",society.society_name).where("society_address","==",society.society_address).where("block_number","==",block_number[i]).where("house_number","==",house_number[i]).where("house_status","==","Tenant").get().then((snapshot)=>{
              var tenantdata=snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }));
              setTenantHouse(tenantdata);
              setsociety_data(...society_data, tenantdata);
            });
          }
          // fore(var i  in data){
          //   console.log(i)
          //   console.log(i[i]);
          // }
          console.log(data);
          console.log("AA",OwnerHouse);
          console.log("BB",TenantHouse);
          // setsociety_data(OwnerHouse.concat(TenantHouse))
          console.log(society_data);
          // for(var i in snapshot.data.docs){
          //   console.log("df",i);
          //   console.log("dkjkjdkjkajakjksjksdjjd");
          // }
        }
      });
    //   setOwnerCount(owner);
    // setTenantCount(tenant);
    // console.log(OwnerCount);
    // console.log(TenantCount);
   
   
  };
  const Fetchdata3 = async (society) => {
    var owner = 0;
    var tenant = 0;
    var count=0;
    console.log("hdjdgg");
    // const database=firebase.firestore();
    const doc_ref = await getDocs(collection(db, "societies_name"));
    const docs = doc_ref.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // setsociety_data(docs);
    db.collection("user_profile")
      .where("society_name", "==", society.society_name)
      .where("society_address", "==", society.society_address).where("house_status","==","Tenant")
      .get()
      .then((snapshot) => {
        console.log(snapshot.size);

        if (snapshot.size != 0) {
          console.log(snapshot.docs);
          const tenantdata = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          settenantdata(tenantdata);
          // var count1=tenantdata.length
          // var count2=totalhouse;
          // var count3=count1+count2;
          // settotalhouse(totalhouse+tenantdata.length);
          console.log(totalhouse);
        }
      });
    }
  const handleListItemClick = (attendance) => {
    console.log(attendance);
  };
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // detaching the listener
      if (user) {
        console.log(user.uid);
        fetchUserName(user.uid);
        Fetchdata2(society);
        Fetchdata3(society);
        console.log("tenat data length is ",tenantdata.length);
        // society_data.push(block_number);
        // society_data.push(house_number);
        // society_data.push(owner_name);
        // society_data.push(phone_number);
        // console.log("society data is",society_data)
      } else {
        // No user is signed in...code to handle unauthenticated users.
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <>
      <PageHeader text={"Society Details"} />

      <Card
        elevation={8}
        sx={{ borderRadius: 4, marginX: { xs: 3, sm: 6, md: 9 } }}
      >
        <Stack padding={2} spacing={1}>
          <Typography
            variant="h6"
            fontFamily="PoppinsRegular"
            color="text.secondary"
          >
            Society Name:
          </Typography>
          <Typography
            variant="h5"
            fontFamily="PoppinsSemiBold"
            color="text.primary"
            paddingX={1}
            paddingY={0.5}
            borderRadius={2}
            bgcolor={colors.secondaryColor}
            width="fit-content"
          >
            {society.society_name}
          </Typography>

          <Typography
            variant="h6"
            fontFamily="PoppinsRegular"
            color="text.secondary"
          >
            Society Address:
          </Typography>
          <Typography
            variant="h5"
            fontFamily="PoppinsSemiBold"
            color="text.primary"
            paddingX={1}
            paddingY={0.5}
            borderRadius={2}
            bgcolor={colors.secondaryColor}
            width="fit-content"
          >
            {society.society_address}
          </Typography>

          <Typography
            variant="h6"
            fontFamily="PoppinsRegular"
            color="text.secondary"
          >
            General Secretory Name:
          </Typography>
          <Typography
            variant="h5"
            fontFamily="PoppinsSemiBold"
            color="text.primary"
            paddingX={1}
            paddingY={0.5}
            borderRadius={2}
            bgcolor={colors.secondaryColor}
            width="fit-content"
          >
            {society.gs}
          </Typography>

          <Typography
            variant="h6"
            fontFamily="PoppinsRegular"
            color="text.secondary"
          >
            Total Owner House:
          </Typography>
          <Typography
            variant="h5"
            fontFamily="PoppinsSemiBold"
            color="text.primary"
            paddingX={1}
            paddingY={0.5}
            borderRadius={2}
            bgcolor={colors.activeColor}
            width="fit-content"
          >
            {totalhouse}
          </Typography>
          <Typography
            variant="h6"
            fontFamily="PoppinsRegular"
            color="text.secondary"
          >
            Total Tenant House:
          </Typography>
          <Typography
            variant="h5"
            fontFamily="PoppinsSemiBold"
            color="text.primary"
            paddingX={1}
            paddingY={0.5}
            borderRadius={2}
            bgcolor={colors.activeColor}
            width="fit-content"
          >
            {tenantdata.length}
          </Typography>
          <Typography
            variant="h6"
            fontFamily="PoppinsRegular"
            color="text.secondary"
          >
            Total House:
          </Typography>
          <Typography
            variant="h5"
            fontFamily="PoppinsSemiBold"
            color="text.primary"
            paddingX={1}
            paddingY={0.5}
            borderRadius={2}
            bgcolor={colors.inActiveColor}
            width="fit-content"
          >
            {totalhouse + tenantdata.length}
          </Typography>
          {/* 
      <Typography variant='h6' fontFamily='PoppinsRegular' color='text.secondary'>Total Owner House:</Typography>
      <Typography variant='h5' fontFamily='PoppinsSemiBold' color='text.primary' paddingX={1} paddingY={0.5} borderRadius={2} bgcolor={colors.activeColor} width='fit-content'>{OwnerCount}</Typography>
      
      <Typography variant='h6' fontFamily='PoppinsRegular' color='text.secondary'>Total Tenant House:</Typography>
      <Typography variant='h5' fontFamily='PoppinsSemiBold' color='text.primary' paddingX={1} paddingY={0.5} borderRadius={2} bgcolor={colors.activeColor} width='fit-content'>{TenantCount}</Typography> */}
        </Stack>
      </Card>

      <Card
        elevation={8}
        sx={{
          borderRadius: 4,
          marginX: { xs: 3, sm: 6, md: 9 },
          marginTop: 3,
          padding: 1,
        }}
      >
        <List>
          <ListItem sx={{ paddingY: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs>
                <Typography
                  variant="h6"
                  fontFamily="PoppinsSemiBold"
                  width="fit-content"
                  padding={1}
                  border={2}
                  borderRadius={2}
                  borderColor={colors.secondaryColor}
                >
                  Block Number
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="h6"
                  fontFamily="PoppinsSemiBold"
                  width="fit-content"
                  padding={1}
                  border={2}
                  borderRadius={2}
                  borderColor={colors.secondaryColor}
                >
                  House Number
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="h6"
                  fontFamily="PoppinsSemiBold"
                  width="fit-content"
                  padding={1}
                  border={2}
                  borderRadius={2}
                  borderColor={colors.secondaryColor}
                >House Status
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="h6"
                  fontFamily="PoppinsSemiBold"
                  width="fit-content"
                  padding={1}
                  border={2}
                  borderRadius={2}
                  borderColor={colors.secondaryColor}
                >
                 Owner Name
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="h6"
                  fontFamily="PoppinsSemiBold"
                  width="fit-content"
                  padding={1}
                  border={2}
                  borderRadius={2}
                  borderColor={colors.secondaryColor}
                >
         Phone Number
                </Typography>
              </Grid>
            </Grid>
          </ListItem>
          <Divider variant="fullWidth" />
          {data && tenantdata ? (
            data.map((attend, index) => {
              return (
                <ListItemButton
                  onClick={() => handleListItemClick(attend)}
                  sx={{ paddingY: 2 }}
                  key={attend.id}
                >
                  <Grid container spacing={2} alignItems="center">
                    {/* <Grid item xs={6}>
                      <Stack
                        direction="row"
                        spacing={1}
                        display="flex"
                        alignItems="center"
                      >
                        <Typography variant="h6">{attend.id}</Typography>
                      </Stack>
                    </Grid> */}

                    <Grid item xs={2.4}>
                      <Typography
                        variant="h6"
                        padding={1}
                        textAlign="center"
                        width="auto"
                        fontFamily="PoppinsSemiBold"
                        maxWidth={150}
                        borderRadius={2}
                        backgroundColor={
                            colors.activeColor
                        }
                      >
                        {attend.block_number}
                      </Typography>
                    </Grid>

                    <Grid item xs={2.4}>
                      <Typography
                        variant="h6"
                        padding={1}
                        textAlign="center"
                        width="auto"
                        fontFamily="PoppinsSemiBold"
                        maxWidth={150}
                        borderRadius={2}
                        backgroundColor={
                          colors.activeColor
                        }
                      >
                        {attend.house_number}
                      </Typography>
                    </Grid>
                    <Grid item xs={2.4}>
                      <Typography
                        variant="h6"
                        padding={1}
                        textAlign="center"
                        width="auto"
                        fontFamily="PoppinsSemiBold"
                        maxWidth={150}
                        borderRadius={2}
                        backgroundColor={
                            colors.activeColor
                        }
                      >
                        {attend.house_status}
                      </Typography>
                    </Grid>

                    <Grid item xs={2.4}>
                      <Typography
                        variant="h6"
                        padding={1}
                        textAlign="center"
                        width="auto"
                        fontFamily="PoppinsSemiBold"
                        maxWidth={150}
                        borderRadius={2}
                        backgroundColor={
                          colors.activeColor
                        }
                      >
                        {attend.user_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={2.4}>
                      <Typography
                        variant="h6"
                        padding={1}
                        textAlign="center"
                        width="auto"
                        fontFamily="PoppinsSemiBold"
                        maxWidth={150}
                        borderRadius={2}
                        backgroundColor={
                          colors.activeColor
                        }
                      >
                        {attend.phone_number}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItemButton>
              );
            })
          ) : (
            <Typography
              variant="h5"
              fontFamily="PoppinsRegular"
              color="text.primary"
              bgcolor={colors.inActiveColor}
              width="fit-content"
              borderRadius={2}
              padding={0.5}
              margin={1}
            >
              No record found!
            </Typography>
          )}
          {
            tenantdata.map((attend, index) => {
              return (
                <ListItemButton
                  onClick={() => handleListItemClick(attend)}
                  sx={{ paddingY: 2 }}
                  key={attend.id}
                >
                  <Grid container spacing={2} alignItems="center">
                    {/* <Grid item xs={6}>
                      <Stack
                        direction="row"
                        spacing={1}
                        display="flex"
                        alignItems="center"
                      >
                        <Typography variant="h6">{attend.id}</Typography>
                      </Stack>
                    </Grid> */}

                    <Grid item xs={2.4}>
                      <Typography
                        variant="h6"
                        padding={1}
                        textAlign="center"
                        width="auto"
                        fontFamily="PoppinsSemiBold"
                        maxWidth={150}
                        borderRadius={2}
                        backgroundColor={
                            colors.activeColor
                        }
                      >
                        {attend.block_number}
                      </Typography>
                    </Grid>

                    <Grid item xs={2.4}>
                      <Typography
                        variant="h6"
                        padding={1}
                        textAlign="center"
                        width="auto"
                        fontFamily="PoppinsSemiBold"
                        maxWidth={150}
                        borderRadius={2}
                        backgroundColor={
                          colors.activeColor
                        }
                      >
                        {attend.house_number}
                      </Typography>
                    </Grid>
                    <Grid item xs={2.4}>
                      <Typography
                        variant="h6"
                        padding={1}
                        textAlign="center"
                        width="auto"
                        fontFamily="PoppinsSemiBold"
                        maxWidth={150}
                        borderRadius={2}
                        backgroundColor={
                            colors.activeColor
                        }
                      >
                        {attend.house_status}
                      </Typography>
                    </Grid>

                    <Grid item xs={2.4}>
                      <Typography
                        variant="h6"
                        padding={1}
                        textAlign="center"
                        width="auto"
                        fontFamily="PoppinsSemiBold"
                        maxWidth={150}
                        borderRadius={2}
                        backgroundColor={
                          colors.activeColor
                        }
                      >
                        {attend.user_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={2.4}>
                      <Typography
                        variant="h6"
                        padding={1}
                        textAlign="center"
                        width="auto"
                        fontFamily="PoppinsSemiBold"
                        maxWidth={150}
                        borderRadius={2}
                        backgroundColor={
                          colors.activeColor
                        }
                      >
                        {attend.phone_number}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItemButton>
              );
            })
          }
        </List>
      </Card>
    </>
  );
};

export default SocietyInformations;
