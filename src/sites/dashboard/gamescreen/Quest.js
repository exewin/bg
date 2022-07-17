import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Background } from '../../../components/Background'
import { InventoryWarning } from '../../../components/InventoryWarning'
import { useCharacter } from '../../../contexts/CharacterContext'
import { inventoryFull } from '../../../logic/ItemEquipping'
import { bgs } from '../../../utils/backgroundController'
import { specialParse } from '../../../utils/descriptionParse'
import { MissionBox } from '../../../components/MissionBox'
import { FightScreen } from '../../../components/FightScreen'
import store from '../../../logic/redux/store'
import { Provider } from 'react-redux'


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



export const Quest = () => {

    const {startTask, character, endTask, cancelTask} = useCharacter()

    const [questStarted, setQuestStarted] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        if(character.stats.level < 3){
            navigate("..")
        }
    },[character])

  return (
    <Background img={character?.progress?.task?.type==="quest" ? bgs[0] : bgs[6]}>
      {
        character?.progress?.busy === false ? 
        questStarted ?
          <Main>
            <Provider store={store}>
              <FightScreen character={character}/>
            </Provider>
          </Main>
        :
        <Main>
          <Title>Lord has quest for you</Title>
          {inventoryFull(character) && <InventoryWarning/>}

          <MissionBox
            scale={1.2} 
            epic
            name={character?.quest?.name}
            description={specialParse(character?.quest?.desc, character)}
            xp={character?.quest?.xp} 
            gold={character?.quest?.gold} 
            click={()=>setQuestStarted(true)}
          >Embark</MissionBox>
        </Main>
        : 
        <Main>
          <Title>You are doing other task</Title>  
        </Main>
        }
    </Background>
  )
}
