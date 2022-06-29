import React from 'react'
import styled from 'styled-components'

const Div = styled.div` 
height: 5vh;
display:flex;
align-items: center;
justify-content: center;
gap: 25px;
color:gray;
padding: 0px 5px;
`

export const Footer = () => {
  return (
    <Div>
        <span>Copyright © 2022 all rights reserved</span>
        <a href="https://github.com/exewin">Author</a>
    </Div>
  )
}
