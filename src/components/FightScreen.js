import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Bar } from './Bar'
import { Portrait } from './Portrait'
import { fightCharacter } from '../logic/FightLogic'
import { CenteredLoading } from "./CenteredLoading"
import { nanoid } from 'nanoid'
import { Cooldown } from './Cooldown'
import { Icon } from './Icon'
import { useSelector, useDispatch } from 'react-redux'
import { createCharacter, triggerSkill } from '../logic/redux/slice'
import { useCharacter } from '../contexts/CharacterContext'


const Container = styled.div` 
display:grid;
grid-template-columns: 1fr 1fr;
gap: 5px;
`

const Character = styled.div``
const KeyHolder = styled.span``

export const FightScreen = ({character}) => {

    const {endTask, cancelTask} = useCharacter()

    const AI_TICK = 1000
    const state = useSelector((state) => state.characters.value)
    const dispatch = useDispatch()

    useEffect(()=>{
        const p = fightCharacter(character, character?.information?.charClass, 1)
        const e = fightCharacter(character?.quest?.enemy, character?.quest?.enemy?.charClass, 0)
        dispatch(createCharacter(p))
        dispatch(createCharacter(e))
    },[])


    
    const player = state[1]?.hp ? state[0] : null
    const enemy = state[1]?.hp ? state[1] : null
    const dataLoaded = state[1]?.hp ? true : false

    const [aiTick, setAiTick] = useState(0)
    useEffect(()=>{
        if(enemy && !enemy.dead){
            const t = setTimeout(()=>{
                if(!enemy.dead){
                    dispatch(triggerSkill({target: 1, id: 0}))
                    setAiTick(aiTick + 1)
                }
            }, AI_TICK)
            return () => clearTimeout(t)
        }
    },[aiTick, enemy])

    if(enemy?.dead){
        endTask()
    } else if(player?.dead){
        cancelTask()
    }

    return (
        dataLoaded ? 
        !enemy.dead ? 
        <Container>
            <Character>
                <Portrait 
                    index={character?.information?.portrait} 
                    charClass={character?.information?.charClass} 
                    name={`${character?.information?.name}`}
                    level={character?.stats?.level}
                />
                <Bar value={player.hp} maxValue={player.maxHp}>{`${player.hp}/${player.maxHp}`}</Bar> 
                {
                    !player.ready && <Cooldown key={nanoid()} playerId={0}/>
                }
                {
                    player.skillSet.map((skill, id)=>{
                        return skill.ready && player.ready ? 
                            <Icon key={nanoid()} selected icon={skill.icon} onClick={()=>dispatch(triggerSkill({target: 0, id}))}/>
                        :
                        <KeyHolder key={nanoid()}>
                            <Cooldown id={id} playerId={0}/>
                            <Icon icon={skill.icon}/>
                        </KeyHolder>
                        
                    })
                }

            </Character>
            <Character>
                <Portrait 
                    index={character?.quest?.enemy?.portrait} 
                    name={character?.quest?.enemy?.name}
                    charClass={character?.quest?.enemy?.charClass} 
                    level={character?.quest?.enemy?.stats?.level}
                />
                <Bar value={enemy.hp} maxValue={enemy.maxHp}>{`${enemy.hp}/${enemy.maxHp}`}</Bar> 
            </Character>
        </Container>
        :
        <div>Battle end</div>
        :
        <CenteredLoading/>
    )
}