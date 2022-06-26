export const AddPoint = (characterData, name) =>{
    console.log(characterData)
    switch(name){
        case "strength":
            if(characterData.stats.money < characterData.stats.strCost)
                return false
            characterData.stats.money-=characterData.stats.strCost
            characterData.stats.strCost+=1
            characterData.stats.strength+=1
            return characterData
        break
        case "dexterity":
            if(characterData.stats.money < characterData.stats.dexCost)
                return false
            characterData.stats.money-=characterData.stats.dexCost
            characterData.stats.dexCost+=1
            characterData.stats.dexterity+=1
            return characterData
        break
        case "endurance":
            if(characterData.stats.money < characterData.stats.endCost)
                return false
            characterData.stats.money-=characterData.stats.endCost
            characterData.stats.endCost+=1
            characterData.stats.endurance+=1
            return characterData
        break
        default:
            return false
        break
    }
}