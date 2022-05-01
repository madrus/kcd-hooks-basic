/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react'
import { it, describe, expect, vi } from 'vitest'
import { Counter } from '../Counter'

describe('<Counter />', () => {
  afterEach(() => {
    window.localStorage.removeItem('count')
  })

  it('should increment the count', () => {
    const { container } = render(<Counter />)
    const button = container.firstChild as Element
    expect(button?.textContent).toBe('0')
    fireEvent.click(button)
    expect(button?.textContent).toBe('1')
  })

  it('should read and write localStorage', () => {
    window.localStorage.setItem('count', '3')
    const { container } = render(<Counter />)
    const button = container.firstChild as Element
    expect(button?.textContent).toBe('3')
    fireEvent.click(button)
    expect(button?.textContent).toBe('4')
    expect(window.localStorage.getItem('count')).toBe('4')
  })
})
