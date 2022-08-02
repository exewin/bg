import i0 from '../assets/icons/skills/0.png'
import i1 from '../assets/icons/skills/1.png'
import i2 from '../assets/icons/skills/2.png'
import i3 from '../assets/icons/skills/3.png'
import i4 from '../assets/icons/skills/4.png'
import i5 from '../assets/icons/skills/5.png'
import i6 from '../assets/icons/skills/6.png'

export const getSkill = (id) => {
  switch (id) {
    case (0):{
      return {
        name: 'Attack',
        message: 'attack',
        timer: 1000,
        ready: true,
        start: false,
        icon: i0
      }
    }
    case (1):{
      return {
        name: 'Powerful blow',
        message: 'blow',
        timer: 2500,
        ready: true,
        start: false,
        icon: i1
      }
    }
    case (2):{
      return {
        name: 'Shield',
        message: 'shield',
        timer: 4000,
        ready: true,
        start: false,
        icon: i2
      }
    }
    case (3):{
      return {
        name: 'Heal',
        message: 'heal',
        timer: 3500,
        ready: true,
        start: false,
        icon: i3
      }
    }
    case (4):{
      return {
        name: 'Blessing',
        message: 'blessing',
        timer: 4000,
        ready: true,
        start: false,
        icon: i4
      }
    }
    case (5):{
      return {
        name: 'Fireball',
        message: 'fireball',
        timer: 4000,
        ready: true,
        start: false,
        icon: i5
      }
    }
    case (6):{
      return {
        name: 'Life Leach',
        message: 'leach',
        timer: 4000,
        ready: true,
        start: false,
        icon: i6
      }
    }
  }
}
