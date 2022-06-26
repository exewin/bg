import m1 from "../assets/sounds/music1.mp3"
import m2 from "../assets/sounds/music2.mp3"
import m3 from "../assets/sounds/music3.mp3"
import m4 from "../assets/sounds/music4.mp3"
const mArr = [m1,m2,m3,m4]


const musicArr = []
mArr.forEach(m=>musicArr.push(new Audio(m)))

const stopAll = () => {
    musicArr.forEach(m=>{
        //m.load()
        m.pause()
    })
}

export const playSound = async(i) => {
    stopAll()
    await musicArr[i].play()
}

