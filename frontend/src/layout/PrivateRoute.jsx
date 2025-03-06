import React from 'react';
import {Navigte} from 'react-router-dom';
import { useAuthStore } from '../store/auth';

const PrivateRoute = ({children}) =>{
    const loggedIn = useAuthStore((state) => state.isLoggedIn)()
    return loggedIn ? <>{children}</> : <Navigte to={'/login'} />;
};

export default PrivateRoute;