import { Carousel,Card ,Button,Figure,Image,ListGroup,Modal,Form} from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';

import { useHistory } from "react-router-dom";

export default function ManageGenres(){
    const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
    const reload=()=>window.location.reload();
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const handleClose = () => setShowEdit(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => {
        console.log("modal")
        setShowAdd(true);
    }
    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const history = useHistory(); 
    const [data, setData] = useState(null);


    const handleNameChange = event =>{
        setName(event.target.value);
    }
    
    const handleSubmitAddGenre = event =>{

        const inputData = {name};
        console.log(name)
        addGenre(inputData);
        history.push("/adminMain/home");
        history.push("/adminMain/manageGenres");
        loadData();
        event.preventDefault();
    }


    const oneGenreEdit = row =>{
        console.log("Edit")
        setShowEdit(true);
        setId(row.id);
        setName(row.name);
      
      
     }

     const oneGenreDelete = row =>{

        let id = row.id;
        let name = row.name;
        const inputData = {id,name}
        deleteGenre(inputData);
        reload();
     }

     async function deleteGenre(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/deleteGenre", {
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

    async function addGenre(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        console.log(JSON.stringify(data));
        const response = await fetch("http://localhost:8000/api/addGenre", {
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

      const handleSubmitEdit = event =>{
        console.log("sds");
        const inputData = {id,name};
        saveGenre(inputData);
        reload();
        event.preventDefault();
    
    
    }
    
    
    
    async function saveGenre(data){
        console.log("asdd");
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/saveGenre/"+id, {
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
    



    async function loadData(){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        let response =await fetch("http://localhost:8000/api/allGenres",{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
        },
    });
        let tableData = await response.json();
        setData(tableData);
    }useEffect(()=>{
      loadData();
      }, [id] );


    return(<>
    
    
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
                            data-target="#addItemsModal" onClick={handleShowAdd} >Add Genre

                    </button>

                    
                   

                    <table class="table table-striped mt-3">
                        
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th></th>
                            <th></th>

                        </tr>
                        </thead>
                        {data?.map((row) => (
                        <tbody>
                     
                            <td >{row.id}</td>
                            <td >{row.name}</td>
                            
                            
                            <td> <a class="btn btn-success btn-sm" onClick={()=>{oneGenreEdit(row)}} ><span  >Edit</span></a></td>
                            <td>
                                <button type="button" class="btn-sm btn-danger" data-toggle="modal" data-target="#deleteItemModal"  onClick={()=>{oneGenreDelete(row)}} >
            
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
                <Modal.Title>Adding Genre</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmitAddGenre} >

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control" name="full_name" id="exampleInputEmail1" onChange={handleNameChange} required aria-describedby="emailHelp"/>
                    </div>

                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleCloseAdd}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseAdd} type="submit">Add Genre</Button>

                    </Modal.Footer>
                    
                </form>

            </Modal.Body>
        </Modal>

        <Modal show={showEdit} onHide={handleClose}>

        <Modal.Header closeButton>
            <Modal.Title>Update Genre</Modal.Title>
        </Modal.Header>


        <Modal.Body>
        <form onSubmit={handleSubmitEdit} >

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" className="form-control" name="name" id="exampleInputEmail1" value={name} onChange={handleNameChange} required aria-describedby="emailHelp"/>
            </div>

            

            <Modal.Footer>

                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose} type="submit">Update Genre</Button>

            </Modal.Footer>
            
        </form>

        </Modal.Body>

    </Modal>
        
    
    
    
    
    </>);

}