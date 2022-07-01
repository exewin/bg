import React from "react"
import styled from "styled-components"
import {LoginBox} from "./../components/LoginBox"
import {RegisterBox} from "./../components/RegisterBox"
import {Background} from "./../components/Background"
import bg from "../assets/backgrounds/5.jpg"
import {Footer} from "./../components/Footer"

const Container = styled.div`
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

const Title = styled.h1` 
text-align: center;
`

export const Login = () => {
    return(
        <Container>
            <Background img={bg} css={{position:'relative'}}>
                <Title>Enter the game</Title>
                <Wrapper>
                    <LoginBox/>
                    <RegisterBox/> 
                </Wrapper>
                <Footer css={{position:'absolute', bottom:'0px', marginTop:"20px", width:'90%', textAlign:'center'}}/>
            </Background>
        </Container>
    )
}