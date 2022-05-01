import { useState } from 'react'

export const Counter = () => {
  const [count, setCount] = useState<number>(0)

  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
