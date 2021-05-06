
import { Nav,Item,Link,Container} from "react-bootstrap";

import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import '../bootstrap-4.6.0-dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import {useCookies} from 'react-cookie';
import React, { useEffect, useState } from 'react';

export default function Home(){
    const [id, setId] = useState(0);
    const [cookieJWT, setCookieJWT] = useCookies(['jwt']);
    const history = useHistory(); 
    const [data, setData] = useState(null);
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          flexDirection: 'column',
          '& > * + *': {
            marginTop: theme.spacing(1),
          },
        },
      }));

      const classes = useStyles();

      useEffect(() => {
          history.push('/main/home')
      }, []);

      useEffect(() => {
        history.push('/main/home')
    }, [])

    history.push('/main/home')

    history.push('/main/home')

    async function loadData(){
        
        let response =await fetch("http://localhost:8000/api/allMovies",{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
        },
        });
        let tableData = await response.json();
        setData(tableData);
        console.log(tableData);
        }useEffect(()=>{
        loadData();
        }, [id] );

        


    return (<>
        <link href="../assets/css/style.css" rel="stylesheet"></link>

        <div className=" ">
            <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
        
            <div class="container text-center text-md-left" data-aos="fade-up">
            <h1>Welcome to <span>KinoJava</span></h1>
            <h2>Site dedicated to different series, feature films and rating around the world</h2>
            <a href="/main/signIn" class="btn-get-started scrollto">Sign In</a>
            </div>
            </section>
            <div style={{ borderTop: "3px solid #2D2D2D ", color:'black',backgroundColor:'black'}}></div>

        </div>

        <div >

            <main className="container mt-5"style={{backgroundColor:"#373737"}}>
            <section className="" id="">
                
                {/* <div  className="mr-5"style={{backgroundColor:'black',width:"120%"} }>

                    <h2 className="mb-3 ml-4" style={{color:'white'}}>Featured Movies</h2>

                    <div style={{color:"white"}}>
                        <p>By Rating</p>
                        <p>By Date</p>
                    </div>

                </div> */}

            <Nav className="justify-content-between" style={{backgroundColor:'black',width:"102%"} }>
                <div>
                    <Nav.Link href="/main/" style={{color: 'white',fontSize:"26px"}}>Movies</Nav.Link>
                </div>

                <form class="d-flex">
                    <Nav.Link className="mt-2"href="/" style={{color: 'gold',fontSize:"16px"}}>By Rating</Nav.Link>
                    <Nav.Link className="mt-2 mr-3"href="/" style={{color: 'gold',fontSize:"16px"}}>By Date</Nav.Link>
                </form>
            </Nav>

           
                <div className="row mt-3 ml-2">
                {data?.map((row) => (
                    <div className="ml-5 mt-4 col-lg-3 col-md-4 col-sm-6 ">
                        <article className="card ml-3"  style={{width:"290px",backgroundColor:'black'}}>
                        
                            <div className="card-block" >
                                <div className="img-card">
                                    <img src={row.picURL}style={{minWidth:"289px",maxWidth:"290px" ,minHeight:"350px",maxHeight:"351px"}}></img>
                                </div>

                                <header className="title-header text-center mt-3">
                                    <a  href= {`/main/details/${row.id}`} style={{color:'gold',fontSize:"22px"}}>{row.title}</a>
                                </header>

                            



                                <div className="mt-3">
                                    <div className={classes.root}>
                                        <Rating name="half-rating-read" size="large" style={{backgroundColor:"#373737"}}defaultValue={row.imdb} precision={0.1} readOnly />
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </article>
                    </div>
 ))}

                </div>



            </section>
            </main>
        
        </div>

    </>
    );
}