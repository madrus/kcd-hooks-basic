import { FC, useEffect, useReducer, useRef } from 'react'

type StopwatchState = {
  lapse?: number
  running?: boolean
}

const reducer = (currentState: StopwatchState, newState: StopwatchState) => ({
  ...currentState,
  ...newState
})

const useStopwatch = () => {
  // we rename here dispatch to setState to make our intention clearer
  const [{ running, lapse }, setState] = useReducer(reducer, {
    lapse: 0,
    running: false
  })
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // we use this to prevent memory leak when the component is unmounted
    return () => clearInterval(intervalRef.current as NodeJS.Timeout)
  }, [])

  const handleRunClick = () => {
    if (running) {
      clearInterval(intervalRef.current as NodeJS.Timeout)
    } else {
      const startTime = Date.now() - lapse!
      intervalRef.current = setInterval(() => {
        setState({ lapse: Date.now() - startTime })
      }, 0) // call the function a.s.a.p.
    }
    setState({ running: !running })
  }

  const handleClearClick = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout)
    setState({ lapse: 0, running: false })
  }

  return {
    handleClearClick,
    handleRunClick,
    lapse,
    running
  }
}

const Stopwatch: FC = () => {
  const stopwatchOne = useStopwatch()
  const stopwatchTwo = useStopwatch()

  return (
    <div style={{ textAlign: 'center' }}>
      <label
        style={{
          fontSize: '5em',
          display: 'block'
        }}
      >
        {stopwatchOne.lapse}
        ms
      </label>
      <button onClick={stopwatchOne.handleRunClick} style={buttonStyles}>
        {stopwatchOne.running ? 'Stop' : 'Start'}
      </button>
      <button onClick={stopwatchOne.handleClearClick} style={buttonStyles}>
        Clear
      </button>
      <hr />
      <strong>Lapse Difference:</strong>
      <span>{stopwatchOne.lapse! - stopwatchTwo.lapse!}ms</span>
      <hr />
      <label
        style={{
          fontSize: '5em',
          display: 'block'
        }}
      >
        {stopwatchTwo.lapse}
        ms
      </label>
      <button onClick={stopwatchTwo.handleRunClick} style={buttonStyles}>
        {stopwatchTwo.running ? 'Stop' : 'Start'}
      </button>
      <button onClick={stopwatchTwo.handleClearClick} style={buttonStyles}>
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
