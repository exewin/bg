import {Container, Box} from "@mui/material"
import React from "react"
import {LoginBox} from "./../components/LoginBox"
import {RegisterBox} from "./../components/RegisterBox"

export const Login = () => {
    return(
        <Container>
            <Box sx={{ 
                boxSizing: 'border-box',
                padding: '10px',
                bgcolor: '#cfe8fc', 
                height: '100vh',
                display:'flex',
                gap:'10px',
            }}>
                <LoginBox/>
                <RegisterBox/> 
            </Box>
        </Container>
    )
}