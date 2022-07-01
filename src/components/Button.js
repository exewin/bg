import React from 'react'
import styled from 'styled-components'
import btn from "../assets/ui/button.png"
import wbtn from "../assets/ui/high_button.png"

const Div=styled.div` 
background-image: url(${props=>props.bg});
background-size: cover;
width:${props=>props.w}px;
height:${props=>props.h}px;
display:flex;
align-items: center;
justify-content: center;
align-self: center;
text-align: center;
cursor: pointer;
user-select: none;
${props=>props.css};
`

export const Button = ({children, onClick, wide = false, css, size=1}) => {
  const width = 164*size
  const height = wide ? 54*size : 27*size;
  return (
    <Div bg={wide ? wbtn : btn} w={width} h={height} css={css} onClick={onClick}>{children}</Div>
  )
}
