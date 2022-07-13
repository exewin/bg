import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Background } from '../../../components/Background'
import { useCharacter } from '../../../contexts/CharacterContext'
import { bgs } from '../../../utils/backgroundController'

export const Quest = () => {

    const {startTask, character, endTask, cancelTask} = useCharacter()
    const navigate = useNavigate()

    useEffect(()=>{
        if(character.stats.level < 3){
            navigate("..")
        }
    })

  return (
    <Background img={character?.progress?.task?.type==="quest" ? bgs[0] : bgs[4]}>

    </Background>
  )
}
