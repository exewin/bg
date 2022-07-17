import React from 'react'
import styled from 'styled-components'
import { capitalizeWord } from '../utils/capitalizeWord'
import { portraits } from '../utils/portraitController'

const Div = styled.div`
position:relative;
width: fit-content;
`

const Img = styled.img`
width:200px;
border: 3px solid ${props=>
props.border==="warrior"?'#910':
props.border==="paladin"?'#019':
props.border==="mage"?'#2a1':
'#333'};
border-radius: 1em;
`

const Text = styled.div` 
position:absolute;
color:white;
font-weight: 700;
text-shadow: 2px 1px #000;
width:200px;
text-align: center;
font-family: 'Zen Kaku Gothic New', sans-serif;
user-select: none;
`
const UpText = styled(Text)``

const DownText = styled(Text)`
bottom:5px;
`

export const Portrait = ({index, charClass, name, level}) => {
    
  return (
    <Div>
      <UpText>{name && capitalizeWord(name)}</UpText>
      <Img src={portraits[index]} border={charClass} draggable={false}/>
      <DownText>{level && `Level ${level}`} {charClass && capitalizeWord(charClass)}</DownText>
    </Div>
  )
}
