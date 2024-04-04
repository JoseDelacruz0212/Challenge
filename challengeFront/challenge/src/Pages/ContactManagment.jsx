import React, { useContext, useEffect, useState } from 'react'
import '../assets/Pages/ContactManagment.css'
import { ModalBg } from '../Modals/ModalBg';
import { Contact } from '../Form/Contact';
import DeleteForm from '../Form/DeleteForm';
import { GetContactsByGroup } from '../Api/Contact';
import { ContactContext } from '../Context/ContactContext';
import { DataGrid } from '@mui/x-data-grid';
import { formatDateTime } from '../Components/DateUtils';
import { AlertBg } from '../Modals/AlertBg';
import { Alerts } from '../Alerts/Alerts';
import Loading from '../Components/Loading';
import { Error } from '../Components/Error';
import { useParams ,useNavigate} from 'react-router-dom';
function ContactManagment() {

  const { Contacts, setContacts,
    updateContext, setUpdateContext
  } = useContext(ContactContext);

	const navigate = useNavigate();
  const [type, setType] = useState('new');
  const [ContactSelected, setContactSelected] = useState(0);

  const [openModalContact, setOpenModalContact] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const paramsRoute = useParams();
  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    GetContactsByGroup(paramsRoute.id)
      .then((response) => {
        const sortedRows = [...response.data].sort((a, b) => {
          const DateA = new Date(a.updatedOn);
          const DateB = new Date(b.updatedOn);

          return DateB - DateA; 
        });
        setContacts(sortedRows)
      })
      .catch((error) => {
        if (error.response) {
          setMensajeError('Se produjo un error con codigo: ', error.response.status)
        }
        else if (error.request) {
          setMensajeError('No hubo respuesta del servidor')
        }
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [, updateContext])

  const [selectedRowId, setSelectedRowId] = useState(null);
  const [nombreSelected, setNombreSelected] = useState(null);

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
      field: 'firstName',
      headerName: 'First Name',
      align: 'center',
      headerAlign: 'center',
      width: 400,
      editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      align: 'center',
      headerAlign: 'center',
      width: 400,
      editable: false,
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      align: 'center',
      headerAlign: 'center',
      width: 400,
      editable: false,
    },
    {
      field: 'email',
      headerName: 'Email',
      align: 'center',
      headerAlign: 'center',
      width: 400,
      editable: false,
    },
    {
      field: 'physicalAddress',
      headerName: 'Physical Address',
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

  const OpenModalContacts = (type, idRow) => {
    if (idRow == null && type != 'new') {
      setAlertMessage('Please, select a contact')
      setOpenAlert(true);
      return
    }
    setType(type);
    setContactSelected(idRow);
    setOpenModalContact(true);
  }

  const Delete = (id) => {
    if (id == null) {
      setAlertMessage('Please, select a contact')
      setOpenAlert(true);
      return
    }
    setContactSelected(id);
    setOpenModalDelete(true);
  }

  return (
    <div className='principal-Contacts'>
      {isLoading ?
        <Loading />
        :
        isError ?
          <Error mensaje={mensajeError} boton={false} />
          :
          <>
            <div className='list'>
              <div className='Top'>
                <h2>List Of Contacts</h2>
              </div>
              <div className='buttons'>
                <div className='add'>
                  <button style={{ width: '150px' }}
                    onClick={() => OpenModalContacts('new')} className='opcion'>New Contact</button>
                </div>
                <div className='options'>
                <button onClick={() => navigate("/Groups")}
                    style={{ width: '100px' }} className='opcion'>Back to Groups</button>
                  <button onClick={() => OpenModalContacts('view', selectedRowId)}
                    style={{ width: '50px' }} className='opcion'>View</button>
                  <button onClick={() => OpenModalContacts('edit', selectedRowId)}
                    style={{ width: '70px' }} className='opcion'>Edit</button>
                  <button onClick={() => Delete(selectedRowId)}
                    style={{ width: '80px' }} className='opcion'>Delete</button>

                </div>
              </div>
              <div className='list-Contacts'>
                <DataGrid
                  rows={Contacts}
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
        openModalContact &&
        <ModalBg>
          <Contact openModal={openModalContact} setOpenModal={setOpenModalContact}
            type={type} ContactId={ContactSelected}
            setOpenAlert={setOpenAlert} setAlertMessage={setAlertMessage} />
        </ModalBg>
      }
      {
        openModalDelete &&
        <ModalBg>
          <DeleteForm openModal={openModalDelete} setOpenModal={setOpenModalDelete}
            ContactId={ContactSelected} type={"Contact"}
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

export { ContactManagment }