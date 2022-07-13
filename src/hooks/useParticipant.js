import { useState } from 'react'
import { dmgCalc, maxHpCalc } from '../logic/FightLogic'

export const useParticipant = (stats, className) => {

    const maxHp = maxHpCalc(stats.endurance, stats.level)
    const dmg = dmgCalc(stats.strength, stats.level)
    const [hp, setHp] = useState(maxHp)
    const [dead, setDead] = useState(false)

    const injury = (dmg) => {
        setHp(prev=>prev-dmg)
        if(hp < 1) setDead(true)
    }

    const actionAttack = (otherParticipant) => {
        otherParticipant.injury(dmg)
    }

    const participant = {
        maxHp,
        hp,
        dead,
        injury,
        dmg,
        actionAttack
    }

    return participant

}