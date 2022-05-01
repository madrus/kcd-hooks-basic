import { useState } from 'react'

export const useCounter = ({
  initialState,
  step
}: {
  initialState: number
  step: number
}) => {
  const [count, setCount] = useState<number>(initialState)
  const increment = () => setCount(count + step)
  return { count, increment }
}

export const Counter = () => {
  const { count, increment } = useCounter({ initialState: 2, step: 3 })
  return <button onClick={increment}>{count}</button>
}
