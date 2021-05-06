import React from 'react';

const UserContext = React.createContext({
    email: "ilyas@gmail.com",
    fullName:"Ilyas Kendyrkhan",
    auth: false,
    jwtToken: ""
});

export default UserContext;