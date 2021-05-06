import { Carousel,Card ,Button,Figure,Image,ListGroup,Modal,Form} from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';

import { useHistory } from "react-router-dom";

export default function ManageActors(){
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
    const [surname, setSurname] = useState("");
    const [avatar, setAvatar] = useState("");
    const [biography, setBiography] = useState("");
    const [birthday, setBirthday] = useState(new Date());
    const history = useHistory(); 
    const [data, setData] = useState(null);


    const handleNameChange = event =>{
        setName(event.target.value);
    }
    const handleSurnameChange = event =>{
        setSurname(event.target.value);
    }

    const handleAvatarChange = event =>{
        setAvatar(event.target.value);
    }
    const handleBiographyChange = event =>{
        setBiography(event.target.value);
    }
    const handleBirthdayChange = event =>{
        setBirthday(event.target.value);
    }
    



    
    const handleSubmitAddActor = event =>{
        const inputData = {name,surname,biography,birthday,avatar};
        addActor(inputData);
        loadData();
        event.preventDefault();
    }


    const oneActorEdit = row =>{
        console.log("Edit")
        setShowEdit(true);
        setId(row.id);
        setName(row.name);
        setSurname(row.surname);
        setBiography(row.biography);
        setBirthday(row.birthday);
        setAvatar(row.avatar);
      
     }

     const oneActorDelete = row =>{

        let id = row.id;
        let name = row.name;
        let surname=row.surname;
        let biography=row.biography;
        let birthday=row.birthday;
        let avatar=row.avatar;
        const inputData = {id,name,surname,biography,birthday,avatar}
        deleteActor(inputData);
        reload();
     }

     async function deleteActor(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/deleteActor", {
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



    async function addActor(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        console.log(JSON.stringify(data));
        const response = await fetch("http://localhost:8000/api/addActor", {
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
        const inputData = {id,name,surname,biography,birthday,avatar};
        saveActor(inputData);
        reload();
        event.preventDefault();
    
    
    }
    
    
    
    async function saveActor(data){
        console.log("asdd");
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/saveActor/"+id, {
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
        let response =await fetch("http://localhost:8000/api/allActors",{
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
                            data-target="#addItemsModal" onClick={handleShowAdd} >Add Actor

                    </button>

                    
                   

                    <table class="table table-striped mt-3">
                        
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Avatar</th>
                            <th>Birthday</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        {data?.map((row) => (
                        <tbody>
                     
                            <td >{row.id}</td>
                            <td >{row.name}</td>
                            <td >{row.surname}</td>
                            <td ><img src={row.avatar} class="rounded-circle" style={{height:"100px",width:"100px"}}alt="Cinque Terre" /></td>
                            <td >{row.birthday}</td>
                            <td> <a class="btn btn-success btn-sm" onClick={()=>{oneActorEdit(row)}} ><span  >Edit</span></a></td>
                            <td>
                                <button type="button" class="btn-sm btn-danger" data-toggle="modal" data-target="#deleteItemModal"  onClick={()=>{oneActorDelete(row)}} >
            
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
                <Modal.Title>Adding Actor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmitAddActor} >

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Name</label>
                        <input type="text" className="form-control" name="name" id="exampleInputEmail1" onChange={handleNameChange} required aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Surname</label>
                        <input type="text" className="form-control" name="surname" id="exampleInputEmail1" onChange={handleSurnameChange} required aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Biography</label>
                        <textarea type="text" style={{height:"150px"}} className="form-control" name="biography" id="exampleInputEmail1" onChange={handleBiographyChange} required aria-describedby="emailHelp"></textarea>
                    </div>

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Birthday</label>
                        <input type="date" className="form-control" name="birthday" id="exampleInputEmail1" onChange={handleBirthdayChange} required aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Avatar</label>
                        <input type="text" className="form-control" name="avatar" id="exampleInputEmail1" onChange={handleAvatarChange} required aria-describedby="emailHelp"/>
                    </div>

                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleCloseAdd}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseAdd} type="submit">Add Actor</Button>

                    </Modal.Footer>
                    
                </form>

            </Modal.Body>
        </Modal>

        <Modal show={showEdit} onHide={handleClose}>

        <Modal.Header closeButton>
            <Modal.Title>Update Actor</Modal.Title>
        </Modal.Header>


        <Modal.Body>
        <form onSubmit={handleSubmitEdit} >

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" className="form-control" name="name" id="exampleInputEmail1" value={name} onChange={handleNameChange} required aria-describedby="emailHelp"/>
            </div>

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Surname</label>
                <input type="text" className="form-control" name="surname" id="exampleInputEmail1" value={surname} onChange={handleSurnameChange} required aria-describedby="emailHelp"/>
            </div>

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Biography</label>
                <textarea type="text" style={{height:"150px"}}className="form-control" name="biography" id="exampleInputEmail1" value={biography}onChange={handleBiographyChange} required aria-describedby="emailHelp"></textarea>
            </div>

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Birthday</label>
                <input type="date" className="form-control" name="birthday" id="exampleInputEmail1" value={birthday} onChange={handleBirthdayChange} required aria-describedby="emailHelp"/>
            </div>

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Avatar</label>
                <input type="text" className="form-control" name="avatar" id="exampleInputEmail1" value={avatar} onChange={handleAvatarChange} required aria-describedby="emailHelp"/>
            </div>

            



            

            <Modal.Footer>

                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose} type="submit">Update Actor</Button>

            </Modal.Footer>
            
        </form>

        </Modal.Body>

    </Modal>
        
    
    
    
    
    </>);

}