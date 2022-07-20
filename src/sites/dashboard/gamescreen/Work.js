import React, { useState } from 'react'
import styled from 'styled-components'
import { Background } from '../../../components/Background'
import { Bar } from '../../../components/Bar'
import { useCharacter } from '../../../contexts/CharacterContext'
import { useTime } from '../../../hooks/useTime'
import { bgs } from '../../../utils/backgroundController'
import { taskTimes } from '../../../logic/TaskLogic'
import { Button } from '../../../components/Button'

const Slider = styled.input` 
`

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
  const {startTask, character, endTask, cancelTask} = useCharacter()
  const time = useTime(1000) //force slow rerender

  const [hours, setHours] = useState (1)


  if(character?.progress?.busy)
    taskTimes(character).then(response=>{
      setTimeLeft(response.timeLeft)
      setEndTime(response.endTime)
  })

  return (
    <Background img={bgs[1]}>
      {
        character?.progress?.busy === false ? 
          <Main>
            <Slider
              type="range"
              id="slider"
              min="1"
              max="10"
              onChange={(e)=>setHours(e.target.value)}
              value={hours}
            />
            minutes: {hours}
            <Button wide onClick={()=>startTask("0", "work", hours)}>Start working in blacksmith</Button> 
          </Main>
        : 
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
                <Button onClick={cancelTask}>Cancel task</Button>
              </Main>
            :
              <Main>
                <Title>You have finished your work.</Title>
                {character?.progress?.task.name} 
                <Button onClick={endTask}>Claim reward</Button>
              </Main>
          :
          <Main>
            <Title>You are doing other task</Title>  
          </Main> 
        }
    </Background>
  )
}
