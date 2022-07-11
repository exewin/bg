import React, { useState } from 'react'
import { CenteredLoading } from '../../../components/CenteredLoading'
import { Portrait } from '../../../components/Portrait'
import styled, {css} from 'styled-components'
import { Background } from '../../../components/Background'
import { useCharacter } from '../../../contexts/CharacterContext'
import { Bar } from '../../../components/Bar'
import { bgs } from '../../../utils/backgroundController'
import bag from "../../../assets/icons/bag.png"
import { StatRow } from '../../../components/StatRow'
import { Slot } from '../../../components/Slot'
import { calculateStats } from '../../../logic/CalculateStats'
import { equipItem as tryEquip } from '../../../logic/ItemEquipping'
import { DiscardArea } from '../../../components/DiscardArea'
import { nanoid } from 'nanoid'

const CharacterInfo = styled.div`
`

const StatGrid = styled.div` 
display: grid;
grid-template-rows: 1fr 1fr 1fr;
font-family: 'Joan', serif;
color: white;
gap:5px;
text-shadow: 1px 1px black;
`

const Detail = styled.div` 
display:grid;
grid-template-columns: 70px 50px 48px 50px;
align-items: center;
`

const Number = styled.span` 
color:white;
font-family: 'Zen Kaku Gothic New', sans-serif;
text-align: right;
padding-right: 2px;
`

const Img = styled.img` 
width:${props=>props.w}px;
`

const InventoryAndDiscard = styled.div` 
display:flex;
flex-direction: column;
gap: 20px;
`

const Inventory = styled.div` 
display:grid;
grid-template-columns: 64px 64px 64px;
grid-template-rows: 64px 64px 64px;
`

const Equipment = styled.div` 
display: grid;
grid-template-columns: 96px 96px 96px;
grid-template-rows: 96px 96px 96px 96px;
`

const cssSnippet = css`
display:flex;
flex-wrap: wrap;
gap: 10px;
`


export const Character = () => {

    const {character, addPoint, equipItem, unequipItem, discardItem} = useCharacter()
    const [hover, setHover] = useState(false)
    const {strength, endurance, wisdom} = calculateStats(character)

    return (
        <>
            {character ? <Background img={bgs[2]} css={cssSnippet}>
                <CharacterInfo>
                    <Portrait 
                        index={character?.information?.portrait} 
                        charClass={character?.information?.charClass} 
                        name={character?.information?.name}
                        level={character?.stats?.level}
                    />
                    <Bar value={character?.stats?.xp} maxValue={character?.stats?.maxXp}> {`${character?.stats?.xp}/${character?.stats?.maxXp}`}</Bar>
                    <StatGrid>

                        <StatRow 
                            name={"strength"}
                            buffed={strength !== character?.stats?.strength && [character?.stats?.strength, strength - character?.stats?.strength]}
                            stat={strength} 
                            cost={character?.stats?.strCost} 
                            money={character?.stats?.money} 
                            hover={hover} 
                            setHover={setHover} 
                            addPoint={addPoint}
                        />
                        <StatRow 
                            name={"wisdom"}
                            buffed={wisdom !== character?.stats?.wisdom && [character?.stats?.wisdom, wisdom - character?.stats?.wisdom]}
                            stat={wisdom} 
                            cost={character?.stats?.wisCost} 
                            money={character?.stats?.money} 
                            hover={hover} 
                            setHover={setHover} 
                            addPoint={addPoint}
                        />
                        <StatRow 
                            name={"endurance"}
                            buffed={endurance !== character?.stats?.endurance && [character?.stats?.endurance, endurance - character?.stats?.endurance]}
                            stat={endurance} 
                            cost={character?.stats?.endCost} 
                            money={character?.stats?.money} 
                            hover={hover} 
                            setHover={setHover} 
                            addPoint={addPoint}
                        />

                    </StatGrid>
                    <Detail><Img src={bag} w={32}/> <Number>{character?.stats?.money}</Number></Detail>
                </CharacterInfo>

                <Equipment>
                    {
                        ["Head","Weapon","Chest","Gloves","Legs","Boots"].map((i,id) => {
                            return <Slot type={i} key={nanoid()} interactable={unequipItem} id={id} item={character?.equipped[id]}/>
                        })
                    }
                </Equipment>

                <InventoryAndDiscard>
                    <Inventory>
                        {
                            [0,1,2,3,4,5,6,7,8].map((i,id) => {
                                return <Slot interactable={equipItem} id={id} key={nanoid()} item={character?.items[id]} tryEquip={tryEquip} character={character}/>
                            })
                        }
                    </Inventory>
                    <DiscardArea discardItem={discardItem}/>
                </InventoryAndDiscard>

            </Background> : <CenteredLoading/> 
            }
        </>
    )
}
