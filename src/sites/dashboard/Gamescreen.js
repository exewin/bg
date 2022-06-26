import {Button } from '@mui/material'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useCharacter } from '../../contexts/CharacterContext'
import { cancelListenToCharacterChange, listenToCharacterChange } from '../../firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { playSound } from '../../utils/soundController'


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
padding: 2px;
`

const Color = styled.span`
color: ${props=>props.light === props.match ? 'yellow' : 'white'};
`

export const Gamescreen = () => {

  const location = useLocation().pathname.split("/")[3]
  
  const {user} = useAuth()
  const {setCharacter} = useCharacter()

  useEffect(()=>{
    listenToCharacterChange(user.uid, setCharacter)
    return () => {
      cancelListenToCharacterChange()
    }
  },[])

  useEffect(()=> {
    switch(location){
      case "character":{ playSound(0); break }
      case "mission":{ playSound(1); break }
      case "work":{ playSound(2); break }
      case "chat":{ playSound(3); break }
      default:{}
    }
  },[location])


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
