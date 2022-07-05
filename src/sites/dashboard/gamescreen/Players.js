import React, { useState } from 'react'
import styled from 'styled-components'
import { Background } from '../../../components/Background'
import { Button } from '../../../components/Button'
import { bgs } from '../../../utils/backgroundController'

const Input = styled.input` 
height:23px;
`

const Container = styled.div` 
`
const Wrapper = styled.div` 
display:flex;
gap: 3px;
justify-content: center;
`

export const Players = () => {

    const [playerInput, setPlayerInput] = useState("")
    const [playerInfo, setPlayerInfo] = useState(null)

  return (
    <Background img={bgs[2]}>
        <Container>
            <Wrapper>
                <Input
                    onChange={(e)=>setPlayerInput(e.target.value)} 
                    value={playerInput}
                    placeholder="find player..." 
                    type="input"
                />
                <Button>Find</Button>
            </Wrapper>
        </Container>
    </Background>
  )
}
