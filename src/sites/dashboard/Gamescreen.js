import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useCharacter } from '../../contexts/CharacterContext'
import { cancelListenToCharacterChange, listenToCharacterChange } from '../../firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { playSound, stopAll } from '../../utils/soundController'
import highButton from "../../assets/ui/high_button.png"
import sideBg from "../../assets/ui/side_bg.png"


const Container = styled.div` 
display:flex;
height: 90vh;
width:100%;
`

const Button = styled.button` 
background-image: url(${props=>props.bg});
background-size: contain;
width:131px;
height: 43px;
border:none;
cursor: pointer;
font-family: 'Joan', serif;
`

const SideMenu = styled.div` 
display: flex;
flex-direction: column;
align-items: center;
gap: 5px;
padding: 5px;
width: 200px;
background-image: url(${props=>props.bg});
background-size: contain;
`

const SelectedMenu = styled.div` 
max-width: 1000px;
width: 100%;
min-width: 300px;
background-color: black;
overflow-y: auto;
overflow-x: hidden;
padding-left:2px;
`

const Color = styled.span`
color: ${props=>props.light === props.match ? 'yellow' : 'white'};
`

export const Gamescreen = () => {

  const location = useLocation().pathname.split("/")[3]
  
  const {user} = useAuth()
  const {character, setCharacter, error} = useCharacter()

  useEffect(()=>{
    listenToCharacterChange(user.uid, setCharacter)
    return () => {
      cancelListenToCharacterChange()
    }
  },[])

  useEffect(()=> {
    switch(location){
      case "character":{ playSound(0); break }
      case "mission":{ character?.progress?.task?.type!=="mission" ? playSound(1) : stopAll(); break }
      case "work":{ playSound(2); break }
      case "chat":{ playSound(3); break }
      default:{}
    }
  },[location, character])


  return (
    <Container>
        <SideMenu bg={sideBg}>
          <Link to={"character"}><Button bg={highButton}><Color light={location} match="character">Character</Color></Button></Link>
          <Link to={"mission"}><Button bg={highButton}><Color light={location} match="mission">Mission</Color></Button></Link>
          <Link to={"work"}><Button bg={highButton}><Color light={location} match="work">Work</Color></Button></Link>
          <Link to={"chat"}><Button bg={highButton}><Color light={location} match="chat">Chat</Color></Button></Link>
          {error}
        </SideMenu>
        <SelectedMenu>
            <Outlet/>
        </SelectedMenu>
    </Container>
  )
}
