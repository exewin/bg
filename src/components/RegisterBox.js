import React, { useState } from "react"
import {useNavigate} from "react-router-dom"
import {Box, Button, TextField, Alert, Typography} from '@mui/material'
import { useAuth } from "../contexts/AuthContext"

export const RegisterBox = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const {register} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")
        try{
            if(password !== confirmPassword){
                throw new Error("Passwords don't match")
            }
            await register(email, password)
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
            backgroundColor: 'rgba(177,123,255,0.9)',
        }}>
            <Typography variant="subtitle1">
                Create Account:
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField 
                    onChange={(e)=>setEmail(e.target.value)} 
                    value={email}
                    name="email"
                    label="E-mail" 
                    type="email" 
                    autoComplete="off"
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
                    autoComplete="new-password"
                />
                <TextField 
                    onChange={(e)=>setConfirmPassword(e.target.value)} 
                    value={confirmPassword}
                    label="Confirm Password" 
                    type="password" 
                    size="small" 
                    variant="filled" 
                />
                <div><Button sx={{ mt: 1 }} variant="contained" type="submit">Submit</Button></div>

                {
                error && 
                    <Alert sx={{ mt: 1 }} severity="error">{error}</Alert>
                }
            </form>
        </Box>
    )
}