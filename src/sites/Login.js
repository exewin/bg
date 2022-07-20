import React, { useEffect } from "react"
import styled from "styled-components"
import {LoginBox} from "./../components/LoginBox"
import {RegisterBox} from "./../components/RegisterBox"
import {Background} from "./../components/Background"
import {Footer} from "./../components/Footer"
import { bgs } from "../utils/backgroundController"
import { stopAll } from "../utils/soundController"

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
    useEffect(()=>{
        stopAll()
    },[])
    return(
        <Container>
            <Background img={bgs[5]}css={{position:'relative'}}>
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