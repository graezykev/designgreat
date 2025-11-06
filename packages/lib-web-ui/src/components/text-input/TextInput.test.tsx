import { render, screen } from '@testing-library/react'

import { TextInput } from './TextInput'

describe('TextInput', () => {
  it('associates label with the input', () => {
    render(<TextInput label="Email" name="email" />)

    const input = screen.getByLabelText('Email')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('name', 'email')
  })

  it('renders helper description when provided', () => {
    render(
      <TextInput
        label="Email"
        description="We will never share your address."
        placeholder="you@example.com"
      />
    )

    const description = screen.getByText(/never share/i)
    expect(description).toBeInTheDocument()
    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-describedby', description.id)
  })

  it('marks invalid when error message is present', () => {
    render(<TextInput label="Email" errorMessage="Required" />)

    const input = screen.getByLabelText('Email')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByText('Required')).toBeInTheDocument()
  })
})
