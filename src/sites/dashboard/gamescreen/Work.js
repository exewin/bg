import React, { useState } from 'react'
import styled from 'styled-components'
import { Background } from '../../../components/Background'
import { Bar } from '../../../components/Bar'
import { useCharacter } from '../../../contexts/CharacterContext'
import { useTime } from '../../../hooks/useTime'
import { CenteredLoading } from "../../../components/CenteredLoading"
import { bgs } from '../../../utils/backgroundController'
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
color:yellow;
text-shadow: 1px 1px black;
`

export const Work = () => {

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
    <Background img={bgs[1]}>
      {
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
                  {time ? `${timeLeft} (${endTime})` : "..."}
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
        }
    </Background>
  )
}
