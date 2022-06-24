import React from 'react'
import { CenteredLoading } from '../../../components/CenteredLoading'
import { Portrait } from '../../../components/Portrait'
import {AddBox} from '@mui/icons-material';
import styled from 'styled-components'
import { Background } from '../../../components/Background'
import Bonfire from "../../../assets/bgs/Bonfire.jpg"
import { useCharacter } from '../../../contexts/CharacterContext'
import { Bar } from '../../../components/Bar';

const AddButton = styled.button` 
`

const StatGrid = styled.div` 
display: grid;
grid-template-columns: 5em 5em 3em;
font-family: 'Joan', serif;
color: white;
text-shadow: 1px 1px black;
`


export const Character = () => {

    const {character, addPoint, error} = useCharacter()

    return (
        <>
            {character ? <Background img={Bonfire}>
                <Portrait index={character?.information?.portrait} charClass={character?.information?.charClass} name={character?.information?.name}/>
                <Bar value={character?.stats?.xp} maxValue={character?.stats?.maxXp} />
                <StatGrid>
                    <div>Strength:</div> <div>{character?.stats?.strength} </div>
                    <AddButton 
                        disabled={character?.stats?.money<character?.stats?.strCost}
                        onClick={()=>addPoint("strength")} 
                        title={`cost: ${character?.stats?.strCost}`}
                    >
                        <AddBox/>
                    </AddButton>
                    <div>Dexterity:</div> <div>{character?.stats?.dexterity} </div>
                    <AddButton 
                        disabled={character?.stats?.money<character?.stats?.dexCost}
                        onClick={()=>addPoint("dexterity")} 
                        title={`cost: ${character?.stats?.dexCost}`}
                    >
                        <AddBox/>
                    </AddButton>
                    <div>Endurance:</div> <div>{character?.stats?.endurance} </div>
                    <AddButton 
                        disabled={character?.stats?.money<character?.stats?.endCost}
                        onClick={()=>addPoint("endurance")} 
                        title={`cost: ${character?.stats?.endCost}`}
                    >
                        <AddBox/>
                    </AddButton>
                </StatGrid>
                <div>Gold: {character?.stats?.money}</div>
                {error}
            </Background> : <CenteredLoading/> 
            }
        </>
    )
}
