import React from 'react'
import styled from 'styled-components'
import { useParticipant } from '../hooks/useParticipant'
import { Bar } from './Bar'
import { Portrait } from './Portrait'
import { Button } from "./Button"

const Container = styled.div` 
display:grid;
grid-template-columns: 1fr 1fr;
gap: 5px;
`

const Character = styled.div` 

`

export const FightScreen = ({character}) => {

    const player = useParticipant(character?.stats, character?.information?.charClass)
    const enemy = useParticipant(character?.quest?.enemy, character?.quest.enemy?.charClass, player)


  return (
    <Container>
        <Character>
            <Portrait 
                index={character?.information?.portrait} 
                charClass={character?.information?.charClass} 
                name={character?.information?.name}
                level={character?.stats?.level}
            />
            <Bar value={player.hp} maxValue={player.maxHp}>{`${player.hp}/${player.maxHp}`}</Bar>
            {
            player.skills.map((skill, id)=>{
                return(
                    skill.cooldown ? <Button onClick={()=>player.button(id, enemy)}>{skill.name}</Button> : <Button>Wait</Button>
                )
            })
            }
            
        </Character>
        <Character>
            <Portrait 
                index={character?.quest?.enemy?.portrait} 
                name={character?.quest?.enemy?.name}
                charClass={character?.quest?.enemy?.charClass} 
                level={character?.quest?.enemy?.level}
            />
            <Bar value={enemy.hp} maxValue={enemy.maxHp}>{`${enemy.hp}/${enemy.maxHp}`}</Bar>
        </Character>
    </Container>
  )
}
