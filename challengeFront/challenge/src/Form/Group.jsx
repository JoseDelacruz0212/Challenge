import React, { useState, useContext, useEffect } from 'react'
import '../assets/Form/Group.css'
import { GroupContext } from '../Context/GroupContext';
import { formatDateTime } from '../Components/DateUtils';
import { axiosUpdateGroup,axiosCreateGroup,axiosGetGroupById} from '../Api/Group';

function Group({ openModal, setOpenModal, type, GroupId, setOpenAlert, setAlertMessage }) {

  const [groupNameValid, setgroupNameValid] = useState(true);
  const [companyNameValid, setcompanyNameValid] = useState(true);
  const modalTitle =
    type == 'new' ? 'Create new Group'
      : type == 'view' ? 'View Group'
        : type == 'edit' ? 'Edit Group' : '';

  const {
    Group, setGroup,
    ClearFields,
    updateContext, setUpdateContext
  } = useContext(GroupContext);

  useEffect(() => {
    ClearFields();
    if (type == 'new') {
      ClearFields();
    }
    else if (type == 'edit' || type == 'view') {
      axiosGetGroupById(GroupId)
        .then((response) => {
          setGroup(response.data[0]);
        })
        .catch((error) => {
          console.error(error);
        })
    }
  }, [])



  const [validFields, setValidFields] = useState(true);

  const handleInputChange = (field, value) => {
    const stringRegex  = /^[a-zA-Z\s]*$/;
    switch (field) {
      case 'groupName':
        stringRegex.test(value) ? setgroupNameValid(true) : setgroupNameValid(false);
        break;
      case 'companyName':
        stringRegex.test(value) ? setcompanyNameValid(true) : setcompanyNameValid(false);

        break;
    
      default:
        break;
    }
    setGroup({
      ...Group,
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
      "companyName": Group.companyName,
      "groupName": Group.groupName
    }

    if (type === 'new') {
      axiosCreateGroup(body)
        .then((response) => {
          setUpdateContext(!updateContext);
          setAlertMessage('Group successfully created')
          setOpenAlert(true)
        })
        .catch((error) => {
          console.log(error);
        })
    }
    else if (type === 'edit') {
      axiosUpdateGroup(GroupId, body)
        .then((response) => {
          setUpdateContext(!updateContext);
          setAlertMessage('Group successfully Updated')
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
      companyNameValid &&
      groupNameValid 
    ) && (
        Group.companyName !== '' &&
        Group.groupName !== '' 
      );
  };


  return (
    <form className='principal-Group' onSubmit={onSubmit}>
      <h2>{modalTitle}</h2>
      <div className='data-block'>
        <div className='label-input'>
          <label>Group Name*</label>
          <input
            type='text'
            disabled={type === 'view'}
            value={Group.groupName}
            onChange={(event) => handleInputChange("groupName", event.target.value)}
          />
          {!groupNameValid && <p>The field only accepts letters *</p>}
        </div>
        <div className='label-input'>
          <label>Company Name*</label>
          <input
            type='text'
            disabled={type === 'view'}
            value={Group.companyName}
            onChange={(event) => handleInputChange("companyName", event.target.value)}
          />
          {!companyNameValid && <p>The field only accepts letters *</p>}
        </div>
       
       
      </div>
      <div className='footer'>
        {type !== 'new' && <span>Last updated: {formatDateTime(Group.updatedOn)}</span>}
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

export { Group }