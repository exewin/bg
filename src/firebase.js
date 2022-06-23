import {initializeApp} from "firebase/app"
import {getAuth} from "firebase/auth"
import {doc, getDoc, getFirestore, setDoc} from "firebase/firestore"

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
    const dbDoc = await getDoc(doc(firestore, `users/${uid}`))
    if(dbDoc.exists()){
        return true
    }
    else return false
}

export const createCharacterDB = async (uid, character) => {
    const characterBase = await getDoc(doc(firestore, `configuration/character`))
    const data = characterBase.data()
    const newCharacter = {
        information: character,
        stats: data,
    }
    console.log(newCharacter)
    await setDoc(doc(firestore, `users/${uid}`), newCharacter, {merge:true})
}

export const getUserInfoDB = async (uid) => {
    const dbDoc = await getDoc(doc(firestore, `users/${uid}`))
    if(dbDoc.exists()){
        const docData = dbDoc.data()
        return docData
    }
    else return null
}

export const addStatDB = async (uid, name) => {
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