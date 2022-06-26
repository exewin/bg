import React, { useState } from 'react'
import styled from 'styled-components'
import { Background } from '../../../components/Background'
import { Bar } from '../../../components/Bar'
import { MissionBox } from '../../../components/MissionBox'
import { useCharacter } from '../../../contexts/CharacterContext'
import { useTime } from '../../../hooks/useTime'
import { taskTimes } from '../../../logic/TaskLogic'
import { bgs } from '../../../utils/backgroundController'

const Main = styled.main` 
color:white;
display:flex;
align-items: center;
flex-flow: column;
font-family: 'Joan', serif;
width:100%;
height: 100%;
`

const Title = styled.h1``
const Grid = styled.div` 
display:grid;
grid-template-columns: 1fr 1fr 1fr;`


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
    <Background img={bgs[0]}>
      {
        character?.progress?.busy === false ? 
        <Main>
          <Title>Select mission that suits you the most</Title>
          <Grid>
          {character.missions && Object.keys(character.missions).map((keyName, i) => (
            <>
              <MissionBox 
                key={i} 
                name={character?.missions[keyName].name} 
                description={character?.missions[keyName].description} 
                xp={character?.missions[keyName].xp} 
                gold={character?.missions[keyName].gold} 
                click={()=>startTask(`${keyName}`, "mission")}
              />
            </>
          ))}
          </Grid>
        </Main>
        : 
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