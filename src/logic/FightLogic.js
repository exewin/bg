import { calculateStats } from './CalculateStats'
import { getSkill } from './Skills'

const maxHpCalc = (endurance, level) => {
  console.log(endurance)
  return Math.round(10 + level * 10 + endurance * 5)
}

const dmgCalc = (stat, level) => {
  return Math.round(1 + level * 0.33 + stat * 0.5)
}

const healCalc = (stat, level) => {
  return Math.round(5 + level * 0.33 + stat * 0.4)
}

export const fightCharacter = (character, charClass, target) => {
  const addedStats = calculateStats(character)
  const sharedProps = {
    maxHp: maxHpCalc(addedStats.endurance, character.stats.level),
    hp: maxHpCalc(addedStats.endurance, character.stats.level),
    dead: false,
    target,
    ready: true,
    start: false,
    skillSet: [getSkill(0)],
    dmg: dmgCalc(addedStats.strength, character.stats.level)
  }

  const specificProps = (character, charClass) => {
    switch (charClass) {
      case ('warrior'):{
        return {
          dmg: dmgCalc(addedStats.strength, character.stats.level),
          skillSet: [getSkill(0), getSkill(1), getSkill(2)]
        }
      }
      case ('paladin'):{
        return {
          dmg: dmgCalc(addedStats.strength, character.stats.level),
          heal: healCalc(addedStats.wisdom, character.stats.level),
          skillSet: [getSkill(0), getSkill(3), getSkill(4)]
        }
      }
      case ('mage'):{
        return {
          dmg: dmgCalc(addedStats.wisdom, character.stats.level),
          heal: healCalc(addedStats.strength / 2 + addedStats.wisdom / 3.25, character.stats.level),
          skillSet: [getSkill(0), getSkill(5), getSkill(6)]
        }
      }
      default:{ return {} }
    }
  }

  const classSpecificProps = specificProps(character, charClass)

  return {
    ...sharedProps,
    ...classSpecificProps
  }
}
