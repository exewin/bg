import React from 'react'
import { addMissionDB, addQuestsDB, addItemsDB } from '../firebase/firestore'
import { missions } from '../firebase/missionTemplate'
import { quests } from '../firebase/questTemplate'
import { items } from '../firebase/itemTemplate'

export const Injector = () => {
  const injectMission = () => addMissionDB(missions[0], '4') // eslint-disable-line
  const injectItems = () => addItemsDB(items) // eslint-disable-line
  const injectQuests = () => addQuestsDB(quests)
  return (
        <button onClick={injectQuests}>inject</button>
  )
}
