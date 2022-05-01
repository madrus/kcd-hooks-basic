import { useEffect, useState } from 'react'

export const Counter = () => {
  // making initialCount a function ensures that it runs only once the very first time!!!
  const initialCount = () => Number(window.localStorage.getItem('count')) || 0
  const [count, setCount] = useState<number>(initialCount)
  const increment = () => setCount(count + 1)
  useEffect(() => {
    window.localStorage.setItem('count', String(count))
  }, [count])

  return <button onClick={increment}>{count}</button>
}
