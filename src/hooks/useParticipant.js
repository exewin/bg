import { useEffect, useState } from 'react'
import { dmgCalc, maxHpCalc } from '../logic/FightLogic'
import { useCooldown } from './useCooldown'

export const useParticipant = (stats, className, startTarget = null) => {

    const maxHp = maxHpCalc(stats.endurance, stats.level)
    const dmg = dmgCalc(stats.strength, stats.level)
    const [hp, setHp] = useState(maxHp)
    const [dead, setDead] = useState(false)
    const [target, setTarget] = useState(startTarget)

    const injury = (dmg) => {
        setHp(prev=>prev-dmg)
        if(hp < 1) setDead(true)
    }

    const actionAttack = (otherParticipant) => {
        otherParticipant.injury(dmg)
    }

    const actionHeal = () => {
        if(hp + dmg > maxHp) 
            setHp(maxHp)
        else
            setHp(hp + dmg)
    }

    //manual
    const skills = [useCooldown(1000, actionHeal, "Heal"), useCooldown(500, actionAttack, "Attack")]
    const button = (id, carry) => {
            skills[id].use(carry)
    }

    //automatic
    const [tick, setTick] = useState(0)
    useEffect(() => {
        if(target){
            const t = setTimeout(() => {
                setTick(tick + 1)
                console.log(tick)
                actionAttack(target)
            }, 2000)
            return () => clearTimeout(t)
        }
    }, [tick])

    const participant = {
        maxHp,
        hp,
        dead,
        injury,
        dmg,
        button,
        skills
    }

    return participant

}