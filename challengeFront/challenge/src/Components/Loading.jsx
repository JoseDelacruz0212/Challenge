import React from 'react'
import '../assets/Components/Loading.css'
import LogoLoading from '../Images/Loading.png'

function Loading() {
  return (
    <div className='principal-loading'>
      <img alt='loading' className='loading' src={LogoLoading} />
      <h2>Retrieving information</h2>
      <h3>Please wait a few seconds</h3>
    </div>
  )
}

export default Loading