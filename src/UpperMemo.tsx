import React, { useState } from 'react'

const Upper = React.memo(({ children }: { children: string }): JSX.Element => {
  const [count, setCount] = useState(0)
  console.log('rendering', children)

  // when we click on the button, React will rerender because the state changes
  return (
    <div>
      Uppercase version: {children.toUpperCase()}
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  )
})

const UpperMemo = () => {
  const [first, setFirstName] = useState('')
  const [last, setLastName] = useState('')
  return (
    <div>
      <label htmlFor="first-name-input">First Name</label>
      <input
        id="first-name-input"
        onChange={(e) => setFirstName(e.target.value)}
      />
      <Upper>{first}</Upper>
      <hr />
      <label htmlFor="last-name-input">Last Name</label>
      <input
        id="last-name-input"
        onChange={(e) => setLastName(e.target.value)}
      />
      <Upper>{last}</Upper>
    </div>
  )
}

export default UpperMemo
