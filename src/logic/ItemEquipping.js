const ITEM_TYPES = 6

export const equipItem = async(characterData, itemIndex) => {

    if(characterData.equipped.length < ITEM_TYPES)
        fillEquipmentWillNulls(characterData)

    const index = itemTypeToIndex(characterData.items[itemIndex].slot)
    if(!index)
        return false

    characterData.equipped[index-1] = characterData.items[itemIndex]
    characterData.items = characterData.items.filter((_,idx)=>itemIndex !== idx)
    return characterData

}

const fillEquipmentWillNulls = (characterData) => {
    while(characterData.equipped.length < ITEM_TYPES){
        characterData.equipped.push(null)
    }
}

const itemTypeToIndex = (type) => {

    switch(type){
        case "Head": return 1
        case "Weapon": return 2
        case "Chest": return 3
        case "Gloves": return 4
        case "Legs": return 5
        case "Boots": return 6
        default: return false
    }
}


export const unequipItem = async(characterData, itemIndex) => {
    characterData.items.push(characterData.equipped[itemIndex])

    const index = itemTypeToIndex(characterData.equipped[itemIndex].slot)
    if(!index)
        return false

    characterData.equipped[index-1] = null
    return characterData
}