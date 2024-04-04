import React, { useState, useContext, useEffect } from 'react'
import '../assets/Form/Contact.css'
import { ContactContext } from '../Context/ContactContext';
import { formatDateTime } from '../Components/DateUtils';
import { axiosGetContactById,axiosUpdateContact,axiosCreateContact} from '../Api/Contact';
import { useParams } from 'react-router-dom';
function Contact({ openModal, setOpenModal, type, ContactId, setOpenAlert, setAlertMessage }) {

  const [phoneNumberValid, setPhoneNumberValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [firstNameValid, setFirstNameValid] = useState(true);
  const [physicalAddressValid , setPhysicalAddressValid ] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const paramsRoute = useParams();
  const modalTitle =
    type == 'new' ? 'Create new Contact'
      : type == 'view' ? 'View Contact'
        : type == 'edit' ? 'Edit Contact' : '';

  const {
    contact, setContact,
    ClearFields,
    updateContext, setUpdateContext
  } = useContext(ContactContext);

  useEffect(() => {
    ClearFields();
    if (type == 'new') {
      ClearFields();
    }
    else if (type == 'edit' || type == 'view') {
      axiosGetContactById(ContactId)
        .then((response) => {
          setContact(response.data[0]);
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }, [])



  const [validFields, setValidFields] = useState(true);

  const handleInputChange = (field, value) => {
    const numericRegex = /^\d*$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const stringRegex  = /^[a-zA-Z\s]*$/;
    const alphanumericWithSpacesRegex  = /^[a-zA-Z0-9\s]*$/; 
    switch (field) {
      case 'phoneNumber':
        numericRegex.test(value) ? setPhoneNumberValid(true) : setPhoneNumberValid(false);

        break;
      case 'email':
        emailRegex.test(value) ? setEmailValid(true) : setEmailValid(false);

        break;
      case 'firstName':
        stringRegex.test(value) ? setFirstNameValid(true) : setFirstNameValid(false);

        break;
      case 'lastName':
        stringRegex.test(value) ? setLastNameValid(true) : setLastNameValid(false);

        break;
      case 'physicalAddress':
        alphanumericWithSpacesRegex.test(value) ? setPhysicalAddressValid(true) : setPhysicalAddressValid(false);

      default:
        break;
    }
    setContact({
      ...contact,
      [field]: value,
    });
  };


  const onSubmit = (event) => {
    event.preventDefault();

    setValidFields(true);

    if (!ValidateFields()) {
      setValidFields(false);
      return;
    }
    setValidFields(true);
    const body = {
      "firstName": contact.firstName,
      "lastName": contact.lastName,
      "phoneNumber": contact.phoneNumber,
      "email": contact.email,
      "physicalAddress": contact.physicalAddress,
      
    }

    if (type === 'new') {
      axiosCreateContact(body,paramsRoute.id)
        .then((response) => {
          setUpdateContext(!updateContext);
          setAlertMessage('Contact successfully created')
          setOpenAlert(true)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else if (type === 'edit') {
      axiosUpdateContact(ContactId, body,paramsRoute.id)
        .then((response) => {
          setUpdateContext(!updateContext);
          setAlertMessage('Contact successfully Updated')
          setOpenAlert(true)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    closeModal();
  }

  const closeModal = () => {
    ClearFields();
    setOpenModal(false);
  }

  const ValidateFields = () => {
    return (
      phoneNumberValid &&
      emailValid &&
      physicalAddressValid
    ) && (
        contact.firstName !== '' &&
        contact.lastName !== '' &&
        contact.phoneNumber !== '' &&
        contact.email !== '' &&
        contact.physicalAddress !== ''
      );
  };


  return (
    <form className='principal-Contact' onSubmit={onSubmit}>
      <h2>{modalTitle}</h2>
      <div className='data-block'>
        <div className='label-input'>
          <label>First Name*</label>
          <input
            type='text'
            disabled={type === 'view'}
            value={contact.firstName}
            onChange={(event) => handleInputChange("firstName", event.target.value)}
          />
          {!firstNameValid && <p>The field only accepts letters *</p>}
        </div>
        <div className='label-input'>
          <label>Last Name*</label>
          <input
            type='text'
            disabled={type === 'view'}
            value={contact.lastName}
            onChange={(event) => handleInputChange("lastName", event.target.value)}
          />
          {!lastNameValid && <p>The field only accepts letters *</p>}
        </div>
        <div className='label-input'>
          <label>Phone Number*</label>
          <input
            type='text'
            disabled={type === 'view'}
            value={contact.phoneNumber}
            onChange={(event) => handleInputChange("phoneNumber", event.target.value)}
          />
          {!phoneNumberValid && <p>The field must be a phone number*</p>}
        </div>
        <div className='label-input'>
          <label>Email*</label>
          <input
            type='text'
            disabled={type === 'view'}
            value={contact.email}
            onChange={(event) => handleInputChange("email", event.target.value)}
          />
          {!emailValid && <p>Enter a valid email format*</p>}
        </div>
        <div className='label-input'>
          <label>Physical Address*</label>
          <input
            type='text'
            disabled={type === 'view'}
            value={contact.physicalAddress}
            onChange={(event) => handleInputChange("physicalAddress", event.target.value)}
          />
          {!physicalAddressValid && <p>The field only accepts letters and numbers</p>}
        </div>
      </div>
      <div className='footer'>
        {type !== 'new' && <span>Last updated: {formatDateTime(contact.updatedOn)}</span>}
        {type === 'new' && <span></span>}
        <div className='buttons'>
          {!validFields && <p>Required fields empty or invalid</p>}
          {type !== 'view' && <button type='submit'>{type === 'edit' ? 'Update' : 'Save'}</button>}
          <button type='button' onClick={() => closeModal()}>Cancel</button>
        </div>
      </div>
    </form>

  )
}

export { Contact }