import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState<number>(0)
  const increment = () => setCount(count + 1)

  return <button onClick={increment}>{count}</button>
}
