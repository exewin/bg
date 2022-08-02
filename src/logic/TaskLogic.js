import { currentTimeDB } from '../firebase/firestore'
import { levelUp } from './CharacterLevelUp'

export const taskTimes = async (character) => {
  const time = await currentTimeDB()
  const timeLeft = time ? Math.ceil(character?.progress?.taskEnd?.seconds - time) : 0
  const endTime = new Date(character?.progress?.taskEnd?.toDate()).toLocaleTimeString('en-us', {})
  return { timeLeft, endTime, time }
}

export const startTask = async (characterData, taskData, type, option, start, end) => {
  characterData.progress.taskEnd = end
  characterData.progress.taskStart = start
  characterData.progress.busy = true
  characterData.progress.task = taskData
  characterData.progress.task.type = type
  characterData.progress.task.gold *= option
}

export const endTask = async (characterData) => {
  characterData.progress.task.type === 'quest' && characterData.progress.quest++
  characterData.progress.taskEnd = null
  characterData.progress.taskStart = null
  characterData.stats.money += characterData.progress.task.gold
  characterData.stats.xp += characterData.progress.task.xp
  characterData.progress.busy = false
  characterData.progress.task = null
  levelUp(characterData)
}

export const cancelTask = async (characterData) => {
  characterData.progress.taskEnd = null
  characterData.progress.taskStart = null
  characterData.progress.busy = false
  characterData.progress.task = null
}
