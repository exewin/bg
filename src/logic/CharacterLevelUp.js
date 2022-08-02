export const levelUp = (character) => {
  if (!character) return 'error'
  if (character.stats.xp >= character.stats.maxXp) {
    console.log('character level up')
    character.stats.xp -= character.stats.maxXp
    character.stats.level += 1
    character.stats.maxXp = (character.stats.level * 1000)
    levelUp(character)
  } else {
    return null
  }
}
