import React, {useState, useEffect} from 'react';
import {login} from '../../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
      if(isLoggedIn()){
        navigate('/')
      }
    
    })
    

    console.log(username);
    return (
    <div>
        <h2>Welcome Back</h2>
        <p>Login to Continue</p>
    </div>
  )
}

export default Login