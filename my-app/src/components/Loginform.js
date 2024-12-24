import React from 'react';
import { jwtDecode } from 'jwt-decode';

const LoginForm = ({navigate}) => {
  let email = '';
  let password = '';
  let message = '';
  const loginUser = async () => {
    try{
   const response= await fetch('http://localhost:666/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });
    if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
    //   const data = await response.json();
    //   const token = document.cookie.split('token=')[1];  // Get token from cookies
    // if (token) {
    // const decodedToken = jwt_decode(token);
    // if (decodedToken.ISADMIN) {
    //     console.log('User is an Admin');
    //   } else {
    //     console.log('User is not an Admin');
    //   }
    // } else {
    //   console.log('No token found');
    // }
    //   const token = document.cookie
    //     .split('; ')
    //     .find((row) => row.startsWith('token='))
    //     ?.split('=')[1];
    //     console.log(document.cookie);
    //   if (!token) {
    //     throw new Error('Token not found');
    //   }
  
    //   const decodedToken = jwtDecode(token); 
    //   console.log(decodedToken);
  
    //   if (decodedToken.ISADMIN === 1) {
    //     navigate("addgyms");
    //   } else {
    //     navigate("gyms");
    //   }
    const userData=await response.json();
        if(userData.isAdmin===1)
          navigate("add-gyms")
        else
        navigate("gyms");

    } catch (error) {
      message = error.message;
      alert(message);
    }
  };


  return (
    <div className="form-section">
      <h3>User Login</h3>
      <form>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => (email = e.target.value)} 
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => (password = e.target.value)} 
          required
        />
        <br />
        <button type="button" onClick={loginUser}>
          Login
        </button>
      </form>
      <p>{message}</p>    
      </div>
  );
};

export default LoginForm;
