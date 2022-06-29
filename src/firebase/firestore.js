import {collection, doc, getDoc, getDocs, getFirestore, onSnapshot, setDoc, Timestamp} from "firebase/firestore"
import { AddPoint } from "../logic/AddPoint"
import { levelUp } from "../logic/CharacterLevelUp"
import { taskTimes } from "../logic/TaskLogic"

const firestore = getFirestore()

export const userExistsDB = async (uid) => {
    console.log("user exists?")
    const dbDoc = await getDoc(doc(firestore, `users/${uid}`))
    if(dbDoc.exists()){
        return true
    }
    else return false
}

export const createCharacterDB = async (uid, character) => {
    console.log("create character")
    const query = await getDocs(collection(firestore, `character_start_variables`))
    let obj = {}
    query.forEach((doc) => {
        obj = {[doc.id]: doc.data(), ...obj}
    })
    const newCharacter = {
        information: character,
        ...obj
    }
    await setMissions(newCharacter)
    await setDoc(doc(firestore, `users/${uid}`), newCharacter, {merge:true})
}

export const getUserInfoDB = async (uid) => {
    console.log("get user info")
    const dbDoc = await getDoc(doc(firestore, `users/${uid}`))
    if(dbDoc.exists()){
        const docData = dbDoc.data()
        return docData
    }
    else return null
}   

export const currentTimeDB = async() => {
    let date = new Date()
    await fetch("http://worldtimeapi.org/api/timezone/Europe/Warsaw")
    .then(response=>response.json())
    .then(data=>date=new Date(data.utc_datetime))
    return date.valueOf()/1000
}

export const startTaskDB = async(uid, taskId, type) => {
    console.log("start task")
    const character = await getDoc(doc(firestore, `users/${uid}`))
    const characterData = character.data() 

    if(characterData.progress.busy) return "You are already doing other task."

    let task
    let taskData
    if(type === "work"){
        task = await getDoc(doc(firestore, `works/${taskId}`))
        taskData = task.data()
    }
    else if(type === "mission")
        taskData = Object.values(characterData.missions)[taskId]
    else return "type error"

    const addToTimestamp = Timestamp.now().toDate()
    addToTimestamp.setSeconds(addToTimestamp.getSeconds() + taskData.time);
    characterData.progress.taskEnd = Timestamp.fromDate(addToTimestamp)
    characterData.progress.taskStart = Timestamp.now().toDate()
    characterData.progress.busy = true
    characterData.progress.task = taskData
    characterData.progress.task.type = type

    await setDoc(doc(firestore, `users/${uid}`), characterData, {merge:true})
}

export const endTaskDB = async(uid) => {
    console.log("end task")
    const character = await getDoc(doc(firestore, `users/${uid}`))
    const characterData = character.data()

    const {timeLeft} = await taskTimes(characterData)
    if(timeLeft > 0) return "You haven't finished task yet."

    characterData.progress.taskEnd = null
    characterData.progress.taskStart = null
    characterData.stats.money += characterData.progress.task.gold
    characterData.stats.xp += characterData.progress.task.xp
    characterData.progress.busy = false
    characterData.progress.task = null
    levelUp(characterData)
    await setMissions(characterData)
    await setDoc(doc(firestore, `users/${uid}`), characterData, {merge:true})
}

export const addMissionDB = (mission, id) => {
    console.log("add mission", id, mission)
    setDoc(doc(firestore, `missions`, id), mission, {merge:true})
}

const setMissions = async(character) => {
    console.log("set Missions")
    let shuffledMissions
    const query = await getDocs(collection(firestore, `missions`))
    query.forEach((doc) => {
        shuffledMissions = {
            [doc.id]: doc.data(),
            ...shuffledMissions
        }
    })
    shuffledMissions = Object.values(shuffledMissions)
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    
    character.missions = {
        0: shuffledMissions[0],
        1: shuffledMissions[1],
        2: shuffledMissions[2],
    }
}


export const addStatDB = async (uid, name) => {
    console.log("add stat")
    const character = await getDoc(doc(firestore, `users/${uid}`))
    let characterData = character.data() 
    characterData = AddPoint(characterData, name)
    if(characterData)
        await setDoc(doc(firestore, `users/${uid}`), characterData, {merge:true})
    else
        return "error"
}

let subscription;

export const listenToCharacterChange = (uid, setCharacter) => {
    subscription = onSnapshot(doc(firestore, `users/${uid}`), (docSnapshot) => {
        if(docSnapshot.exists()) {
            const docData = docSnapshot.data()
            setCharacter(docData)
        }
    })
}

export const cancelListenToCharacterChange = () => subscription()