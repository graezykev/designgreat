import type { Meta, StoryObj } from '@storybook/react'
import { FiArrowRight, FiSettings } from 'react-icons/fi'

import { Button, type ButtonProps } from './Button'
import { withCodeDemo } from '../../storybook/CodeDemoToggle'

const CODE_SNIPPETS = {
  primary: `import { Button } from '@designgreat/lib-web-ui'

export function PrimaryCTA() {
  return <Button variant="primary" size="md">CTA Button</Button>
}`,
  secondary: `import { Button } from '@designgreat/lib-web-ui'

export function SecondaryCTA() {
  return <Button variant="secondary">Secondary action</Button>
}`,
  outline: `import { Button } from '@designgreat/lib-web-ui'

export function OutlineCTA() {
  return <Button variant="outline">Outline action</Button>
}`,
  withIcons: `import { Button } from '@designgreat/lib-web-ui'
import { FiSettings, FiArrowRight } from 'react-icons/fi'

export function SettingsCTA() {
  return (
    <Button leadingIcon={<FiSettings aria-hidden />} trailingIcon={<FiArrowRight aria-hidden />}>
      Manage settings
    </Button>
  )
}`,
  loading: `import { Button } from '@designgreat/lib-web-ui'

export function LoadingCTA() {
  return (
    <Button loading size="md">
      Saving changes...
    </Button>
  )
}`
} as const

const renderWithCodeToggle = (code: string) =>
  withCodeDemo<ButtonProps>({
    code,
    render: args => <Button {...args} />
  })

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    controls: { expanded: true },
    docs: {
      source: {
        state: 'open'
      }
    }
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

export const Primary: Story = {
  render: renderWithCodeToggle(CODE_SNIPPETS.primary),
  parameters: {
    docs: {
      description: {
        story: 'Default CTA button.'
      },
      source: {
        language: 'tsx',
        state: 'open',
        code: CODE_SNIPPETS.primary
      }
    }
  }
}

export const Secondary: Story = {
  render: renderWithCodeToggle(CODE_SNIPPETS.secondary),
  args: {
    variant: 'secondary',
    children: 'Secondary action'
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        state: 'open',
        code: CODE_SNIPPETS.secondary
      }
    }
  }
}

export const Outline: Story = {
  render: renderWithCodeToggle(CODE_SNIPPETS.outline),
  args: {
    variant: 'outline',
    children: 'Outline action'
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        state: 'open',
        code: CODE_SNIPPETS.outline
      }
    }
  }
}

export const WithIcons: Story = {
  render: renderWithCodeToggle(CODE_SNIPPETS.withIcons),
  args: {
    leadingIcon: <FiSettings aria-hidden />,
    trailingIcon: <FiArrowRight aria-hidden />,
    children: 'Manage settings'
  },
  parameters: {
    docs: {
      description: {
        story: 'Use leading/trailing icon props to pair glyphs with the label.'
      },
      source: {
        language: 'tsx',
        state: 'open',
        code: CODE_SNIPPETS.withIcons
      }
    }
  }
}

export const Loading: Story = {
  render: renderWithCodeToggle(CODE_SNIPPETS.loading),
  args: {
    loading: true,
    children: 'Saving changes...'
  },
  parameters: {
    docs: {
      source: {
        language: 'tsx',
        state: 'open',
        code: CODE_SNIPPETS.loading
      }
    }
  }
}
