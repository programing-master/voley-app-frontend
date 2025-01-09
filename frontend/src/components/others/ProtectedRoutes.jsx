import React, { useEffect } from 'react'
import { useAuth } from '../../context/authContext'
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoutes () {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }
  return <Outlet />
}
