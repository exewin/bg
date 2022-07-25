import React from 'react'
import styled from 'styled-components'
import btn from "../assets/ui/button.png"
import wbtn from "../assets/ui/high_button.png"
import wbtnd from "../assets/ui/high_button_dot.png"
import btnd from "../assets/ui/button_dot.png"

const Div=styled.button` 
border:none;
color:white;
font-size: large;
font-family: 'Joan', serif;
background-image: url(${props=>props.bg});
background-size: cover;
width:${props=>props.w}px;
min-height:${props=>props.h}px;
display:flex;
align-items: center;
justify-content: center;
align-self: center;
text-align: center;
cursor: pointer;
user-select: none;
${props=>props.css};
`

export const Button = ({children, onClick, wide = false, dot=false, css, size=1}) => {
  const width = dot && wide ? 54*size : dot ? 27*size : 164*size
  const height = wide ? 54*size : 27*size;
  const bg = () => {
    if(wide && dot)
      return wbtnd
    else if(wide)
      return wbtn
    else if(dot)
      return btnd
    else
      return btn

  }
  return (
    <Div bg={bg} w={width} h={height} css={css} onClick={onClick}>{children}</Div>
  )
}
