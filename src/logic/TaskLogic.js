import { currentTimeDB } from "../firebase/firestore"

export const taskTimes = async(character) => {

    const time = await currentTimeDB()
    const timeLeft = time ? Math.ceil(character?.progress?.taskEnd?.seconds - time) : 0
    const endTime = new Date(character?.progress?.taskEnd?.toDate()).toLocaleTimeString('en-us', {})
    return {timeLeft, endTime, time}

}