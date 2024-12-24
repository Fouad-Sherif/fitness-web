import React, { useState } from 'react';

const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');

  const registerUser = () => {
    fetch('http://localhost:666/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password, isAdmin }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Registration failed');
        }
        setMessage('Registration successful');
        alert('Registration successful'); 
      })
      .catch((error) => {
        setMessage(error.message);
        alert(error.message); 
      });
  };

  return (
    <div className="form-section">
      <h3>User Registration</h3>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)} 
          />
          Admin
        </label>
        <br />
        <button type="button" onClick={registerUser}>
          Register
        </button>
      </form>
      <p>{message}</p> 
    </div>
  );
};

export default RegistrationForm;
