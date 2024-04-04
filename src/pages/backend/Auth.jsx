import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Auth() {

  const navigate = useNavigate();

  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (!currentUser.name) {
      navigate('/login');
    }
  }, [currentUser.name])
  return (
    <div>
      <Outlet />
    </div>
  )
}
