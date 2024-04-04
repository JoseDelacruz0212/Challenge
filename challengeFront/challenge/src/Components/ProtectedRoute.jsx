import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRoute({isAllowed, children, redirectTo='/'}) {
    if(isAllowed) return children?children:<Outlet/>
    else {
        return <Navigate to={redirectTo}/>
    }
}

export {ProtectedRoute}