/**
 * @vitest-environment jsdom
 */
import { fireEvent, render } from '@testing-library/react'
import { it, describe, expect, vi } from 'vitest'
import { Counter } from '../Counter'

describe('<Counter />', () => {
  it('should increment the count', () => {
    const { container } = render(<Counter />)
    const button = container.firstChild as Element
    expect(button?.textContent).toBe('0')
    fireEvent.click(button)
    expect(button?.textContent).toBe('1')
  })
})
