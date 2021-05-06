import React from "react"; 
import './bootstrap-4.6.0-dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,Redirect
} from "react-router-dom";

import  { useContext } from "react"; 

import UserProvider from './Components/UserProvider';

import Admin from './Components/admin/Admin';
import Main from './Components/Main';



function App() {

  return (
 <>



      <UserProvider>
        <Router>
          <Switch>
        
            <Route  path="/adminMain">
                <Admin/>
            </Route>

            <Route  path="/main">
                <Main/>
            </Route>
            <Route exact path="/">
              <Redirect to="/main/home" />
            </Route>
            
          </Switch>
        </Router>
      </UserProvider>

    </>
  );
}

export default App;
