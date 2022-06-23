import {Button } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { Outlet, Link, useLocation } from 'react-router-dom'

const Container = styled.div` 
background-color: antiquewhite;
display: grid;
grid-template-columns: 1fr 8fr;
height: 90vh;
`

const SideMenu = styled.div` 
background-color: antiquewhite;
display: flex;
flex-direction: column;
gap: 5px;
padding: 5px;
`

const SelectedMenu = styled.div` 
border-right: 0.5em solid antiquewhite;
background-color: gray;
padding: 5px;
`

const Color = styled.span`
color: ${props=>props.light === props.match ? 'yellow' : 'white'};
`

export const Gamescreen = () => {

  const location = useLocation().pathname.split("/")[3]

  return (
    <Container>
        <SideMenu>
          <Link to={"character"}><Button variant="contained" size="large"><Color light={location} match="character">Character</Color></Button></Link>
          <Link to={"mission"}><Button variant="contained" size="large"><Color light={location} match="mission">Mission</Color></Button></Link>
          <Link to={"work"}><Button variant="contained" size="large"><Color light={location} match="work">Work</Color></Button></Link>
          <Link to={"chat"}><Button variant="contained" size="large"><Color light={location} match="chat">Chat</Color></Button></Link>
        </SideMenu>
        <SelectedMenu>
            <Outlet/>
        </SelectedMenu>
    </Container>
  )
}
