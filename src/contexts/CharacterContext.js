import React, {useContext, useState} from "react"
import { addStatDB, endTaskDB, startTaskDB } from "../firebase/firestore"
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

    const endTask = async() => {
        const response = await endTaskDB(user.uid)
        if(typeof response === 'string')
            return setError(response)
    }

    return(
        <CharacterContext.Provider value={{character, addPoint, error, startTask, setCharacter, endTask}}>
            {children}
        </CharacterContext.Provider>
    )
}