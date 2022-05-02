import { ChangeEventHandler, lazy, Suspense, useState } from 'react'

// React.lazy requires a default export
const Tilt = lazy(() => import('./VanillaTilt'))

const useToggle = (init = false) => {
  const [on, setOn] = useState<boolean>(init)
  const toggle: ChangeEventHandler<HTMLInputElement> = () => setOn(!on)
  return [on, toggle]
}

// Suspense should be wrapped around the component that is lazy loaded!!!
// Suspense should have a fallback value to render while loading
// We can see this if throttling our network connection in DevTools
// This is a one time issue - subsequent loading will be quick
const LazyTilt = () => {
  const [showTilt, toggleTilt] = useToggle()

  return (
    <div>
      <label>
        show tilt
        <input
          type="checkbox"
          checked={showTilt as boolean}
          onChange={toggleTilt as ChangeEventHandler<HTMLInputElement>}
        />
      </label>

      <div style={{ height: 150, width: 200 }} className="totally-centered">
        {showTilt ? (
          <Suspense fallback={<div>loading...</div>}>
            <Tilt>
              <div className="totally-centered">vanilla-tilt.js</div>
            </Tilt>
          </Suspense>
        ) : null}
      </div>
    </div>
  )
}

export default LazyTilt
