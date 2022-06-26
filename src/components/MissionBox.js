import React from 'react'
import styled from 'styled-components'

const Box = styled.div` 
background: red;

`

export const MissionBox = ({description, name, gold, xp, click}) => {
  return (
    <Box>
        <h5>{name}</h5>
        <h6>{description}</h6>
        <p>Gold: {gold}</p>
        <p>Xp: {xp}</p>
        <button onClick={click}>Start Mission</button>
    </Box>
  )
}