import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../AuthContext'
import { CenteredLoading } from '../../../components/CenteredLoading'
import { Portrait } from '../../../components/Portrait'
import { addStatDB, getUserInfoDB, userExistsDB } from '../../../firebase'
import {AddBox} from '@mui/icons-material';
import styled from 'styled-components'
import { Xpbar } from '../../../components/Xpbar'

const AddButton = styled.button` 
`

const StatGrid = styled.div` 
display: grid;
grid-template-columns: 5em 5em 3em;
font-family: 'Joan', serif;
`


export const Character = () => {
    const [character, setCharacter] = useState(null)
    const [error, setError] = useState("")
    const {user} = useAuth()

    console.log(character)

    useEffect(()=>{
        if(user?.uid)
            userExistsDB(user.uid).then(response =>{
                if(response)
                    getUserInfoDB(user.uid).then(response => setCharacter(response))
        })
    },[user])

    const addPoint = async (statName) => {
        const response = await addStatDB(user.uid, statName)
        if(typeof response === 'string')
            return setError(response)
        
        if(typeof response === 'object')
            return setCharacter(response)

        return setError('unknown error')
    }

    return (
        <>
            {character ? <>
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
            </> : <CenteredLoading/> 
            }
        </>
    )
}
