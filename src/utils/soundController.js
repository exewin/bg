import m1 from "../assets/sounds/campfire.mp3"
import m2 from "../assets/sounds/village.mp3"
import m3 from "../assets/sounds/blacksmith.mp3"
import m4 from "../assets/sounds/campfire.mp3" //temp
const mArr = [m1,m2,m3,m4]


const musicArr = []
mArr.forEach(m=>musicArr.push(new Audio(m)))

export const stopAll = () => {
    musicArr.forEach(m=>{
        m.pause()
    })
}

export const playSound = async(i) => {
    stopAll()
    musicArr[i].loop = true
    await musicArr[i].play()
}

