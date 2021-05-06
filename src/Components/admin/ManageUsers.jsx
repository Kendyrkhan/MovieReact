import { Carousel,Card ,Button,Figure,Image,ListGroup,Modal,Form} from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';

import { useHistory } from "react-router-dom";

export default function ManageUsers(){

    const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
    const reload=()=>window.location.reload();
    const [showAdd, setShowAdd] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        console.log("modal")
        setShowAdd(true);
    }
    const [id, setId] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [full_name, setFullName] = useState("");
    const history = useHistory(); 
    const [data, setData] = useState(null);


    const handleFullNameChange = event =>{
        setFullName(event.target.value);
    }
    const handlePasswordChange = event =>{
        setPassword(event.target.value);
    }

    const oneUserEdit = row =>{
        console.log("Edit")
        setShow(true);
        setId(row.id);
        setEmail(row.email);
        setFullName(row.full_name);
        setPassword(row.password);
      
     }



   const oneUser = row =>{

      let id = row.id;
      let email = row.email;
      let full_name=row.full_name;
      let password=row.password;
      let roles = row.roles
      const inputData = {id,email,full_name,password,roles}
      deleteUser(inputData);
      reload();
   }

   async function deleteUser(data){
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    const response = await fetch("http://localhost:8000/api/deleteUser", {
    method: "DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
    })
    
}


const handleSubmitEdit = event =>{
    console.log("sds");
    const inputData = {id,email,full_name,password};
    saveCard(inputData);
    reload();
    event.preventDefault();


}



async function saveCard(data){
    console.log("asdd");
    const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
    const response = await fetch("http://localhost:8000/api/saveUser/"+id, {
    method: "PUT",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
        "Content-Type": "application/json",
        Authorization: bearer,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data)
    });
    }


   

    const handleEmailChange = event =>{
        setEmail(event.target.value);
    }
    
    const handleSubmitAddUser = event =>{

        const inputData = {email, password, full_name};
        console.log(full_name)
        register(inputData);
        history.push("/adminMain/manageUsers");
        event.preventDefault();
    }



    async function register(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        console.log(JSON.stringify(data));
        const response = await fetch("http://localhost:8000/api/registration", {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
              Authorization: bearer,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(data)
          });
    
        if(response.status==200){
            let jwt = await response.json();
            reload();
        }
      }


      async function loadData(){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        let response =await fetch("http://localhost:8000/api/allUsers",{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
        },
    });
        if(response.status==200){
        let tableData = await response.json();
        setData(tableData);
      
        }
    }
    useEffect(()=>{
      loadData();
      }, [id] );

    return(      <>
        
        <div class="row mt-3 ml-3">

            <div class="col-2 mt-5">
                <div class="list-group" id="list-tab" role="tablist">
                <a class="list-group-item list-group-item" id="list-home-list" data-toggle="list" href="/adminMain/admin" role="tab" style ={{backgroundColor:"#17A2B8",color:'white',fontWeight:'bold'}} aria-controls="home" >Admin Dashboard</a>
                <a class="list-group-item list-group-item-action"  href ="/adminMain/manageUsers" role="tab" aria-controls="profile"><i class="fas fa-shopping-cart" style={{color: "#17A2B8"}}></i> <span class="ml-1" >Manage Users</span></a>
                <a class="list-group-item list-group-item-action"  href ="/adminMain/manageMovies" role="tab" aria-controls="profile"><i class="fas fa-shopping-cart" style={{color: "#17A2B8"}}></i> <span class="ml-1" >Manage Movies</span></a>
                <a class="list-group-item list-group-item-action"  href ="/adminMain/manageGenres" role="tab" aria-controls="profile"><i class="fas fa-shopping-cart" style={{color: "#17A2B8"}}></i> <span class="ml-1" >Manage Genres</span></a>
                <a class="list-group-item list-group-item-action"  href ="/adminMain/manageActors" role="tab" aria-controls="profile"><i class="fas fa-shopping-cart" style={{color: "#17A2B8"}}></i> <span class="ml-1" >Manage Actors</span></a>
                <a class="list-group-item list-group-item-action"  href ="/adminMain/manageComments" role="tab" aria-controls="profile"><i class="fas fa-shopping-cart" style={{color: "#17A2B8"}}></i> <span class="ml-1" >Manage Comments</span></a>
              
                </div>
            </div>
   

            <div class="mr-5 col-9" style={{minHeight: "600px"}} >
       
            <div class="row mt-1">
                <div class="col-12 ">

                    <button type="button" class="btn btn-sm btn-info mt-2" data-toggle="modal"
                            data-target="#addItemsModal" onClick={handleShowAdd} >Add User

                    </button>

                    
                    

                    <table class="table table-striped mt-3">
                        
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>FullName</th>
                            <th>Role </th>
                            <th></th>
                            <th></th>

                        </tr>
                        </thead>
                        {data?.map((row) => (
                        <tbody>
                     
                            <td >{row.id}</td>
                            <td >{row.email}</td>
                            <td >{row.full_name} </td>
                           
                            <td>
                            {row.roles?.map((roled) => (roled.role))}  
                            </td>
                            
                            <td> <a class="btn btn-success btn-sm" onClick={()=>{oneUserEdit(row)}} ><span  >Edit</span></a></td>


                            <td>
                                <button type="button" class="btn-sm btn-danger" data-toggle="modal" data-target="#deleteItemModal"  onClick={()=>{oneUser(row)}} >
            
              
                            
                                    <span >Delete</span>
                                </button>
                            </td>
   
                       
                        </tbody>
                        ))}
                    
  

                    </table>

                </div>

            </div>
            </div>
        </div>
        <Modal show={showAdd} onHide={handleCloseAdd}>

            <Modal.Header closeButton>
                <Modal.Title>Adding User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmitAddUser} >

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Full Name</label>
                        <input type="text" className="form-control" name="full_name" id="exampleInputEmail1" onChange={handleFullNameChange} required aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="text" className="form-control" name="email" id="exampleInputEmail1" onChange={handleEmailChange} required aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Password</label>
                        <input type="password" className="form-control" name="password" id="exampleInputEmail1" onChange={handlePasswordChange} required aria-describedby="emailHelp"/>
                    </div>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleCloseAdd}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseAdd} type="submit">Add User</Button>

                    </Modal.Footer>
                    
                </form>

            </Modal.Body>



        </Modal>

        <Modal show={show} onHide={handleClose}>

        <Modal.Header closeButton>
            <Modal.Title>Update User</Modal.Title>
        </Modal.Header>


        <Modal.Body>
        <form onSubmit={handleSubmitEdit} >

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">FullName</label>
                <input type="text" className="form-control" name="full_name" id="exampleInputEmail1" value={full_name} onChange={handleFullNameChange} required aria-describedby="emailHelp"/>
            </div>

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Email</label>
                <input type="text" className="form-control" name="email" id="exampleInputEmail1" value={email} onChange={handleEmailChange} required aria-describedby="emailHelp"/>
            </div>

            <Modal.Footer>

                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose} type="submit">Update User</Button>

            </Modal.Footer>
            
        </form>

        </Modal.Body>

    </Modal>





   </> );
}


