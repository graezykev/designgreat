import { fireEvent, render, screen } from '@testing-library/react'

import { Button } from './Button'

describe('Button', () => {
  it('renders the provided label', () => {
    render(<Button>Submit</Button>)

    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  it('calls onClick when pressed', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button', { name: /click me/i }))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('disables interaction when loading', () => {
    const handleClick = jest.fn()
    render(
      <Button loading onClick={handleClick}>
        Save
      </Button>
    )

    const button = screen.getByRole('button', { name: /save/i })
    expect(button).toBeDisabled()
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
    expect(button).toHaveAttribute('aria-busy', 'true')
  })

  it('applies full width styles when requested', () => {
    render(<Button fullWidth>Download</Button>)

    expect(screen.getByRole('button', { name: /download/i })).toHaveClass('w-full')
  })
})
