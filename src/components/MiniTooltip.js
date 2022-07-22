import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
position: relative;
`

const Circle = styled.div` 
display:flex;
align-items: center;
justify-content: center;
border: 1px solid #222;
border-radius: 100px;
width: 16px;
height: 16px;
color: white;
font-size: 14px;
background-color: #444;
user-select: none;
cursor: help;
`

const Tooltip = styled.div` 
font-size: 14px;
width: 200px;
height: fit-content;
background-color: rgba(33,33,33,0.5);
border-radius: 10px;
position: absolute;
left:17px;
color:white;
font-family: 'Joan', serif;
padding: 5px 10px;
z-index: 1;
`

export const MiniTooltip = ({text}) => {
    const [hover, setHover] = useState(false)
  return (
    <Container>
    <Circle
        onMouseEnter={()=>setHover(true)}
        onMouseLeave={()=>setHover(false)}
    >i</Circle>
    {
        hover &&
        <Tooltip>{text}</Tooltip>
    }
    </Container>
  )
}
