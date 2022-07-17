import React, { useState } from 'react'
import styled from 'styled-components'
import { Background } from '../../../components/Background'
import { Bar } from '../../../components/Bar'
import { Button } from '../../../components/Button'
import { InventoryWarning } from '../../../components/InventoryWarning'
import { MissionBox } from '../../../components/MissionBox'
import { useCharacter } from '../../../contexts/CharacterContext'
import { useTime } from '../../../hooks/useTime'
import { inventoryFull } from '../../../logic/ItemEquipping'
import { taskTimes } from '../../../logic/TaskLogic'
import { bgs } from '../../../utils/backgroundController'
import { specialParse } from '../../../utils/descriptionParse'

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

const Grid = styled.div` 
display:flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
max-width: 1000px;
min-width: 300px;
max-height: 2000px;
padding:20px;
`



export const Mission = () => {
  
  const [timeLeft, setTimeLeft] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const {startTask, character, endTask, cancelTask} = useCharacter()
  const time = useTime(1000) //force slow rerender

  if(character?.progress?.busy)
    taskTimes(character).then(response=>{
      setTimeLeft(response.timeLeft)
      setEndTime(response.endTime)
  })

  const titleDesc = "Missions are easy way to gain experience, gold and items. They only require some time to finish."

  return (
    <Background img={character?.progress?.task?.type==="mission" ? bgs[0] : bgs[4]}>
      {
        character?.progress?.busy === false ? 
        <Main>
          <Title title={titleDesc}>Select mission</Title>
          {inventoryFull(character) && <InventoryWarning/>}
          <Grid>
          {character.missions && Object.keys(character.missions).map((keyName, i) => (
            
              <MissionBox 
                key={i} 
                name={character?.missions[keyName].name} 
                description={specialParse(character?.missions[keyName].description, character)} 
                xp={character?.missions[keyName].xp} 
                gold={character?.missions[keyName].gold} 
                time={character?.missions[keyName].time}
                click={()=>startTask(`${keyName}`, "mission")}
              />
            
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
                <Button onClick={cancelTask}>Cancel task</Button>
              </Main>
            :
              <Main>
                <Title>You have finished your mission.</Title>
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