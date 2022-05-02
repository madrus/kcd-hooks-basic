import { LegacyRef, ReactNode, useEffect, useRef } from 'react'
import VanillaTilt, { HTMLVanillaTiltElement } from 'vanilla-tilt'
import './VanillaTilt.css'

const Tilt = ({ children }: { children: ReactNode }) => {
  const tiltRef = useRef<HTMLVanillaTiltElement>(null)
  useEffect(() => {
    VanillaTilt.init(tiltRef.current as HTMLElement, {
      max: 25,
      speed: 400,
      glare: true,
      'max-glare': 0.5
    })
    return () => tiltRef?.current?.vanillaTilt.destroy()
  }, [])

  return (
    <div
      ref={tiltRef as unknown as LegacyRef<HTMLDivElement>}
      className="tilt-root"
    >
      <div className="tilt-child">{children}</div>
    </div>
  )
}

export const Usage = () => (
  <div className="totally-centered">
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  </div>
)
