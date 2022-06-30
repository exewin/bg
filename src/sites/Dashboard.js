import React, { useEffect, useState } from 'react'
import { useAuth } from "../contexts/AuthContext"
import { LogoutButton } from '../components/LogoutButton'
import { Outlet, useNavigate } from 'react-router-dom'
import { userExistsDB } from '../firebase/firestore'
import styled from 'styled-components'
import { CenteredLoading } from '../components/CenteredLoading'
import { Footer } from '../components/Footer'

import { MissionInjector } from '../adminTool/MissionInjector'

const Container = styled.div`
height: 100vh;
max-width: 1200px;
margin: 0 auto;
`

const SubContainer = styled.div` 
height: 90vh;
display: flex;
justify-content: center;
align-items: center;
`

const Nav = styled.nav`
height: 5vh;
display:flex;
align-items: center;
justify-content: right;
gap: 5px;
padding: 0px 5px;
`

export const Dashboard = () => {

    const [loading, setLoading] = useState(true)
    const {user} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(user?.uid)
            userExistsDB(user.uid).then(response =>{
                if(response)
                    navigate("gamescreen")
                else
                    navigate("creation")
                
                setLoading(false)
            })
    },[user])

    if(!user){
        navigate("/")
    }

    return (
        <Container>
            {loading ? 
                <CenteredLoading/>
            :
                <>
                    <Nav>
                        Account: {user.email}
                        <MissionInjector/>
                        <LogoutButton>s</LogoutButton>
                    </Nav>
                    <SubContainer>
                        <Outlet/>
                    </SubContainer>
                    <Footer/>
                </>
            }
        </Container>
    )
}
