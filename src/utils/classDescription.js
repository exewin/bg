export const classDescs = (charClass) => {
    switch(charClass){
        case "warrior":{
            return "Naturally gifted with using melee weapons. Warriors are brave and they do not fear combat."
        }
        case "paladin":{
            return "Hybrid between knight and cleric. Combines courage and prudence to become excellent soldier."
        }
        case "mage":{
            return "Incredibly smart, but dangerous. Can use magic of any kind. Knowledge is power."
        }
        default:{
            return "error"
        }
    }
}
