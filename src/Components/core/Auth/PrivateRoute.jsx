import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    const {user} = useSelector(state => state.profile);

    if(!user){
        return <Navigate to="/login"/>
    }
    else{
        return children;
    }

}

export default PrivateRoute