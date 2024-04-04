import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from './UseLocalStorage';
import { axiosLogin,axiosSignUp } from '../Api/User';

const userContext = createContext();
function UserProvider({children}) {

	const {item:user, saveItem:saveUser} = useLocalStorage('token', null);

	const [UserLogin, setUserLogin] = useState({
		'email':'',
		'password':''
	})

	const [openAlert, setOpenAlert] = useState(false);
	
	const [openAlertWrongConfirmPassword, setopenAlertWrongConfirmPassword] = useState(false);
	const [emailValid, setemailValid] = useState(true);
	const body = {
		"email": UserLogin.email,
		"password": UserLogin.password,
	  }

	  const navigate = useNavigate();
	const signUp = () =>{

		  if(UserLogin.confirmPassword===UserLogin.password){
			event.preventDefault();
			axiosSignUp(body).then((response) => {
				navigate('/');
			  })
			  .catch((error) => {
				navigate('/');
			  })
		  }else{
			setopenAlertWrongConfirmPassword(true)
		  }
		

		
	}
	const login = () =>{
	
		  event.preventDefault();
		axiosLogin(body).then((response) => {
			saveUser(response.data);
			event.preventDefault();
			navigate('/Groups');

		  })
		  .catch((error) => {
		  })
		
	}
	const logout = () =>{
		navigate('/');
	}
  return (
    <userContext.Provider
        value={{
			user,
            login,
            logout,
			UserLogin, setUserLogin,
			emailValid, setemailValid,
			openAlert, setOpenAlert,signUp,openAlertWrongConfirmPassword,setopenAlertWrongConfirmPassword
        }}
    >
        {children}
    </userContext.Provider>
  )
}

export {userContext, UserProvider}