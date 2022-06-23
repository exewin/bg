import React from 'react'
import styled from 'styled-components'
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
bottom:0;
color:white;
font-weight: 700;
text-shadow: 2px 2px #000;
width:200px;
text-align: center;
font-family: 'Joan', serif;
user-select: none;
`

export const Portrait = ({index, charClass, name}) => {

  const capitalizeWord = (str) => {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
  }
    
  return (
    <Div>
      <Img src={portraits[index]} border={charClass}/>
      <Text>{charClass && capitalizeWord(charClass)} {name && capitalizeWord(name)}</Text>
    </Div>
  )
}
