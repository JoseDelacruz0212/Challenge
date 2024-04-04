import React from 'react'
import { Header } from '../Components/Header'
import '../assets/Pages/MainEstructure.css'
import { GroupManagment } from './GroupManagment'

function GroupStructure() {
  return (
    <div className='principal-estructura'>
      <Header/>
      <GroupManagment/>
    </div>
  )
}

export {GroupStructure}