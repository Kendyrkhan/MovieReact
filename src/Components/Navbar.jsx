
import { Nav,Item,Link} from "react-bootstrap";


export default function Navbar(){
    return (<>
       
        <div style={{backgroundColor:'black'} }>
            <div style={{ borderTop: "3px solid #2D2D2D ", color:'black',backgroundColor:'black'}}></div>
            
            <div className="container">
            
                <Nav className="justify-content-between">
                
                    <Nav.Item >
                        <Nav.Link href="/main/" style={{color: 'white',fontSize:"26px"}}>Home</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#" style={{color: 'white',fontSize:"26px"}}>Top Movies</Nav.Link>
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link href="#" style={{color: 'white',fontSize:"26px"}}>New Movies</Nav.Link>
                    </Nav.Item>
                
                </Nav>

            </div>
            <div style={{ borderTop: "3px solid #2D2D2D ", color:'black',backgroundColor:'black'}}></div>


        </div>

    
       

        
    
   

    </>
    );
}