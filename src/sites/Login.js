import {Box} from "@mui/material"
import React from "react"
import styled from "styled-components"
import {LoginBox} from "./../components/LoginBox"
import {RegisterBox} from "./../components/RegisterBox"

const Container = styled.div`
background-color: azure;
height: 100vh;
max-width: 1200px;
margin: 0 auto;
`

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