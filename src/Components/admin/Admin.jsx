import React from "react"; 

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import  { useContext } from "react"; 

import AdminHome from './AdminHome';

import AdminFooter from './AdminFooter';
import AdminHeader from './AdminHeader';

import AdminProfile from './AdminProfile';

import AdminLogin from './AdminLogin';

import ManageUsers from './ManageUsers';

import ManageMovies from './ManageMovies';
import ManageGenres from "./ManageGenres";
import ManageActors from "./ManageActors";



function Admin(){



    
    return(
        <>
      
            <AdminHeader  />
         
                <Switch>
                    <div >
                        <Route  path="/adminMain/home">
                            <div style={{backgroundColor:'white',minHeight:'590px'}}>          
                                <AdminHome/>
                            </div>
                        </Route>

                        <Route  path="/adminMain/adminProfile">
                            <div style={{backgroundColor:'white'}}>
                                <AdminProfile/>
                            </div>
                        </Route>

                        <Route  path="/adminMain/manageUsers">
                            <div style={{backgroundColor:'white'}}>
                                <ManageUsers/>
                            </div>
                        </Route>

                        <Route  path="/adminMain/manageMovies">
                            <div style={{backgroundColor:'white'}}>
                                <ManageMovies/>
                            </div>
                        </Route>

                        
                        <Route  path="/adminMain/manageGenres">
                            <div style={{backgroundColor:'white'}}>
                                <ManageGenres/>
                            </div>
                        </Route>

                        <Route  path="/adminMain/manageActors">
                            <div style={{backgroundColor:'white'}}>
                                <ManageActors/>
                            </div>
                        </Route>

                        <Route  path="/adminMain/login">
                            <div style={{backgroundColor:'white'}}>
                                <AdminLogin/>
                            </div>
                        </Route>


                    </div>
                </Switch>
            <AdminFooter/>
     
        </>
    );
}


export default Admin;