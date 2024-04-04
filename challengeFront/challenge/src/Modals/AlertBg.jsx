import React from 'react'
import {createPortal} from 'react-dom'
import '../assets/Modals/Alerts.css'

function AlertBg({children}) {
  return createPortal(
    <div className='alert-bg'>
      {children}
    </div>,
    document.getElementById('modal')
  )
}

export {AlertBg}