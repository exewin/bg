import React from 'react'
import styled from 'styled-components'
import imagea from "../assets/ui/button.png"

const Div=styled.div` 
background-image: url(${props=>props.bg});
background-size: cover;
width:164px;
height:27px;
display:flex;
align-items: center;
justify-content: center;
align-self: center;
cursor: pointer;
user-select: none;
`

export const Button = ({children, onClick}) => {
  return (
    <Div bg={imagea} onClick={onClick}>{children}</Div>
  )
}
