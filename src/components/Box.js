import React from 'react'
import styled from 'styled-components'
import card from '../assets/ui/missionCard.png'

const Div = styled.div` 
background-image: url(${props => props.bg});
background-size: cover;
height: ${props => props.scale * 456}px;
width: ${props => props.scale * 318}px;
text-align: center;
padding: ${props => props.scale * 24}px ${props => props.scale * 54}px;
box-sizing: border-box;
display:flex;
flex-direction: column;
font-family: 'Joan', serif;
color:white;
text-shadow: 1px 1px black;
gap: 5px;
flex-wrap: wrap;
${props => props.css};
`

export const Box = ({ children, css, scale = 1 }) => {
  return (
    <Div bg={card} scale={scale} css={css}>{children}</Div>
  )
}
