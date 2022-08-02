import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from './Button'

export const LogoutButton = ({ children }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      await logout()
      navigate('/')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <Button dot size={1.2} onClick={handleClick}>{children}</Button>
  )
}
