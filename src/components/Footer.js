import React from 'react'
import styled from 'styled-components'

const Div = styled.div` 
height: 5vh;
display:flex;
align-items: center;
justify-content: center;
gap: 25px;
color:gray;
text-shadow: 1px 1px black;
padding: 0px 5px;
${props=>props.css};
font-family: 'Joan', serif;
`

const A = styled.a` 
text-decoration:none;
`

export const Footer = ({css}) => {
  return (
    <Div css={css}>
        <span>Copyright © 2022 all rights reserved</span>
        <A href="https://github.com/exewin">Author</A>
    </Div>
  )
}
