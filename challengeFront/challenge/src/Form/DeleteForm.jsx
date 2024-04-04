import React, { useContext } from 'react'
import '../assets/Form/DeleteForm.css'
import LogoWarning from '../Images/Warning.png'
import { axiosDeleteContact } from '../Api/Contact';
import { axiosDeleteGroup } from '../Api/Group';
import { ContactContext } from '../Context/ContactContext';
import { GroupContext } from '../Context/GroupContext';


function DeleteForm({openModal, setOpenModal,ContactId,setOpenAlert,setAlertMessage,type}) {
  const {
    updateContext: groupUpdateContext,
    setUpdateContext: setGroupUpdateContext,
    ClearFields: clearGroupFields
  } = useContext(GroupContext);

  // Extraer variables del segundo contexto
  const {
    updateContext: contactUpdateContext,
    setUpdateContext: setContactUpdateContext,
    ClearFields: clearContactFields
  } = useContext(ContactContext);

  const DeleteFormFunctionGroup = () =>{

      axiosDeleteGroup(ContactId)
      .then((response)=>{
        setGroupUpdateContext(!groupUpdateContext);
        setAlertMessage(type+' successfully deleted')
        setOpenAlert(true)
        closeModal();
      })
      .catch((error)=>{
        console.log(error);
      })

  }

  const DeleteFormFunctionContact = () =>{
    axiosDeleteContact(ContactId)
    .then((response)=>{
      setContactUpdateContext(!contactUpdateContext);
      setAlertMessage(type+' successfully deleted')
      setOpenAlert(true)
      closeModal();
    })
    .catch((error)=>{
      console.log(error);
    })

  }

  const closeModal = () =>{
    clearGroupFields();
    setOpenModal(false);
  }
  return (
    <div className='principal-Delete'>
      <img className='logo-Warning' src={LogoWarning} alt='logo Warning'/>
      <h2>Are you sure you want to delete this {type}?</h2>
<p>Once deleted, the information cannot be recovered</p>
      {type=="Contact" &&  <button  className='confirm' onClick={()=>{DeleteFormFunctionContact()}}>Delete</button>}
      {type=="Group" &&  <button  className='confirm' onClick={()=>{DeleteFormFunctionGroup()}}>Delete</button>}
      <button className='cancel' onClick={()=>{closeModal()}}>Cancel</button>

    </div>
  )
}

export default DeleteForm