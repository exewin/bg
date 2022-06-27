import React from 'react'
import { addMissionDB } from '../firebase/firestore'
import { missions } from '../firebase/missionTemplate'

export const MissionInjector = () => {

    const injectMission = () =>{
        addMissionDB(missions[0],"3")
    }

    return (
        <button onClick={injectMission}>inject</button>
    )
}
