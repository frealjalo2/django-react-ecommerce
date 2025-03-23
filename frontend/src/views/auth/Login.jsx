import React, {useState, useEffect} from 'react';
import {login} from '../../utils/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../store/auth';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const navigate = useNavigate();
    
    useEffect(() => {
      if(isLoggedIn()){
        navigate('/')
      }
    
    });

    const resetForm = () => {
      setPassword("");
      setEmail("");
    }

    const handleLogin = (event) => {
      event.preventDefault();
      setIsLoading(true);
      const {error} = login(email, password);
      console.log(error)
      if(error){
        alert(error);
      } else{
        navigate("/");
        resetForm();
      }
      setIsLoading(false);
    }
    return (
    <div>
        <h2>Welcome Back</h2>
        <p>Login to Continue</p>
        <form onSubmit={handleLogin}>
          <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <br />
          <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <br />
          <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login