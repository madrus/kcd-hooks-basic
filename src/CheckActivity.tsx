import { FC, useEffect, useState } from 'react'
import createActivityDetector from 'activity-detector'

const useIdle = (options: { timeToIdle: number }) => {
  const [isIdle, setIsIdle] = useState<boolean>(false)
  useEffect(() => {
    const activityDetector = createActivityDetector(options)
    activityDetector.on('idle', () => setIsIdle(true))
    activityDetector.on('active', () => setIsIdle(false))
    return () => activityDetector.stop()
  }, [])
  return isIdle
}

export const CheckActivity: FC = () => {
  const isIdle = useIdle({ timeToIdle: 1000 })
  return <div>{isIdle ? 'Are you still there?' : 'Hello there!'}</div>
}
