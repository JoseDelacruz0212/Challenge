import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import {BrowserRouter} from 'react-router-dom'
import {ContactProvider} from './Context/ContactContext.jsx'
import {GroupProvider} from './Context/GroupContext.jsx'
import './index.css'
import { UserProvider } from './Context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <ContactProvider>
      <GroupProvider>
          <App />
          </GroupProvider>
      </ContactProvider>
    </UserProvider>
  </BrowserRouter>
)
