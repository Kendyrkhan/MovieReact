import React from "react"; 
import '../bootstrap-4.6.0-dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import  { useContext } from "react"; 

import Home from './Home';

import Header from './Header';
import Footer from './Footer';
import Navbar from './Navbar';

import Register from './Register';

import Login from './Login';

import Profile from './Profile';

import Details from './Details';


function Main(){
  
    return(
        <>
       
            <Header  />
            <Navbar />
                <Switch>
                    <div >
                        <Route  path="/main/home">  
                            <Home  />
                        </Route>

                        <Route  path="/main/register">
                            <Register/>
                        </Route>

                        <Route path="/main/signIn">
                            <Login   />
                        </Route>

                        <Route path="/main/profile">
                            <Profile/>
                        </Route>
                        
                        <Route exact path="/main/details/:movieID">
                            <Details/>
                        </Route> 
                    </div>
                </Switch>
            <Footer/>
    


        </>
    );
}


export default Main;