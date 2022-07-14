import { useEffect, useState } from "react"

export const useCooldown = (cooldownTime, action, name) => {

    const [cooldown, setCooldown] = useState(true)

    const use = (carry) => {
        if(cooldown){
            setCooldown(false)
            action(carry)
        }
    }

    useEffect(() => {
        if(!cooldown){
            const t = setTimeout(() => {
                setCooldown(true)
            }, cooldownTime)
            return () => clearTimeout(t)
        }
    }, [cooldown])

    const skill = {
        cooldown,
        use,
        name
    }
    return skill

}