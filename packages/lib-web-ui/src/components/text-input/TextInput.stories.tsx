import type { Meta, StoryObj } from '@storybook/react'
import { FiMail, FiUser } from 'react-icons/fi'

import { TextInput, type TextInputProps } from './TextInput'

const meta: Meta<TextInputProps> = {
  title: 'Components/TextInput',
  component: TextInput,
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    size: 'md'
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'inline-radio' }
    }
  }
}

export default meta

type Story = StoryObj<TextInputProps>

export const Default: Story = {}

export const WithDescription: Story = {
  args: {
    description: 'We use this to send important account updates.'
  }
}

export const WithError: Story = {
  args: {
    errorMessage: 'Please enter a valid email address.'
  }
}

export const WithSuccess: Story = {
  args: {
    validationState: 'success',
    description: 'Looks good!'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true,
    description: 'Disabled inputs cannot be edited.'
  }
}

export const WithIcons: Story = {
  args: {
    leadingIcon: <FiUser aria-hidden />,
    trailingIcon: <FiMail aria-hidden />,
    placeholder: 'name@example.com'
  }
}
