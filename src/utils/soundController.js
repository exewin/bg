import m1 from '../assets/sounds/campfire.mp3'
import m2 from '../assets/sounds/village.mp3'
import m3 from '../assets/sounds/blacksmith.mp3' // eslint-disable-line
import m4 from '../assets/sounds/blacksmith.mp3' // eslint-disable-line

import s1 from '../assets/sounds/punch.mp3'
import s2 from '../assets/sounds/blow.mp3'
import s3 from '../assets/sounds/shield.mp3'
import s4 from '../assets/sounds/heal.mp3'
import s5 from '../assets/sounds/buff.mp3'
import s6 from '../assets/sounds/fireball.mp3'
import s7 from '../assets/sounds/leach.mp3'

const mArr = [m1, m2, m3, m4]
const sArr = [s1, s2, s3, s4, s5, s6, s7]

const musicArr = []
mArr.forEach(m => musicArr.push(new Audio(m)))

const soundArr = []
sArr.forEach(s => soundArr.push(new Audio(s)))

export const stopAll = () => {
  musicArr.forEach(m => {
    m.pause()
  })
}

export const playMusic = async (i) => {
  stopAll()
  musicArr[i].loop = true
  await musicArr[i].play()
}

export const playSound = async (i) => {
  soundArr[i].pause()
  soundArr[i].currentTime = 0
  await soundArr[i].play()
}
