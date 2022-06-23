import React from 'react'
import { Button } from '@mui/material'
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from 'react-router-dom'

export const LogoutButton = ({children}) => {
    const {logout} = useAuth()
    const navigate = useNavigate()

    const handleClick = async() => {
        try{
            await logout()
            navigate("/")
        } catch (e) {
            console.log(e.message)
        }
    }

  return (
    <Button variant="contained" onClick={handleClick}>{children}</Button>
  )
}
