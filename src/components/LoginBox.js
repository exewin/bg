import React, { useState } from "react"
import {useNavigate} from "react-router-dom"
import styled from "styled-components"
import { useAuth } from "../contexts/AuthContext"
import card from "../assets/ui/missionCard.png"
import { Button } from "./Button"

const Box = styled.div` 
background-image: url(${props=>props.bg});
background-size: cover;
height: 456px;
width: 318px;
text-align: center;
padding: 24px 54px;
box-sizing: border-box;
display:flex;
flex-direction: column;
font-family: 'Joan', serif;
color:white;
text-shadow: 1px 1px black;
gap: 5px;
flex-wrap: wrap;
`

const Title = styled.h3``
const Description = styled.p`
text-align: left;
font-size: 0.8em;
`

const Input = styled.input` 
height:25px;
width: 95%;
`

export const LoginBox = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")
        try{
            await login(email, password)
            navigate("/dashboard")
        } catch (err) {
            setError(err.message)
        }
    }

    return(
        <form onSumbit={handleSubmit}>
            <Box bg={card}>
                <Title>
                    Login:
                </Title>
                    <Input 
                        onChange={(e)=>setEmail(e.target.value)} 
                        value={email}
                        name="email"
                        placeholder="E-mail" 
                        type="email" 
                    />
                    <Input
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password}
                        placeholder="Password" 
                        type="password"
                    />
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                {error && <Description>{error}</Description>}
            </Box>
        </form>
        
    )
}