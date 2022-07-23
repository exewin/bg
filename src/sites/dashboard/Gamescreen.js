import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useCharacter } from '../../contexts/CharacterContext'
import { cancelListenToCharacterChange, listenToCharacterChange } from '../../firebase/firestore'
import { useAuth } from '../../contexts/AuthContext'
import { playMusic, stopAll } from '../../utils/soundController'
import highButton from "../../assets/ui/high_button.png"
import sideBg from "../../assets/ui/side_bg.png"
import { ColorHighlight } from '../../components/ColorHighlight'
import { ErrorFade } from '../../components/ErrorFade'


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
      case "character":{ playMusic(0); break }
      case "mission":{ character?.progress?.task?.type!=="mission" ? playMusic(1) : stopAll(); break }
      case "work":{ playMusic(2); break }
      case "players":{ stopAll(); break }
      case "quest":{ stopAll(); break }
      case "mail":{ playMusic(0); break }
      default:{ stopAll(); break }
    }
  },[location, character])


  return (
    <>
      <Container>
          <SideMenu bg={sideBg}>
            <Link to={"character"}><Button bg={highButton}><ColorHighlight light={location} match="character">Character</ColorHighlight></Button></Link>
            <Link to={"mission"}><Button bg={highButton}><ColorHighlight light={location} match="mission">Mission</ColorHighlight></Button></Link>
            <Link to={"work"}><Button bg={highButton}><ColorHighlight light={location} match="work">Work</ColorHighlight></Button></Link>
            {character?.stats?.level >= 3
              ? <Link to={"quest"}><Button bg={highButton}><ColorHighlight light={location} match="quest">Quest</ColorHighlight></Button></Link> 
              : <Button title="You need level 3" bg={highButton} css={{color:"gray"}}>Quest</Button>
            }
            <Link to={"mail"}><Button bg={highButton}><ColorHighlight light={location} match="mail">Mail</ColorHighlight></Button></Link>
            <Link to={"players"}><Button bg={highButton}><ColorHighlight light={location} match="players">Players</ColorHighlight></Button></Link>
          </SideMenu>
          <SelectedMenu>
              <Outlet/>
          </SelectedMenu>
      </Container>
      <ErrorFade/>
    </>
  )
}
