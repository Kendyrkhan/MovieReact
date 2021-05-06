import { SportsRugbySharp } from '@material-ui/icons';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "../App.scss";
let backdropIMG;

class Card extends Component {

  render() {
   
      return (
        <div >
        <div className="col-xs-12 pt-5" style={{backgroundImage:"url(https://pbs.twimg.com/media/EUnxlIiXQAIbRjY.jpg)",backgroundRepeat:'no-repeat',backgroundSize:'100%',minHeight:"800px",maxHeight:"801px" ,backgroundColor:'black',opacity:'0.8'}}>

              <div className="container " style={{backgroundColor: 'black',opacity:'0.9'}}>


                <div className="row">
                  <div className="col-lg-5 mt-5 ml-5">
                    <img src="https://pbs.twimg.com/media/EUnxlIiXQAIbRjY.jpg" class="img-fluid" alt="" style={{minWidth:"409px",maxWidth:"410px" ,minHeight:"550px",maxHeight:"551px"}}/>
                  </div>
                  <div className="col-lg-6 pt-4 mt-5 " style={{color:"white"}}>
                    <h3>The 100</h3>
                    <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.


                    </p>
                  
                      <li>Zhyl: 2017</li>
                      <li>Imdb: 7.5</li>
                   
                    <div class="row icon- mb-5 pb-5">
                      <div class="col-md-6 pb-5">
                        <i class="bx bx-receipt"></i>
                        <h4>Kassovyi sbor</h4>
                        <p style={{color:'#00FF00',fontSize:'26px',fontWeight:'bold'}}>14400000 $</p>
                      </div>
                      <div class="col-md-6 mt-4 mt-md-0">
                        <i class="bx bx-cube-alt"></i>
                        <h4>Potracheno</h4>
                        <p style={{color:'#00FF00',fontSize:'26px',fontWeight:'bold'}}>33000000 $</p>
                      </div>
                    </div>
                  </div>




                </div>

              </div>
         





        </div>
        </div>
      )
    }
  
}

export default Card;