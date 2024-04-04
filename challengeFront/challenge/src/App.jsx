import './App.css'
import { Route, Routes } from 'react-router-dom'
import { MainEstructure } from './Pages/MainEstructure'
import { GroupStructure } from './Pages/GroupStructure'
import { ProtectedRoute } from './Components/ProtectedRoute'
import { Login } from './Pages/Login'
import { useContext } from 'react'
import { userContext } from './Context/UserContext'

function App() {

  const {
    user
  }= useContext(userContext);

  return (
    <div className='principal'>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route element={<ProtectedRoute isAllowed={!!user}/>}>
        <Route path='/Groups' element={<GroupStructure/>}/>
          <Route path='/Contacts/:id' element={<MainEstructure/>}/>
        </Route>
        <Route path='/*' element={<h1>NOT FOUND</h1>}/>
      </Routes>
    </div>
  )
}

export default App
