import React, { useState } from "react"
import {useNavigate} from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import styled from "styled-components"
import { Button } from "./Button"
import card from "../assets/ui/missionCard.png"
import { Box } from "./Box"

const Title = styled.h3``
const Description = styled.p`
text-align: left;
font-size: 0.8em;
`

const Input = styled.input` 
height:25px;
`

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
        <form onSubmit={handleSubmit}>
            <Box bg={card}>
            <Title>Create Account:</Title>
                <Input
                    onChange={(e)=>setEmail(e.target.value)} 
                    value={email}
                    name="email"
                    placeholder="E-mail" 
                    type="email" 
                    autoComplete="off"
                />
                <Input
                    onChange={(e)=>setPassword(e.target.value)} 
                    value={password}
                    placeholder="Password" 
                    type="password"
                    autoComplete="new-password"
                />
                <Input
                    onChange={(e)=>setConfirmPassword(e.target.value)} 
                    value={confirmPassword}
                    placeholder="Confirm Password" 
                    type="password" 
                />
                <Button type="submit">Submit</Button>
                {error && <Description>{error}</Description>}
            </Box>
        </form>
    )
}