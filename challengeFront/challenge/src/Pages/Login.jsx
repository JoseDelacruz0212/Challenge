import React, { useContext, useState } from 'react'
import '../assets/Pages/Login.css'
import { userContext } from '../Context/UserContext';
import LogoLogin from '../Images/AddressBook.png'
import { AlertBg } from '../Modals/AlertBg';
import { Alerts } from '../Alerts/Alerts';

function Login() {

  const {
    login,
    UserLogin, setUserLogin,
    openAlert, setOpenAlert, signUp,
    openAlertWrongConfirmPassword
  } = useContext(userContext);

  const [signIn, setSignIn] = useState(false);
  const [validateEmail, setValidateEmail] = useState(false);
  const changeLogin = () => {
    setSignIn(!signIn);
  }

  const handleLogin = (field, value) => {
    setUserLogin({
      ...UserLogin,
      [field]: value
    })
  }
    const handleInputChange = (field, value) => {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      emailRegex.test(value) ?setValidateEmail(true):setValidateEmail(false);
    setUserLogin({
      ...UserLogin,
      [field]: value
    })
  };

  return (
    <div className='mainbox-login'>
      <div className={`main-container ${signIn ? 'active' : ''}`}>
        <div className='form-container sign-in'>
          <form onSubmit={login}>
            <img src={LogoLogin} alt='mono-login' className='mono-login' />
            <h1 className='title-form'>Log In</h1>
            <p className='label-form'>Email</p>
            <input type='text' value={UserLogin.email}
              onChange={(event) => handleInputChange('email', event.target.value)}
              autoComplete="email" />
              {!validateEmail &&UserLogin.email!==''&& <p>The field only accepts emails *</p>}
            <p className='label-form'>Password</p>
            <input type='password' value={UserLogin.password}
              onChange={(event) => handleLogin('password', event.target.value)}
              autoComplete="current-password" />
            <button className='btn-signin'   disabled={!validateEmail}type='submit'>Log In</button>
          </form>
        </div>
        <div className='form-container sign-up'>
          <form onSubmit={signUp}>
            <img src={LogoLogin} alt='mono-login' className='mono-signUp' />
            <h1 className='title-form'>Sign Up</h1>
            <p className='label-form'>Email</p>
            <input
              type='text'
              value={UserLogin.email}
              onChange={(event) => handleInputChange('email', event.target.value)}
              autoComplete="email"
     
            />
            {!validateEmail &&UserLogin.email!=='' && <p>The field only accepts emails *</p>}
            <p className='label-form'>Password</p>
            <input type='password' value={UserLogin.password}
              onChange={(event) => handleLogin('password', event.target.value)}
              autoComplete="current-password" />
            <p className='label-form'>Confirm Password</p>
            <input type='password' value={UserLogin.confirmPassword}
              onChange={(event) => handleLogin('confirmPassword', event.target.value)}
              autoComplete="current-confirmPassword" />
                 {(UserLogin.confirmPassword!==''&&UserLogin.password!=='') &&(UserLogin.confirmPassword!==UserLogin.password) && <p>the password's doesn't match *</p>}
            <button className='btn-signup' disabled={!validateEmail} 
            type='submit'>Sign Up</button>
           
          </form>
        </div>
        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h1>Already have an account?</h1>
              <p>Enter your credentials to access the system</p>
              <button onClick={changeLogin}>Log In</button>
            </div>
            <div className='overlay-panel overlay-right'>
              <h1>¿New user?</h1>
              <p>Create your account to proceed</p>
              <button onClick={changeLogin}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      {
        openAlert &&
        <AlertBg>
          <Alerts openAlert={openAlert}
            setOpenAlert={setOpenAlert}
            mensajeAlerta={'Incorrect credentials"'} />
        </AlertBg>

      }
     
    </div>
  )
}

export { Login }