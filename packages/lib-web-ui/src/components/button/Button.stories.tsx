import type { Meta, StoryObj } from '@storybook/react'
import { FiArrowRight, FiSettings } from 'react-icons/fi'

import { Button, type ButtonProps } from './Button'

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    controls: { expanded: true },
    layout: 'centered'
  },
  args: {
    children: 'CTA Button',
    variant: 'primary',
    size: 'md'
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'outline'],
      control: { type: 'radio' }
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'inline-radio' }
    }
  }
}

export default meta

type Story = StoryObj<ButtonProps>

export const Primary: Story = {}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary action'
  }
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline action'
  }
}

export const WithIcons: Story = {
  args: {
    leadingIcon: <FiSettings aria-hidden />,
    trailingIcon: <FiArrowRight aria-hidden />,
    children: 'Manage settings'
  }
}

export const Loading: Story = {
  args: {
    loading: true
  }
}
