import React from 'react'
import styled from 'styled-components'


const Div = styled.div` 
border: 3px solid #709;
background-color: #82a;
border-radius: 5px;
width: 200px;
position: relative;
height: 22px;
margin-bottom: 5px;
`

const Filled = styled.div` 
background: rgb(131,58,180);
background: linear-gradient(90deg, rgba(131,58,180,1) 45%, rgba(161,48,198,1) 85%);
width: ${props=>`${props.length}px`};
height: 22px;
position: absolute;
`

const Text = styled.div`
position: absolute;
width: 200px;
text-align: center;
color: #eee;
text-shadow: 1px 1px #a4a;
font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
user-select: none;
`

export const Bar = ({value, maxValue,length=200, }) => {

    const bar = value/maxValue*length

  return (
    <Div>
        <Filled length={bar}/>
        <Text>{`${value} / ${maxValue}`}</Text>
    </Div>
  )
}
