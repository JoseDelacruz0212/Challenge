import React from 'react'
import '../assets/Components/Error.css'
import LogoError from '../Images/error.png'



function Error({mensaje, setOpenModal, boton=true}) {
  return (
    <div className='principal-error'>
        <img alt='error' className='error' src={LogoError}/>
        <h2>There was an error.</h2>
        {mensaje}
        {boton&&<button className='close' onClick={()=>setOpenModal(false)}>Close</button>}
    </div>
  )
}

export {Error}