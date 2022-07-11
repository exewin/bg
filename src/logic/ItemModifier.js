export const itemModifier = (item, character) => {

    const levelModifier = 1+((character.stats.level-1)/9)

    const boostStats = (multiply = 1, add = 0) => {
        item.strength = Math.round(item.strength * multiply + add)
        item.wisdom = Math.round(item.wisdom * multiply + add)
        item.endurance = Math.round(item.endurance * multiply + add)
    }

    boostStats(levelModifier)

    const random = Math.floor(Math.random() * 100)
    if(random>=99){
        item.name = `${item.name} +5`
        boostStats(3, 4)
    } else if(random>=94){
        item.name = `${item.name} +4`
        boostStats(2, 3)
    } else if(random>=85){
        item.name = `${item.name} +3`
        boostStats(1.5, 2)
    } else if(random>=74){
        item.name = `${item.name} +2`
        boostStats(1.3, 1)
    } else if(random>=55){
        item.name = `${item.name} +1`
        boostStats(1.25, 0.4)
    }

    return item

}

