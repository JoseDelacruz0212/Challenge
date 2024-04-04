import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../Components/Header'
import '../assets/Pages/MainEstructure.css'
import { ContactManagment } from './ContactManagment'
import { GroupManagment } from './GroupManagment'

function MainEstructure() {
  return (
    <div className='principal-estructura'>
      <Header/>
      <ContactManagment/>
    </div>
  )
}

export {MainEstructure}