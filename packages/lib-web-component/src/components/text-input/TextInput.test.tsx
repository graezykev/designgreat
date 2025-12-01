import { render, screen } from '@testing-library/react'
import { createRef } from 'react'

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

  it('shows optional indicator and honors provided id', () => {
    render(<TextInput optional id="company" label="Company" />)

    const input = screen.getByLabelText(/^Company/)
    expect(input).toHaveAttribute('id', 'company')
    expect(screen.getByText('Optional')).toBeInTheDocument()
  })

  it('concatenates description and error ids for aria-describedby', () => {
    render(
      <TextInput label="Username" description="3-16 characters" errorMessage="Already taken" />
    )

    const description = screen.getByText(/3-16/)
    const error = screen.getByText('Already taken')
    const input = screen.getByLabelText('Username')

    expect(input).toHaveAttribute('aria-describedby', `${description.id} ${error.id}`)
  })

  it('renders leading and trailing icons with padding adjustments', () => {
    render(
      <TextInput
        label="Amount"
        leadingIcon={<span data-testid="leading">$</span>}
        trailingIcon={<span data-testid="trailing">USD</span>}
      />
    )

    const input = screen.getByLabelText('Amount')
    expect(input).toHaveClass('dg-text-input__field--has-leading')
    expect(input).toHaveClass('dg-text-input__field--has-trailing')
    expect(screen.getByTestId('leading').parentElement).toHaveClass(
      'dg-text-input__icon',
      'dg-text-input__icon--leading'
    )
    expect(screen.getByTestId('trailing').parentElement).toHaveClass(
      'dg-text-input__icon',
      'dg-text-input__icon--trailing'
    )
  })

  it('respects validation state prop and disabled styling', () => {
    render(<TextInput disabled label="Budget" validationState="success" />)

    const input = screen.getByLabelText('Budget')
    expect(input).not.toHaveAttribute('aria-invalid')
    expect(input).toBeDisabled()
  })

  it('forwards refs to the underlying input element', () => {
    const ref = createRef<HTMLInputElement>()
    render(<TextInput ref={ref} label="Full name" />)

    expect(ref.current).toBe(screen.getByLabelText('Full name'))
  })
})
