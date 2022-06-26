import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import backgroundImage from "../../../assets/bgs/Redsky.jpg"
import { Background } from '../../../components/Background'
import { Bar } from '../../../components/Bar'
import { CenteredLoading } from '../../../components/CenteredLoading'
import { useCharacter } from '../../../contexts/CharacterContext'
import { useTime } from '../../../hooks/useTime'
import { taskTimes } from '../../../logic/TaskLogic'

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


export const Mission = () => {
  
  const [timeLeft, setTimeLeft] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const {startTask, character, endTask} = useCharacter()
  const time = useTime(1000) //force slow rerender
  

  if(character?.progress?.busy)
    taskTimes(character).then(response=>{
      setTimeLeft(response.timeLeft)
      setEndTime(response.endTime)
  })

  return (
    <Background img={backgroundImage}>
      {
        character?.progress?.busy === false ? <button onClick={()=>startTask("0", "mission")}>Start mission</button> : 
          character?.progress?.task?.type==="mission" ?
            timeLeft > 0 ?
              <Main>
                <Title>You are currently on mission...</Title>
                {character?.progress?.task.name} 
                <Bar 
                  value={time ? character?.progress?.taskEnd?.seconds - time : 0} 
                  maxValue={time ? character?.progress?.taskEnd?.seconds - character?.progress?.taskStart?.seconds : 1}
                  lengthPx={800}
                  css={{marginTop: 'auto'}}
                >
                  {time ? `${timeLeft} (${endTime})` : "..."}
                </Bar>
              </Main>
            :
              <Main>
                <Title>You have finished your mission.</Title>
                {character?.progress?.task.name} 
                <button onClick={endTask}>Claim reward</button>
              </Main>
          :
          <Main>
            <Title>You are doing other task</Title>    
          </Main>
        }
    </Background>
  )
}