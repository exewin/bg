import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { Background } from '../../../components/Background'
import { Button } from '../../../components/Button'
import { bgs } from '../../../utils/backgroundController'
import { findUserByNameDB } from '../../../firebase/firestore'
import { capitalizeWord } from '../../../utils/capitalizeWord'
import { Portrait } from '../../../components/Portrait'
import { Bar } from '../../../components/Bar'
import { StatRow } from '../../../components/StatRow'
import { useNavigate, useParams } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { Slot } from '../../../components/Slot'
import { calculateStats } from '../../../logic/CalculateStats'

const Input = styled.input` 
height:23px;
`

const CharacterInfo = styled.div`
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

const Inventory = styled.div` 
display:grid;
grid-template-columns: 64px 64px 64px;
grid-template-rows: 64px 64px 64px;
`

const Equipment = styled.div` 
display: grid;
grid-template-columns: 96px 96px 96px;
grid-template-rows: 96px 96px 96px 96px;
`

const cssSnippet = css`
display:flex;
flex-wrap: wrap;
gap: 10px;
`

export const Players = () => {
  const [playerInput, setPlayerInput] = useState('')
  const [character, setCharacter] = useState(null)
  const navigate = useNavigate()
  const { name } = useParams()
  const [error, setError] = useState()

  const { strength, endurance, wisdom } = character ? calculateStats(character) : { strength: 1, endurance: 1, wisdom: 1 }

  useEffect(() => {
    if (name) {
      findPlayer(null, name)
    }
  }, [])

  const findPlayer = async (e, name = playerInput) => {
    e && e.preventDefault()
    const response = await findUserByNameDB(name)
    if (response) {
      const data = response.data
      setCharacter(data)
    } else { setError('Error. Make sure the name is correct.') }
  }

  const redirectToMail = () => {
    navigate(`../mail/${character?.information?.name}`)
  }

  return (
        <Background img={bgs[7]} css={cssSnippet}>
                {character && <>
                <CharacterInfo>
                    <Portrait
                            index={character?.information?.portrait}
                            charClass={character?.information?.charClass}
                            name={character?.information?.name}
                            level={character?.stats?.level}
                        />
                    <Bar value={character?.stats?.xp} maxValue={character?.stats?.maxXp}> {`${character?.stats?.xp}/${character?.stats?.maxXp}`}</Bar>
                    <StatGrid>
                        <StatRow
                            name={'strength'}
                            buffed={strength && strength !== character?.stats?.strength && [character?.stats?.strength, strength - character?.stats?.strength]}
                            stat={strength && strength}
                        />
                        <StatRow
                            name={'wisdom'}
                            buffed={wisdom && wisdom !== character?.stats?.wisdom && [character?.stats?.wisdom, wisdom - character?.stats?.wisdom]}
                            stat={wisdom && wisdom}
                        />
                        <StatRow
                            name={'endurance'}
                            buffed={endurance && endurance !== character?.stats?.endurance && [character?.stats?.endurance, endurance - character?.stats?.endurance]}
                            stat={endurance && endurance}
                        />
                    </StatGrid>

                    <Button css={{ color: 'white', fontFamily: 'Joan, serif' }} onClick={redirectToMail}>Send letter</Button>

                </CharacterInfo>

                <Equipment>
                    {
                        ['Head', 'Weapon', 'Chest', 'Gloves', 'Legs', 'Boots'].map((i, id) => {
                          return <Slot type={i} key={nanoid()} id={id} item={character?.equipped[id]}/>
                        })
                    }
                </Equipment>

                <Inventory>
                    {
                        [0, 1, 2, 3, 4, 5, 6, 7, 8].map((i, id) => {
                          return <Slot id={id} key={nanoid()} item={character?.items[id]}/>
                        })
                    }
                </Inventory>

                </>}
                <form onSubmit={findPlayer}>
                    <Wrapper>
                        <Input
                            onChange={(e) => setPlayerInput(capitalizeWord(e.target.value))}
                            value={playerInput}
                            placeholder="find player..."
                            type="input"
                        />
                        <Button css={{ color: 'white', fontFamily: 'Joan, serif' }} type="submit" onClick={findPlayer}>Find</Button>
                    </Wrapper>
                    {error && error}
                </form>
        </Background>
  )
}
