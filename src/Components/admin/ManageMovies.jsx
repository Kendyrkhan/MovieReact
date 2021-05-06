import { Carousel,Card ,Button,Figure,Image,ListGroup,Modal,Form} from "react-bootstrap";
import React, { useEffect, useState } from 'react';
import {useCookies} from 'react-cookie';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { useHistory } from "react-router-dom";

import InputLabel from '@material-ui/core/InputLabel';

import MenuItem from '@material-ui/core/MenuItem';
import { findRenderedDOMComponentWithTag } from "react-dom/test-utils";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 450,
      maxWidth: 500,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));



  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };


  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  


export default function ManageMovies(){

    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
      setPersonName(event.target.value);
    };

    const theme = useTheme();
    const classes = useStyles();
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
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picURL, setPicURL] = useState("");
    const [imdb, setImdb] = useState(0.0);
    const [addedDate, setAddedDate] = useState(new Date());
    const [createdDate, setCreatedDate] = useState(new Date());
    const [year, setYear] = useState(0);
    const [sbor, setSbor] = useState("");
    const [rashod, setRashod] = useState("");
    const [genresList, setGenresList] = useState([]);
    const [actorsList, setActorsList] = useState([]);

    const [allGenresList, setAllGenresList] = useState([]);
    const [allActorsList, setAllActorsList] = useState([]);
    const history = useHistory(); 
    const [data, setData] = useState(null);



    const handleTitleChange = event =>{
        setTitle(event.target.value);
    }
    const handleDescriptionChange = event =>{
        setDescription(event.target.value);
    }

    const handlePicURLChange = event =>{
        setPicURL(event.target.value);
    }
    const handleImdbChange = event =>{
        setImdb(event.target.value);
    }
    const handleAddedDateChange = event =>{
        setAddedDate(event.target.value);
    }
    const handleCreatedDateChange = event =>{
        setCreatedDate(event.target.value);
    }
    const handleYearDateChange = event =>{
        setYear(event.target.value);
    } 
    const handleSborChange = event =>{
        setSbor(event.target.value);
    } 
    const handleRashodChange = event =>{
        setRashod(event.target.value);
    }


    const handleGenresListChange = event =>{
        console.log(event.target.value);
        setGenresList(event.target.value);
    }

    const handleActorsListChange = event =>{
        console.log(event.target.value);
        setActorsList(event.target.value);
    }



    
    const handleSubmitAddMovie = event =>{
        const inputData = {title,description,picURL,imdb,addedDate,year,sbor,rashod,createdDate,genresList,actorsList};
        addMovie(inputData);
     
        event.preventDefault();
    }
    const oneMovieEdit = row =>{
        console.log("Edit")
        setShowEdit(true);
        setId(row.id);
        setTitle(row.title);
        setDescription(row.description);
        setPicURL(row.picURL);
        setImdb(row.imdb);
        setAddedDate(row.addedDate);
        setYear(row.year);
        setSbor(row.sbor);
        setRashod(row.rashod);
        setCreatedDate(row.createdDate);
        setGenresList(row.genresList);
        setActorsList(row.actorsList);
     }
     
     const oneMovieDelete = row =>{
        let id = row.id;
        let title=row.title;
        let description=row.description;
        let picURL=row.picURL;
        let imdb=row.imdb;
        let addedDate=row.addedDate;
        let year=row.year;
        let sbor=row.sbor;
        let rashod=row.rashod;
        let createdDate=row.createdDate;
        let genresList=row.genresList;
        let actorsList=row.actorsList;
        const inputData = {id,title,description,picURL,imdb,addedDate,year,sbor,rashod,createdDate,genresList,actorsList}
        deleteMovie(inputData);
        reload();
     }

     async function deleteMovie(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/deleteMovie", {
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

    async function addMovie(data){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        console.log(JSON.stringify(data));
        const response = await fetch("http://localhost:8000/api/addMovie", {
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
        const inputData = {id,title,description,picURL,imdb,addedDate,year,sbor,rashod,createdDate,genresList,actorsList};
        saveMovie(inputData);
        reload();
        event.preventDefault();
    
    
    }
    
    
    
    async function saveMovie(data){
        console.log("asdd");
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        const response = await fetch("http://localhost:8000/api/saveMovie/"+id, {
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
        let response =await fetch("http://localhost:8000/api/allMovies",{
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



      async function loadActors(){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        let response =await fetch("http://localhost:8000/api/allActors",{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
        },
        });
        let actorsData = await response.json();
        setAllActorsList(actorsData);
        }useEffect(()=>{
            loadActors();
        }, [] );


      
      async function loadGenres(){
        const bearer = "Bearer "+cookieJWT['jwt'].jwtToken;
        let response =await fetch("http://localhost:8000/api/allGenres",{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
            Authorization: bearer,
        },
        });
        let genresData = await response.json();
        setAllGenresList(genresData);
        }useEffect(()=>{
            loadGenres();
        }, [] );

        const [selectedValue, setSelectedValue] = useState([]);
      
     
        const handleChangeTemp = (e) => {
          console.log(e);
          setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
          console.log(selectedValue);
        }
        

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
                            data-target="#addItemsModal" onClick={handleShowAdd} >Add Movie

                    </button>

                    
                   

                    <table class="table table-striped mt-3">
                        
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>PicURL</th>
                            <th>Imdb</th>
                            <th>CreatedDate</th>
                            <th>AddedDate</th>
                            <th>GenresList</th>
                            <th>ActorsList</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        {data?.map((row) => (
                        <tbody>
                     
                            <td >{row.id}</td>
                            <td >{row.title}</td>
                            <td ><img src={row.picURL} class="rounded-circle" style={{height:"100px",width:"100px"}}alt="Cinque Terre" /></td>
                            <td >{row.imdb}</td>
                            <td >{row.createdDate}</td>
                            <td >{row.addedDate}</td>
                            <td>
                            {row.genresList?.map((gens) => (gens.name + " , "))}  
                            </td>
                            <td>
                            {row.actorsList?.map((acts) => (acts.name + " " +acts.surname + " , "))}  
                            </td>


                            <td> <a class="btn btn-success btn-sm" onClick={()=>{oneMovieEdit(row)}} ><span  >Edit</span></a></td>
                            <td>
                                <button type="button" class="btn-sm btn-danger" data-toggle="modal" data-target="#deleteItemModal"  onClick={()=>{oneMovieDelete(row)}} >
            
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
                <Modal.Title>Adding Movie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmitAddMovie} >

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Title</label>
                        <input type="text" className="form-control" name="title" id="exampleInputEmail1" onChange={handleTitleChange} required aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Description</label>
                        <textarea type="text" style={{height:"150px"}} className="form-control" name="description" id="exampleInputEmail1" onChange={handleDescriptionChange} required aria-describedby="emailHelp"></textarea>
                    </div>

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">PicUrl</label>
                        <input type="text" className="form-control" name="picURL" id="exampleInputEmail1" onChange={handlePicURLChange} required aria-describedby="emailHelp"/>
                    </div>



                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Imdb</label>
                        <input type="text" className="form-control" name="imdb" id="exampleInputEmail1" onChange={handleImdbChange} required aria-describedby="emailHelp"/>
                    </div>

                    

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">AddedDate</label>
                        <input type="date" className="form-control" name="addedDate" id="exampleInputEmail1" onChange={handleAddedDateChange} required aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Year</label>
                        <input type="text" className="form-control" name="year" id="exampleInputEmail1" onChange={handleYearDateChange} required aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Sbor</label>
                        <input type="text" className="form-control" name="sbor" id="exampleInputEmail1" onChange={handleSborChange} required aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Rashod</label>
                        <input type="text" className="form-control" name="rashod" id="exampleInputEmail1" onChange={handleRashodChange} required aria-describedby="emailHelp"/>
                    </div>

                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">CreatedDate</label>
                        <input type="date" className="form-control" name="createdDate" id="exampleInputEmail1" onChange={handleCreatedDateChange} required aria-describedby="emailHelp"/>
                    </div>


                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-chip-label">Genres</InputLabel>
                        <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={genresList}
                        onChange={handleGenresListChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value.id} label={value.name} className={classes.chip} />
                            ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                        >
                        {allGenresList.map((genre) => (
                            <MenuItem key={genre.id} value={genre} style={getStyles(genre.id, genre.name, theme)}>
                            {genre.name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-chip-label">Actors</InputLabel>
                        <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={actorsList}
                        onChange={handleActorsListChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value.id} label={value.name} className={classes.chip} />
                            ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                        >
                        {allActorsList.map((actors) => (
                            <MenuItem key={actors.id} value={actors} style={getStyles(actors.id, actors.name, theme)}>
                            {actors.name + " " + actors.surname}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>


{/* 
                    <div className="form-group mt-4">
                        <label for="exampleInputEmail1">Genres</label>
                        <div className={classes.root,"ml-1 mb-1"}>
                        <Autocomplete
                            
                            multiple
                            id="tags-filled"
                            options={allGenresList.map((option) =>option.name)}

                           
                            onChange={(event, value)=>{handleGenresListChange(value)}}
                            
                            GenresList
                      
                            renderTags={(value, getTagProps) => 
                                value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                            }

                            renderInput={(params) => (
                            <TextField {...params}  label="Choose genres of movie" />
                            )}
                        />
                        </div>
                    </div>   */}

                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleCloseAdd}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleCloseAdd} type="submit">Add Movie</Button>

                    </Modal.Footer>
                    
                </form>

            </Modal.Body>
        </Modal>



        <Modal show={showEdit} onHide={handleClose}>

        <Modal.Header closeButton>
            <Modal.Title>Update Movie</Modal.Title>
        </Modal.Header>


        <Modal.Body>
        <form onSubmit={handleSubmitEdit} >

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Title</label>
                <input type="text" className="form-control" name="title" value={title} id="exampleInputEmail1" onChange={handleTitleChange} required aria-describedby="emailHelp"/>
            </div>

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Description</label>
                <textarea type="text" style={{height:"150px"}} className="form-control" value={description} name="description" id="exampleInputEmail1" onChange={handleDescriptionChange} required aria-describedby="emailHelp"></textarea>
            </div>

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">PicUrl</label>
                <input type="text" className="form-control" name="picURL" value={picURL} id="exampleInputEmail1" onChange={handlePicURLChange} required aria-describedby="emailHelp"/>
            </div>



            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Imdb</label>
                <input type="text" className="form-control" name="imdb" id="exampleInputEmail1" value={imdb} onChange={handleImdbChange} required aria-describedby="emailHelp"/>
            </div>

        
            <div className="form-group mt-4">
                <label for="exampleInputEmail1">AddedDate</label>
                <input type="date" className="form-control" name="addedDate" value={addedDate} id="exampleInputEmail1" onChange={handleAddedDateChange} required aria-describedby="emailHelp"/>
            </div>

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Year</label>
                <input type="text" className="form-control" name="year" value={year} id="exampleInputEmail1" onChange={handleYearDateChange} required aria-describedby="emailHelp"/>
            </div>

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Sbor</label>
                <input type="text" className="form-control" name="sbor" value={sbor} id="exampleInputEmail1" onChange={handleSborChange} required aria-describedby="emailHelp"/>
            </div>

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">Rashod</label>
                <input type="text" className="form-control" name="rashod" value={rashod} id="exampleInputEmail1" onChange={handleRashodChange} required aria-describedby="emailHelp"/>
            </div>

            <div className="form-group mt-4">
                <label for="exampleInputEmail1">CreatedDate</label>
                <input type="date" className="form-control" name="createdDate" value={createdDate} id="exampleInputEmail1" onChange={handleCreatedDateChange} required aria-describedby="emailHelp"/>
            </div>


            <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-chip-label">Genres</InputLabel>
                        <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={genresList}
                        onChange={handleGenresListChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value.id} label={value.name} className={classes.chip} />
                            ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                        >
                        {allGenresList.map((genre) => (
                            <MenuItem key={genre.id} value={genre} style={getStyles(genre.id, genre.name, theme)}>
                            {genre.name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel id="demo-mutiple-chip-label">Actors</InputLabel>
                        <Select
                        labelId="demo-mutiple-chip-label"
                        id="demo-mutiple-chip"
                        multiple
                        value={actorsList}
                        onChange={handleActorsListChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <div className={classes.chips}>
                            {selected.map((value) => (
                                <Chip key={value.id} label={value.name} className={classes.chip} />
                            ))}
                            </div>
                        )}
                        MenuProps={MenuProps}
                        >
                        {allActorsList.map((actors) => (
                            <MenuItem key={actors.id} value={actors} style={getStyles(actors.id, actors.name, theme)}>
                            {actors.name + " " + actors.surname}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
            

            <Modal.Footer>

                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose} type="submit">Update Movie</Button>

            </Modal.Footer>
            
            
        </form>

        </Modal.Body>

    </Modal>
        
    
    
    
    
    </>);

}


/*





*/