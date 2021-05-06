
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
import UserContext from '../Components/UserContext';
import React, { useState, useEffect, useContext} from 'react';
import {useCookies} from 'react-cookie';
import { useHistory } from "react-router-dom";
import { HistoryRounded } from '@material-ui/icons';

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

export default function Login() {

  const history = useHistory(); 
  const [cookieJWT, setCookieJWT, removeCookieJWT] = useCookies(['jwt']);

  const user = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = event =>{
      setEmail(event.target.value);
  }

  const handlePasswordChange = event =>{
      setPassword(event.target.value);
  }

  const handleSubmit = event =>{
      const inputData = {email, password};
      console.log("submit");
      console.log("submit");
      console.log("submit");
      auth(inputData);
      
      event.preventDefault();
  }
  async function auth(data){  

    const response = await fetch("http://localhost:8000/api/auth", {      
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(data)
      });
      
    if(response.status==200){
        console.log("200")
        console.log("200")
        console.log("200")
        console.log("200")
        console.log("200")
        console.log("200")
        console.log("200")
        let jwt = await response.json();
        setCookieJWT('jwt', jwt);
     
        if(email==="admin"){
          history.push("/adminMain/manageUsers");
        }
        else{
        history.push("/main/home");
        }
    }
    else{
      console.log("else");
      console.log("else");
      console.log("else");
      console.log("else");
      console.log("else");
      console.log("else");
      console.log("else");
      console.log("else");
    }
    
}
const classes = useStyles();

  return (
    <Container style={{backgroundColor:'white'}} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <form className={classes.form} noValidate onSubmit = {handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value = {email} 
                onChange = {handleEmailChange}
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
                value = {password} 
                onChange = {handlePasswordChange}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Remember Me"
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
            Login
          </Button>
          
        </form>
      </div>
      
    </Container>
  );
}