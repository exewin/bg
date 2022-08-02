import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { startTimer, endTimer, endGlobalTimer, startGlobalTimer } from '../logic/redux/slice'

export const Cooldown = ({ id = null, playerId }) => {
  const GLOBAL_TIMER = 750

  const state = useSelector((state) => state.characters.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id === null) {
      dispatch(startGlobalTimer({ playerId }))
      setTimeout(() => {
        dispatch(endGlobalTimer({ playerId }))
      }, GLOBAL_TIMER)
    } else {
      if (state[playerId].skillSet[id].ready) return
      if (state[playerId].skillSet[id].start) return
      dispatch(startTimer({ id, playerId }))
      setTimeout(() => {
        dispatch(endTimer({ id, playerId }))
      }, state[playerId].skillSet[id].timer)
    }
  }, [])
  return (
    <span/>
  )
}
