import React, { useState } from 'react'
import { CenteredLoading } from '../../../components/CenteredLoading'
import { Portrait } from '../../../components/Portrait'
import styled from 'styled-components'
import { Background } from '../../../components/Background'
import { useCharacter } from '../../../contexts/CharacterContext'
import { Bar } from '../../../components/Bar'
import { bgs } from '../../../utils/backgroundController'
import bag from "../../../assets/icons/bag.png"
import { StatRow } from '../../../components/StatRow'
import { Slot } from '../../../components/Slot'


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

const Inventory = styled.div` 

`


export const Character = () => {

    const {character, addPoint} = useCharacter()
    const [hover, setHover] = useState(false)

    return (
        <>
            {character ? <Background img={bgs[2]}>
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
                        stat={character?.stats?.strength} 
                        cost={character?.stats?.strCost} 
                        money={character?.stats?.money} 
                        hover={hover} 
                        setHover={setHover} 
                        addPoint={addPoint}
                    />
                    <StatRow 
                        name={"wisdom"}
                        stat={character?.stats?.wisdom} 
                        cost={character?.stats?.wisCost} 
                        money={character?.stats?.money} 
                        hover={hover} 
                        setHover={setHover} 
                        addPoint={addPoint}
                    />
                    <StatRow 
                        name={"endurance"}
                        stat={character?.stats?.endurance} 
                        cost={character?.stats?.endCost} 
                        money={character?.stats?.money} 
                        hover={hover} 
                        setHover={setHover} 
                        addPoint={addPoint}
                    />

                </StatGrid>
                <Detail><Img src={bag} w={32}/> <Number>{character?.stats?.money}</Number></Detail>
                <Inventory>
                    <Slot item={character?.items[0]}/>
                    <Slot item={character?.items[1]}/>
                </Inventory>
            </Background> : <CenteredLoading/> 
            }
        </>
    )
}
