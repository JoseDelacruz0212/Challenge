import React, { useContext } from 'react'
import '../assets/Components/Header.css'
import Logo from '../Images/AddressBook_white.png'
import { userContext } from '../Context/UserContext';

function Header() {

  const {
    logout
  }= useContext(userContext); 
  return (
    <div className='principal-header'>
      <img className='logo-new' alt='logo' src={Logo}/>
      <h1 className='titulo-header'>AddressBook</h1>
      <div className="logout-button-container">
      <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
  
}

export {Header}