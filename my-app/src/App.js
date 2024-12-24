import React from 'react';
import './App.css';
import Registrationform from './components/Registrationform';
import LoginForm from './components/Loginform';



function App() {
  return (
    <div className="App">
      <h1>Fitness Gym</h1>
      <Registrationform />
      <LoginForm />
      
      
    </div>
  );
}

export default App;