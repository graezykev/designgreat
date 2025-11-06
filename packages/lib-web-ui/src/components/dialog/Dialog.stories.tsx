import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  type DialogProps
} from './Dialog'
import { Button } from '../button/Button'

const meta: Meta<DialogProps> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    size: 'md',
    renderInPortal: false
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'inline-radio' }
    }
  }
}

export default meta

type Story = StoryObj<DialogProps>

function ControlledDialog(args: DialogProps) {
  const [open, setOpen] = useState(true)

  return (
    <div className="flex min-h-[60vh] items-start justify-center pt-[var(--dg-spacing-16)]">
      <Button
        onClick={() => {
          setOpen(true)
        }}
      >
        Launch dialog
      </Button>
      <Dialog
        {...args}
        open={open}
        onClose={() => {
          setOpen(false)
        }}
      >
        <DialogHeader>
          <DialogTitle>Schedule team sync</DialogTitle>
          <DialogDescription>
            Keep everyone aligned by sharing an agenda and highlighting key decisions ahead of time.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p>
            Dialogue content lives here. You can place any layout primitives, forms, or interactive
            elements inside the body section.
          </p>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="secondary"
            onClick={() => {
              setOpen(false)
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setOpen(false)
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  )
}

export const Default: Story = {
  render: (args: DialogProps) => <ControlledDialog {...args} />
}

export const Large: Story = {
  args: {
    size: 'lg'
  },
  render: (args: DialogProps) => <ControlledDialog {...args} />
}

export const WithoutPortal: Story = {
  args: {
    renderInPortal: false
  },
  render: (args: DialogProps) => <ControlledDialog {...args} />
}
