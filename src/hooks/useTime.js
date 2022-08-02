import { useEffect, useState } from 'react'
import { currentTimeDB } from '../firebase/firestore'

export const useTime = (refresh) => {
  const [time, setTime] = useState(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      currentTimeDB().then(setTime)
      return clearTimeout(timer)
    }, refresh)
  }, [time])

  return time
}
