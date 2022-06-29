import React from "react"
import styled from "styled-components"
import {LoginBox} from "./../components/LoginBox"
import {RegisterBox} from "./../components/RegisterBox"
import {Background} from "./../components/Background"
import bg from "../assets/backgrounds/5.jpg"

const Container = styled.div`
background-color: azure;
height: 100vh;
max-width: 1200px;
margin: 0 auto;
`

const Wrapper = styled.div` 
display:flex;
flex-wrap:wrap;
justify-content:center;
align-items:center;
`

const Title = styled.h3` 
`

export const Login = () => {
    return(
        <Container>
            <Background img={bg}>
                <Title>welcome guys</Title>
                <Wrapper>
                    <LoginBox/>
                    <RegisterBox/> 
                </Wrapper>
            </Background>
        </Container>
    )
}