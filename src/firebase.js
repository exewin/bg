import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {collection, doc, getDoc, getDocs, getFirestore, serverTimestamp, setDoc, Timestamp} from "firebase/firestore"

const app = initializeApp({
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
})

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


        // const dbDoc = await getDoc(doc(firestore, `configuration/timestamp test`))
        // const docData = dbDoc.data()
        // await setDoc(doc(firestore, `configuration/timestamp test`), {ne: serverTimestamp()}, {merge:true})
        // console.log(docData.t1-docData.t2)       

export const currentTimeDB = async() => {
    let date = new Date()
    await fetch("http://worldtimeapi.org/api/timezone/Europe/Warsaw").
    then(response=>response.json()).
    then(data=>date=new Date(data.utc_datetime))
    return date.valueOf()/1000
}

export const startTaskDB = async(uid, taskId) => {
    console.log("start task")
    const character = await getDoc(doc(firestore, `users/${uid}`))
    const characterData = character.data() 

    if(characterData.progress.busy) return "You are already doing other task."

    const task = await getDoc(doc(firestore, `missions/${taskId}`))
    const taskData = task.data()

    const addToTimestamp = Timestamp.now().toDate()
    addToTimestamp.setSeconds(addToTimestamp.getSeconds() + taskData.time);
    characterData.progress.taskEnd = Timestamp.fromDate(addToTimestamp)
    characterData.progress.taskStart = Timestamp.now().toDate()
    characterData.progress.busy = true
    characterData.progress.task = task.data()

    await setDoc(doc(firestore, `users/${uid}`), characterData, {merge:true})
    return getUserInfoDB(uid)
}

export const endTaskDB = async(uid) => {
    console.log("end task")
    const character = await getDoc(doc(firestore, `users/${uid}`))
    const characterData = character.data()
    characterData.progress.taskEnd = null
    characterData.progress.taskStart = null
    characterData.progress.busy = false
    characterData.progress.task = null
}


export const addStatDB = async (uid, name) => {
    console.log("add stat")
    const character = await getDoc(doc(firestore, `users/${uid}`))
    const characterData = character.data() 
    switch(name){
        case "strength":
            if(characterData.stats.money < characterData.stats.strCost)
                return "Not enough money"
            characterData.stats.money-=characterData.stats.strCost
            characterData.stats.strCost+=1
            characterData.stats.strength+=1
        break;
        case "dexterity":
            if(characterData.stats.money < characterData.stats.dexCost)
                return "Not enough money"
            characterData.stats.money-=characterData.stats.dexCost
            characterData.stats.dexCost+=1
            characterData.stats.dexterity+=1
        break;
        case "endurance":
            if(characterData.stats.money < characterData.stats.endCost)
                return "Not enough money"
            characterData.stats.money-=characterData.stats.endCost
            characterData.stats.endCost+=1
            characterData.stats.endurance+=1
        break;
        default:
            return "Unknown error"
    }
    await setDoc(doc(firestore, `users/${uid}`), characterData, {merge:true})
    return getUserInfoDB(uid)
}

export const auth = getAuth(app)
export {app}