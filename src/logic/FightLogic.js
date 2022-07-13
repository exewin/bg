export const maxHpCalc = (endurance, level) => {
    return Math.round(10 + level*10 + endurance*5)
}

export const dmgCalc = (stat, level) => {
    return Math.round(1 + level*0.33 + stat)
}