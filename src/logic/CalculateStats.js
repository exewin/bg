export const calculateStats = (characterData) => {
  let total = {
    strength: characterData.stats.strength,
    endurance: characterData.stats.endurance,
    wisdom: characterData.stats.wisdom
  }
  total = characterData?.equipped ? sumObjectsByKey(...characterData.equipped, total) : total
  return total
}

const sumObjectsByKey = (...objs) => {
  const res = objs.reduce((a, b) => {
    for (const k in b) {
      if (b.hasOwnProperty(k) && typeof b[k] === 'number') { // eslint-disable-line
        a[k] = (a[k] || 0) + b[k]
      }
    }
    return a
  }, {})
  return res
}
