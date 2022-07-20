import React from 'react'
import palIcon from "../assets/icons/paladin.png"
import warIcon from "../assets/icons/warrior.png"
import magIcon from "../assets/icons/mage.png"
import styled from 'styled-components'

const Img = styled.img` 
width:48px;
border-radius: 4px;
user-select: none;
border: ${props=>props.selected ? '2px solid green' : '2px solid black'};
&:hover{
    border: ${props=>props.selected ? '2px solid lime' : '2px solid yellow'};
    cursor:pointer;
}
`

const icons = [warIcon, palIcon, magIcon]

export const Icon = ({onClick, icon, selected}) => {
  return (
    <Img 
        src={typeof icon === 'number' ? icons[icon] : icon} 
        onClick={onClick} 
        selected={selected}
        draggable={false}
    />
  )
}
