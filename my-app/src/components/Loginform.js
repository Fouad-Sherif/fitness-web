import React from 'react';


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
  
    
    const userData=await response.json();
    sessionStorage.setItem("userData", JSON.stringify(userData));
        if(userData.isAdmin===1)
          navigate("addgyms")
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
