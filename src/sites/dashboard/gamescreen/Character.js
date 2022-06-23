import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../contexts/AuthContext'
import { CenteredLoading } from '../../../components/CenteredLoading'
import { Portrait } from '../../../components/Portrait'
import { addStatDB, getUserInfoDB, userExistsDB } from '../../../firebase'
import {AddBox} from '@mui/icons-material';
import styled from 'styled-components'
import { Xpbar } from '../../../components/Xpbar'
import { Background } from '../../../components/Background'
import Bonfire from "../../../assets/bgs/Bonfire.jpg"
import { useCharacter } from '../../../contexts/CharacterContext'

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
                <Xpbar xp={character?.stats?.xp} maxXp={character?.stats?.maxXp} />
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
