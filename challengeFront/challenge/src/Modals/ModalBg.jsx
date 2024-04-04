import React from 'react'
import {createPortal} from 'react-dom'
import '../assets/Modals/ModalBg.css'

function ModalBg({children}) {
  return createPortal(
    <div className='modal-bg'>
      {children}
    </div>,
    document.getElementById('modal')
  )
}

export {ModalBg}