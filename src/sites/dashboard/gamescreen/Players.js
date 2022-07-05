import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Background } from '../../../components/Background'
import { Button } from '../../../components/Button'
import { bgs } from '../../../utils/backgroundController'
import {findUserByNameDB} from "../../../firebase/firestore"
import {capitalizeWord} from "../../../utils/capitalizeWord"
import { Portrait } from '../../../components/Portrait'
import { Bar } from '../../../components/Bar'
import { StatRow } from '../../../components/StatRow'
import {useNavigate, useParams} from 'react-router-dom'

const Input = styled.input` 
height:23px;
`

const Container = styled.div` 
height:80vh;
`
const Wrapper = styled.div` 
display:flex;
gap: 3px;
justify-content: center;
`
const StatGrid = styled.div` 
display: grid;
grid-template-rows: 1fr 1fr 1fr;
font-family: 'Joan', serif;
color: white;
gap:5px;
text-shadow: 1px 1px black;
`

export const Players = () => {

    const [playerInput, setPlayerInput] = useState("")
    const [character, setCharacter] = useState(null)
    const navigate = useNavigate()
    const { name } = useParams()
    const [error, setError] = useState()

    useEffect(()=>{
        if(name){
            findPlayer(null, name)
        }
    },[])

    const findPlayer = async(e, name = playerInput) => {
        e && e.preventDefault()
        const response = await findUserByNameDB(name)
        if(response){
            const data = response.data
            setCharacter(data)
        }
        else
            setError("Error. Make sure the name is correct.")

    }

    const redirectToMail = () => {
        navigate(`../mail/${character?.information?.name}`)
    }


    return (
        <Background img={bgs[2]}>
            <Container>
                {character && <>
                <Portrait 
                        index={character?.information?.portrait} 
                        charClass={character?.information?.charClass} 
                        name={character?.information?.name}
                        level={character?.stats?.level}
                    />
                <Bar value={character?.stats?.xp} maxValue={character?.stats?.maxXp}> {`${character?.stats?.xp}/${character?.stats?.maxXp}`}</Bar>
                <StatGrid>
                    <StatRow 
                        name={"strength"}
                        stat={character?.stats?.strength} 
                    />
                    <StatRow 
                        name={"dexterity"}
                        stat={character?.stats?.dexterity} 
                    />
                    <StatRow 
                        name={"endurance"}
                        stat={character?.stats?.endurance} 
                    />
                </StatGrid>

                <Button onClick={redirectToMail}>Send letter</Button>

                </>}
            </Container>
                <form onSubmit={findPlayer}>
                    <Wrapper>
                        <Input
                            onChange={(e)=>setPlayerInput(capitalizeWord(e.target.value))} 
                            value={playerInput}
                            placeholder="find player..." 
                            type="input"
                        />
                        <Button type="submit" onClick={findPlayer}>Find</Button>
                    </Wrapper>
                    {error && error}
                </form>
            
        </Background>
    )
}
