import React from 'react'
import styled from 'styled-components'
import bag from '../assets/icons/bag.png'
import book from '../assets/icons/book.png'
import clock from '../assets/icons/clock.png'
import item from '../assets/icons/epic.png'
import { Button } from './Button'
import { Box } from './Box'

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

export const MissionBox = ({ description, name, gold, xp, click, time, epic, children = 'Start Mission', scale }) => {
  return (
    <Box scale={scale}>
        <Title>{name}</Title>
        <Description>{description}</Description>
        {time && <Detail><Img src={clock}/> {time}</Detail>}
        {epic && <Detail><Img src={item}/> Epic Item</Detail>}
        <Detail><Img src={bag}/> {gold}</Detail>
        <Detail><Img src={book}/> {xp}</Detail>
        <Button onClick={click}>{children}</Button>
    </Box>
  )
}
