import React, { useContext, useEffect, useState } from 'react'
import '../assets/Pages/GroupManagment.css'
import { ModalBg } from '../Modals/ModalBg';
import { Group } from '../Form/Group';
import DeleteForm from '../Form/DeleteForm';
import { axiosGetGroups } from '../Api/Group';
import { GroupContext } from '../Context/GroupContext';
import { DataGrid } from '@mui/x-data-grid';
import { formatDateTime } from '../Components/DateUtils';
import { AlertBg } from '../Modals/AlertBg';
import { Alerts } from '../Alerts/Alerts';
import Loading from '../Components/Loading';
import { Error } from '../Components/Error';
import { useNavigate } from 'react-router-dom';

function GroupManagment() {

  const { Groups, setGroups,
    updateContext, setUpdateContext
  } = useContext(GroupContext);

  const [type, setType] = useState('new');
  const [GroupSelected, setGroupSelected] = useState(0);

  const [openModalGroup, setOpenModalGroup] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, seterrorMessage] = useState('');

	const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    axiosGetGroups()
      .then((response) => {
        const sortedRows = [...response.data].sort((a, b) => {
          const DateA = new Date(a.updatedOn);
          const DateB = new Date(b.updatedOn);

          return DateB - DateA; 
        });
        setGroups(sortedRows)
      })
      .catch((error) => {
        if (error.response) {
        }
        else if (error.request) {
          seterrorMessage('Server not reponse')
        }
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [, updateContext])

  const [selectedRowId, setSelectedRowId] = useState(null);

  const handleSelectionRow = (params) => {
    setSelectedRowId(params.id);
    setNombreSelected(params.row.nombreComercial);
  }
  const columns = [
    {
      field: 'selection',
      headerName: '#',
      sortable: false,
      width: 60,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => (
        <input
          type="radio"
          name="rowSelection"
          checked={params.id === selectedRowId}
          onChange={() => handleSelectionRow(params)}
        />
      ),
    },
    
    {
      field: 'groupName',
      headerName: 'Group Name',
      align: 'center',
      headerAlign: 'center',
      width: 400,
      editable: false,
    },
    {
      field: 'companyName',
      headerName: 'Company Name',
      align: 'center',
      headerAlign: 'center',
      width: 400,
      editable: false,
    },
    {
      field: 'createdBy',
      headerName: 'Created By',
      align: 'center',
      headerAlign: 'center',
      width: 400,
      editable: false,
    },
    {
      field: 'contactCount',
      headerName: 'N° of Contacts',
      align: 'center',
      headerAlign: 'center',
      width: 400,
      editable: false,
    },
    {
      field: 'updatedOn',
      headerName: 'Updated On',
      valueFormatter: (params) => formatDateTime(params.value),
      align: 'center',
      headerAlign: 'center',
      width: 200,
      editable: false,
    }
  ];

  const [openAlert, setOpenAlert] = useState(false);
  const [mensajeAlerta, setAlertMessage] = useState('');

  const OpenModalGroups = (type, idRow) => {
    if (idRow == null && type != 'new') {
      setAlertMessage('Please, select a Group')
      setOpenAlert(true);
      return
    }
    setType(type);
    setGroupSelected(idRow);
    setOpenModalGroup(true);
  }
  const NavigateContacts = (id) => {
    navigate(`/Contacts/${id}`);
  }

  const Delete = (id) => {
    if (id == null) {
      setAlertMessage('Please, select a Group')
      setOpenAlert(true);
      return
    }
    setGroupSelected(id);
    setOpenModalDelete(true);
  }

  return (
    <div className='principal-Groups'>
      {isLoading ?
        <Loading />
        :
        isError ?
          <Error mensaje={errorMessage} boton={false} />
          :
          <>
            <div className='list'>
              <div className='Top'>
                <h2>List Of Groups</h2>
              </div>
              <div className='buttons'>
                <div className='add'>
                  <button style={{ width: '150px' }}
                    onClick={() => OpenModalGroups('new')} className='opcion'>New Group</button>
                </div>
                <div className='options'>
                  <button onClick={() => NavigateContacts(selectedRowId)}
                    style={{ width: '100px' }} className='opcion'>View Contacts</button>
                      <button onClick={() => OpenModalGroups('view', selectedRowId)}
                    style={{ width: '50px' }} className='opcion'>View</button>
                  <button onClick={() => OpenModalGroups('edit', selectedRowId)}
                    style={{ width: '70px' }} className='opcion'>Edit</button>
                  <button onClick={() => Delete(selectedRowId)}
                    style={{ width: '80px' }} className='opcion'>Delete</button>

                </div>
              </div>
              <div className='list-Groups'>
                <DataGrid
                  rows={Groups}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 10,
                      },
                    },
                  }}
                  pageSizeOptions={[10]}
                  disableRowSelectionOnClick
                  autoHeight
                />
              </div>
            </div>
      
          </>
      }
      {
        openModalGroup &&
        <ModalBg>
          <Group openModal={openModalGroup} setOpenModal={setOpenModalGroup}
            type={type} GroupId={GroupSelected}
            setOpenAlert={setOpenAlert} setAlertMessage={setAlertMessage} />
        </ModalBg>
      }
      {
        openModalDelete &&
        <ModalBg>
          <DeleteForm openModal={openModalDelete} setOpenModal={setOpenModalDelete}
            ContactId={GroupSelected} type={"Group"}
            setOpenAlert={setOpenAlert} setAlertMessage={setAlertMessage} />
        </ModalBg>
      }
      {
        openAlert &&
        <AlertBg>
          <Alerts openAlert={openAlert} setOpenAlert={setOpenAlert}
            mensajeAlerta={mensajeAlerta} />
        </AlertBg>
      }

    </div>
  )
}

export { GroupManagment }