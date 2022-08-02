import { createSlice } from '@reduxjs/toolkit'
import { playSound } from '../../utils/soundController'

export const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    value: []
  },
  reducers: {
    resetState: (state) => {
      state.value = []
    },
    createCharacter: (state, action) => {
      state.value.push(action.payload)
    },
    endTimer: (state, action) => {
      const self = state.value[action.payload.playerId]
      const skill = self.skillSet[action.payload.id]
      skill.ready = true
      skill.start = false
    },
    startTimer: (state, action) => {
      const self = state.value[action.payload.playerId]
      const skill = self.skillSet[action.payload.id]
      skill.start = true
    },
    startGlobalTimer: (state, action) => {
      const self = state.value[action.payload.playerId]
      self.start = true
    },
    endGlobalTimer: (state, action) => {
      const self = state.value[action.payload.playerId]
      self.ready = true
      self.start = true
    },
    triggerSkill: (state, action) => {
      const self = state.value[action.payload.target]
      const target = state.value[self.target]
      const usedSkill = self.skillSet[action.payload.id]
      switch (usedSkill.message) {
        case ('attack'):{
          setHp(target, self, -self.dmg)
          playSound(0)
          break
        }
        case ('blow'):{
          setHp(target, self, -self.dmg * 2)
          playSound(1)
          break
        }
        case ('shield'):{
          self.shield = true
          playSound(2)
          break
        }
        case ('heal'):{
          setHp(self, self, self.heal * 2)
          playSound(3)
          break
        }
        case ('blessing'):{
          if (self?.buff) { self.buff += 0.14 } else { self.buff = 1.14 }

          playSound(4)
          break
        }
        case ('fireball'):{
          setHp(target, self, -self.dmg * 2)
          playSound(5)
          break
        }
        case ('leach'):{
          setHp(target, self, -self.dmg)
          setHp(self, self, self.heal)
          playSound(6)
          break
        }
      }
      self.ready = false
      usedSkill.ready = false
    }
  }
})

const shieldCheck = (target) => {
  if (target?.shield) {
    target.shield = false
    return true
  }
  return false
}

const setHp = (target, self, modifier) => {
  const shdchk = modifier < 0 ? shieldCheck(target) : false
  const buff = self?.buff ? self.buff : 1
  if (!shdchk) {
    target.hp += Math.round(modifier * buff)
    if (target.hp < 1) {
      target.dead = true
    } else if (target.hp > target.maxHp) {
      target.hp = target.maxHp
    }
  }
}

export const { createCharacter, resetState, triggerSkill, startTimer, endTimer, endGlobalTimer, startGlobalTimer } = charactersSlice.actions
export default charactersSlice.reducer
