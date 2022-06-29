import React from 'react'
import styled from 'styled-components'
import missionCard from "../assets/ui/missionCard.png"
import bag from "../assets/icons/bag.png"
import book from "../assets/icons/book.png"
import clock from "../assets/icons/clock.png"
import { Button } from './Button'

const Box = styled.div` 
background-image: url(${props=>props.bg});
background-size: cover;
height: 380px;
width: 265px;
text-align: center;
padding: 20px 45px;
box-sizing: border-box;
display:flex;
flex-direction: column;
`

const Title = styled.h3``
const Description = styled.p`
text-align: left;
font-size: 0.8em;
`

const Detail = styled.div` 
display: flex;
gap: 10px;
align-items: center;
margin-bottom: 5px;
font-family: 'Zen Kaku Gothic New', sans-serif;
`

const Img = styled.img`
max-width:32px;
max-height: 32px;
`

export const MissionBox = ({description, name, gold, xp, click, time}) => {
  return (
    <Box bg={missionCard}>
        <Title>{name}</Title>
        <Description>{description}</Description>
        <Detail><Img src={clock}/> {time}</Detail>
        <Detail><Img src={bag}/> {gold}</Detail>
        <Detail><Img src={book}/> {xp}</Detail>
        <Button onClick={click}>Start Mission</Button>
    </Box>
  )
}