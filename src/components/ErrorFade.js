import React from 'react'
import styled from 'styled-components'
import { useCharacter } from '../contexts/CharacterContext'
import { Box } from './Box'
import { Button } from './Button'

const Bg = styled.div` 
position:absolute;
width:100%;
height: 100%;
background-color: rgba(4,4,4,0.6);
display:flex;
align-items: center;
justify-content: center;
`

const Title = styled.h1`
text-shadow: 1px 1px black;
`


export const ErrorFade = () => {

    const {error, clearError} = useCharacter()

  return (
    error ? <Bg>
        <Box>
            <Title>server error</Title>
            {error}
            <Button onClick={clearError}>Ok</Button>
        </Box>
    </Bg> : <></>
  )
}
