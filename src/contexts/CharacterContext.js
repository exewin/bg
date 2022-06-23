import React, {useContext, useState, useEffect} from "react"
import { addStatDB, getUserInfoDB, startTaskDB, userExistsDB } from "../firebase"
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
        
        if(typeof response === 'object')
            return setCharacter(response)

        return setError('unknown error')
    }

    const startTask = async() => {
        const response = await startTaskDB(user.uid, "a")
        if(typeof response === 'string')
            return setError(response)
        
        if(typeof response === 'object')
            return setCharacter(response)

        return setError('unknown error')
    }

    const getInfo = () => {
        if(user?.uid)
            userExistsDB(user.uid).then(response =>{
                if(response)
                    getUserInfoDB(user.uid).then(response => setCharacter(response))
        })
    }

    return(
        <CharacterContext.Provider value={{character, addPoint, error, startTask, getInfo}}>
            {children}
        </CharacterContext.Provider>
    )
}