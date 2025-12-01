import type { Meta, StoryObj } from '@storybook/react'
import { FiMail, FiUser } from 'react-icons/fi'

import { TextInput, type TextInputProps } from './TextInput'
import { withCodeDemo } from '../../storybook/CodeDemoToggle'

const TEXT_INPUT_SNIPPETS = {
  default: `import { TextInput } from '@designgreat/lib-web-component'

export function EmailField() {
  return (
    <TextInput
      label="Email address"
      placeholder="you@example.com"
      size="md"
    />
  )
}`,
  withDescription: `import { TextInput } from '@designgreat/lib-web-component'

export function EmailField() {
  return (
    <TextInput
      label="Email address"
      placeholder="you@example.com"
      description="We use this to send important account updates."
    />
  )
}`,
  withError: `import { TextInput } from '@designgreat/lib-web-component'

export function EmailField() {
  return (
    <TextInput
      label="Email address"
      placeholder="you@example.com"
      errorMessage="Please enter a valid email address."
    />
  )
}`,
  withSuccess: `import { TextInput } from '@designgreat/lib-web-component'

export function EmailField() {
  return (
    <TextInput
      label="Email address"
      placeholder="you@example.com"
      validationState="success"
      description="Looks good!"
    />
  )
}`,
  disabled: `import { TextInput } from '@designgreat/lib-web-component'

export function EmailField() {
  return (
    <TextInput
      label="Email address"
      placeholder="you@example.com"
      disabled
      description="Disabled inputs cannot be edited."
    />
  )
}`,
  withIcons: `import { TextInput } from '@designgreat/lib-web-component'
import { FiMail, FiUser } from 'react-icons/fi'

export function EmailField() {
  return (
    <TextInput
      label="Contact"
      placeholder="name@example.com"
      leadingIcon={<FiUser aria-hidden />}
      trailingIcon={<FiMail aria-hidden />}
    />
  )
}`
} as const

const renderWithCodeToggle = (code: string) =>
  withCodeDemo<TextInputProps>({
    code,
    render: args => <TextInput {...args} />
  })

const buildDocsParameters = (code: string, description?: string) => ({
  docs: {
    ...(description ? { description: { story: description } } : {}),
    source: {
      language: 'tsx',
      state: 'open',
      code
    }
  }
})

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

export const Default: Story = {
  render: renderWithCodeToggle(TEXT_INPUT_SNIPPETS.default),
  parameters: buildDocsParameters(TEXT_INPUT_SNIPPETS.default)
}

export const WithDescription: Story = {
  args: {
    description: 'We use this to send important account updates.'
  },
  render: renderWithCodeToggle(TEXT_INPUT_SNIPPETS.withDescription),
  parameters: buildDocsParameters(TEXT_INPUT_SNIPPETS.withDescription)
}

export const WithError: Story = {
  args: {
    errorMessage: 'Please enter a valid email address.'
  },
  render: renderWithCodeToggle(TEXT_INPUT_SNIPPETS.withError),
  parameters: buildDocsParameters(TEXT_INPUT_SNIPPETS.withError)
}

export const WithSuccess: Story = {
  args: {
    validationState: 'success',
    description: 'Looks good!'
  },
  render: renderWithCodeToggle(TEXT_INPUT_SNIPPETS.withSuccess),
  parameters: buildDocsParameters(TEXT_INPUT_SNIPPETS.withSuccess)
}

export const Disabled: Story = {
  args: {
    disabled: true,
    description: 'Disabled inputs cannot be edited.'
  },
  render: renderWithCodeToggle(TEXT_INPUT_SNIPPETS.disabled),
  parameters: buildDocsParameters(TEXT_INPUT_SNIPPETS.disabled)
}

export const WithIcons: Story = {
  args: {
    leadingIcon: <FiUser aria-hidden />,
    trailingIcon: <FiMail aria-hidden />,
    placeholder: 'name@example.com'
  },
  render: renderWithCodeToggle(TEXT_INPUT_SNIPPETS.withIcons),
  parameters: buildDocsParameters(TEXT_INPUT_SNIPPETS.withIcons)
}
