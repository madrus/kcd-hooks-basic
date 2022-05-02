import { FC, useState, useRef, useEffect } from 'react'

const Stopwatch: FC = () => {
  const [lapse, setLapse] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // we use this to prevent memory leak when the component is unmounted
    return () => clearInterval(intervalRef.current as NodeJS.Timeout)
  }, [])

  const handleRunClick = () => {
    if (running) {
      clearInterval(intervalRef.current as NodeJS.Timeout)
    } else {
      const startTime = Date.now() - lapse
      intervalRef.current = setInterval(() => {
        setLapse(Date.now() - startTime)
      }, 0) // call the function a.s.a.p.
    }
    setRunning(!running)
  }

  const handleClearClick = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout)
    setLapse(0)
    setRunning(false)
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <label
        style={{
          fontSize: '5em',
          display: 'block'
        }}
      >
        {lapse}
        ms
      </label>
      <button onClick={handleRunClick} style={buttonStyles}>
        {running ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleClearClick} style={buttonStyles}>
        Clear
      </button>
    </div>
  )
}

const buttonStyles = {
  border: '1px solid #ccc',
  background: '#fff',
  fontSize: '2em',
  padding: 15,
  margin: 5,
  width: 200
}

export default Stopwatch
