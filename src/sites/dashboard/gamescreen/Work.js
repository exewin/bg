import React from 'react'
import styled from 'styled-components'
import backgroundImage from "../../../assets/bgs/Blacksmith.jpg"
import { Background } from '../../../components/Background'
import { Bar } from '../../../components/Bar'
import { useCharacter } from '../../../contexts/CharacterContext'
import { useTime } from '../../../hooks/useTime'
import { CenteredLoading } from "../../../components/CenteredLoading"

const Main = styled.main` 
color:white;
display:flex;
align-items: center;
flex-flow: column;
font-family: 'Joan', serif;
width:100%;
height: 100%;
`

const Title = styled.h1`
`

export const Work = () => {

  const time = useTime(1000)
  const {startTask, character, endTask} = useCharacter()
  const timeLeft = time ? Math.ceil(character?.progress?.taskEnd?.seconds - time) : 0
  const endTime = new Date(character?.progress?.taskEnd?.toDate()).toLocaleTimeString('en-us', {})
  const displayEndTime = endTime

  return (
    <Background img={backgroundImage}>
      {timeLeft !== 0 ?
        character?.progress?.busy === false ? <button onClick={()=>startTask("0", "work")}>Start working in blacksmith</button> : 
          character?.progress?.task?.type==="work" ?
            timeLeft > 0 ?
              <Main>
                <Title>You are currently working...</Title>
                {character?.progress?.task.name} 
                <Bar 
                  value={time ? character?.progress?.taskEnd?.seconds - time : 0} 
                  maxValue={time ? character?.progress?.taskEnd?.seconds - character?.progress?.taskStart?.seconds : 1}
                  lengthPx={800}
                  css={{marginTop: 'auto'}}
                >
                  {time ? `${timeLeft} (${displayEndTime})` : "..."}
                </Bar>
              </Main>
            :
              <Main>
                <Title>You have finished your work.</Title>
                {character?.progress?.task.name} 
                <button onClick={endTask}>Claim reward</button>
              </Main>
          :
          <Main>
            <Title>You are doing other task</Title>    
          </Main> 
        :
          <CenteredLoading/>
        }
    </Background>
  )
}
