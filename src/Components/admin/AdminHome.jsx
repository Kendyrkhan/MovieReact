export default function AdminHome(){






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
    </div>




    </>);
}