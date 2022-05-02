import { FC, useEffect, useReducer, useRef } from 'react'

type StopwatchState = {
  lapse: number
  running: boolean
}
type StopwatchAction = {
  type: 'LAPSE' | 'TOGGLE_RUNNING' | 'CLEAR'
  now?: number
  startTime?: number
  running?: boolean
}

function reducer(state: StopwatchState, action: StopwatchAction) {
  switch (action.type) {
    case 'LAPSE':
      return {
        ...state,
        lapse: action.now! - action.startTime!
      }
    case 'TOGGLE_RUNNING':
      return {
        ...state,
        running: !state.running!
      }
    case 'CLEAR':
      return {
        ...state,
        lapse: 0,
        running: false
      }
    default:
      return state
  }
}

const Stopwatch: FC = () => {
  const [{ running, lapse }, dispatch] = useReducer(reducer, {
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
      const startTime = Date.now() - lapse
      intervalRef.current = setInterval(() => {
        dispatch({ type: 'LAPSE', now: Date.now(), startTime })
      }, 0) // call the function a.s.a.p.
    }
    dispatch({ type: 'TOGGLE_RUNNING' })
  }

  const handleClearClick = () => {
    clearInterval(intervalRef.current as NodeJS.Timeout)
    dispatch({ type: 'CLEAR' })
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
