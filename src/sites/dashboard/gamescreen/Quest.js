import React, { useEffect } from 'react'
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
import { resetState } from '../../../logic/redux/slice'
import { useDispatch } from 'react-redux'
import { MiniTooltip } from '../../../components/MiniTooltip'

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
display: flex;
`

export const Quest = () => {
  const { startTask, character } = useCharacter()
  const navigate = useNavigate()

  useEffect(() => {
    if (character.stats.level < 3) {
      navigate('..')
    }
  }, [character])
  const dispatch = useDispatch()

  useEffect(() => {
    if (character?.progress?.busy === false) {
      dispatch(resetState())
    }
  }, [character])

  const titleDesc = "Quests are special tasks, harder than regular missions. As soon as you click 'embark' button you will be put against opponent who will instantly start attacking you."

  return (
    <Background img={character?.progress?.task?.type === 'quest' ? bgs[0] : bgs[6]}>
      {
        character?.progress?.busy === false
          ? <Main>
          <Title>Lord has quest for you<MiniTooltip text={titleDesc}/></Title>
          {inventoryFull(character) && <InventoryWarning/>}
          <MissionBox
            scale={1.2}
            epic
            name={character?.quest?.name}
            description={specialParse(character?.quest?.desc, character)}
            xp={character?.quest?.xp}
            gold={character?.quest?.gold}
            click={() => startTask(null, 'quest')}
          >Embark</MissionBox>
        </Main>
          : character?.progress?.task?.type === 'quest'
            ? <Main>
              <FightScreen character={character}/>
          </Main>
            : <Main>
          <Title>You are doing other task</Title>
        </Main>
        }
    </Background>
  )
}
