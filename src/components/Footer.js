import React from 'react'
import styled from 'styled-components'

const Div = styled.div` 
background-color: antiquewhite;
height: 5vh;
display:flex;
align-items: center;
justify-content: right;
gap: 15px;
padding: 0px 5px;
`

export const Footer = () => {
  return (
    <Div>
        <span>Bgam</span>
        <span>2022</span>
        <a href="https://github.com/exewin">Author</a>
    </Div>
  )
}
