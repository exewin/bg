import React, {useContext, useState} from "react"
import { addStatDB, cancelTaskDB, deleteMailDB, endTaskDB, equipItemDB, startTaskDB, unequipItemDB } from "../firebase/firestore"
import { useAuth } from "./AuthContext"

const CharacterContext = React.createContext()

export const useCharacter = () => {
    return useContext(CharacterContext)
}

export const CharacterProvider = ({children}) => {

    const [character, setCharacter] = useState({})
    const [error, setError] = useState("")
    const {user} = useAuth()

    const addPoint = async (statName) => {
        const response = await addStatDB(user.uid, statName)
        if(typeof response === 'string')
            return setError(response)
    }

    const startTask = async(taskId, type, option) => {
        const response = await startTaskDB(user.uid, taskId, type, option)
        if(typeof response === 'string')
            return setError(response)
    }

    const deleteMail = async(id) => {
        const response = await deleteMailDB(user.uid, id)
        if(typeof response === 'string')
            return setError(response)
    }

    const cancelTask = async() => {
        const response = await cancelTaskDB(user.uid)
        if(typeof response === 'string')
            return setError(response)
    }

    const endTask = async() => {
        const response = await endTaskDB(user.uid)
        if(typeof response === 'string')
            return setError(response)
    }

    const equipItem = async(itemIndex, slotToPlaceIndex = null) => {
        const response = await equipItemDB(user.uid, itemIndex, slotToPlaceIndex)
        if(typeof response === 'string')
            return setError(response)
    }

    const unequipItem = async(itemIndex) => {
        const response = await unequipItemDB(user.uid, itemIndex)
        if(typeof response === 'string')
            return setError(response)
    }

    const clearError = () => setError("")

    return(
        <CharacterContext.Provider value={{
            character, 
            setCharacter, 
            addPoint, 
            error, 
            clearError, 
            startTask, 
            cancelTask, 
            endTask, 
            deleteMail, 
            equipItem, 
            unequipItem
        }}>
            {children}
        </CharacterContext.Provider>
    )
}