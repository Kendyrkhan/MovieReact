import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import React, { useState, useEffect, useContext } from "react";
//import UserContext from './UserContext.jsx';
import {useCookies} from 'react-cookie';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Profile() {
  //const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);
  const classes = useStyles();
  const [userData, setUserData] = useState([]);
  const [full_name, setFullName] = useState("");
  const [email , setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
    // useEffect(() => {
    //     test()
    // }, []);


  const handlePasswordChange = event =>{
      setPassword(event.target.value);
  }
  const handleRePasswordChange = event =>{
      setRePassword(event.target.value);
  }
  const handleOldPasswordChange = event =>{
      setOldPassword(event.target.value);
  }

  const handleFullNameChange = event =>{
      setFullName(event.target.value);
  }

  const handleSubmit = event =>{

      const inputData = {email, full_name};
     
      UpdateFullName(inputData);
     
      event.preventDefault();
  }

  const handleUpdatePasswordSubmit =event =>{
    const inputData = {email, full_name, password, oldPassword};
    if (password===rePassword){
        UpdatePassword(inputData);
    }else{
        alert("Password and RePassword doesnt equal");
    }
    event.preventDefault();
}



async function UpdatePassword(inputData){

  //const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;

  const response = await fetch("http://localhost:8000/api/updatePassword", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Authorization": bearer
    //   },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(inputData)
  });
  if(response.status==200){
      let res = await response.json();
      console.log(res);
      setUserData(res);
      setPassword("");
      setOldPassword("");
      setRePassword("");
  } 
}



  async function UpdateFullName(inputData){

    //const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
 

    const response = await fetch("http://localhost:8000/api/updateFullName", {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        // headers: {
        //   "Content-Type": "application/json",
        //   "Authorization": bearer
        // },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(inputData)
    });
    if(response.status==200){
        let res = await response.json();
        setUserData(res);
        setFullName(res['full_name']);
    } 
  }useEffect(() => {
  }, [full_name]);


//   async function test(){   
//     const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
//     const response = await fetch("http://localhost:8000/api/profile", {
//         method:'GET',
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": bearer
//         }
//     });
//     if(response.status==200){
//         let res = await response.json();
//         console.log(res);
//         setUserData(res);
//         console.log(res['full_name']);
//         setFullName(res['full_name']);
//         setEmail(res['email']);
//     }    
// }


  return (
    <Container style={{backgroundColor:'white'}} component="main" maxWidth="xs">
      <CssBaseline />



      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Update Profile Data
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
           
           

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
               
                name="email"
                autoComplete="email"
                value={userData['email']}
                readOnly
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="full_name"
                label="Full Name"
                name="full_name"
                autoComplete="fname"
                onChange={handleFullNameChange}
                value={full_name}
              />
            </Grid>


          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Profile
          </Button>
          
        </form>
      </div>



      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Update Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleUpdatePasswordSubmit}>
          <Grid container spacing={2}>
           
           

          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="oldPassword"
                label="Old Password"
                type="password"
                id="oldPassword"
                autoComplete="current-password"
                value={oldPassword} 
                onChange={handleOldPasswordChange} 

              />
            </Grid>




            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"

                value={password} 
                onChange={handlePasswordChange}

              />
            </Grid>



            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="rePassword"
                label="Re New Password"
                type="password"
                id="rePassword"
                autoComplete="current-password"
                value={rePassword}
                onChange={handleRePasswordChange}
              />
            </Grid>



          </Grid>


          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update Password
          </Button>
          
        </form>
      </div>


      
    </Container>
  );
}