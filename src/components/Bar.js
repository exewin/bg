import React from 'react'
import styled from 'styled-components'


const Div = styled.div` 
border: 3px solid #709;
background-color: #82a;
border-radius: 5px;
width: ${props=>`${props.length}px`};
height: 22px;
margin-bottom: 5px;
${props=>props.css};
`

const Filled = styled.div` 
background: rgb(231,58,180);
width: ${props=>`${props.length}px`};
height: 22px;
position: absolute;
`

const Text = styled.div`
position: absolute;
width: ${props=>`${props.length}px`};
text-align: center;
color: #eee;
text-shadow: 1px 1px #a4a;
font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
user-select: none;
`

export const Bar = ({value, maxValue, lengthPx=200, css, children}) => {

    const bar = value/maxValue*lengthPx

  return (
    <Div length={lengthPx} css={css}>
        <Filled length={bar}/>
        <Text length={lengthPx}>{children}</Text>
    </Div>
  )
}