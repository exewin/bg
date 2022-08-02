export const AddPoint = (characterData, name) => {
  console.log(characterData)
  switch (name) {
    case 'strength':
      if (characterData.stats.money < characterData.stats.strCost) { return false }
      characterData.stats.money -= characterData.stats.strCost
      characterData.stats.strCost += 1
      characterData.stats.strength += 1
      return characterData

    case 'wisdom':
      if (characterData.stats.money < characterData.stats.wisCost) { return false }
      characterData.stats.money -= characterData.stats.wisCost
      characterData.stats.wisCost += 1
      characterData.stats.wisdom += 1
      return characterData

    case 'endurance':
      if (characterData.stats.money < characterData.stats.endCost) { return false }
      characterData.stats.money -= characterData.stats.endCost
      characterData.stats.endCost += 1
      characterData.stats.endurance += 1
      return characterData

    default:
      return false
  }
}
