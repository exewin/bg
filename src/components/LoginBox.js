import React, { useState } from "react"
import {useNavigate} from "react-router-dom"
import {Box, Button, TextField, Alert, Typography} from '@mui/material'
import { useAuth } from "../contexts/AuthContext"

export const LoginBox = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async() => {
        setError("")
        try{
            await login(email, password)
            navigate("/dashboard")
        } catch (err) {
            setError(err.message)
        }
    }

    return(
        <Box
        sx={{
            borderRadius: '5px',
            padding: '10px',
            width: 300,
            height: 400,
            backgroundColor: 'rgba(122,199,255,0.9)',
        }}>
            <Typography variant="subtitle1">
                Login:
            </Typography>
            <form onSubmit={handleSubmit} noValidate>
                <TextField 
                    onChange={(e)=>setEmail(e.target.value)} 
                    value={email}
                    name="email"
                    label="E-mail" 
                    type="email" 
                    size="small" 
                    variant="filled"
                />
                <TextField 
                    onChange={(e)=>setPassword(e.target.value)} 
                    value={password}
                    label="Password" 
                    type="password"
                    size="small" 
                    variant="filled" 
                />
                <div><Button sx={{ mt: 1 }} onClick={handleSubmit} variant="contained">Submit</Button></div>
            </form>
            {
            error && 
                <Alert sx={{ mt: 1 }} severity="error">{error}</Alert>
            }
        
        </Box>
    )
}