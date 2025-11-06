import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  Dialog,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from './Dialog'
import { Button } from '../button/Button'

describe('Dialog', () => {
  it('renders content when open', () => {
    render(
      <Dialog open renderInPortal={false} onClose={jest.fn()}>
        <DialogHeader>
          <DialogTitle>Dialog title</DialogTitle>
          <DialogDescription>Dialog description</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p>Content</p>
        </DialogBody>
      </Dialog>
    )

    expect(screen.getByRole('dialog', { name: /dialog title/i })).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('invokes onClose when overlay is clicked', () => {
    const handleClose = jest.fn()
    render(
      <Dialog open renderInPortal={false} onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Invite team</DialogTitle>
        </DialogHeader>
      </Dialog>
    )

    const overlay = document.querySelector('.dg-dialog-overlay')!
    fireEvent.mouseDown(overlay)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('traps focus inside the dialog and closes on Escape', async () => {
    const user = userEvent.setup()
    const handleClose = jest.fn()

    render(
      <Dialog open renderInPortal={false} onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Focus trap</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Button>First</Button>
          <Button>Second</Button>
        </DialogBody>
        <DialogFooter>
          <Button variant="secondary">Cancel</Button>
          <Button>Confirm</Button>
        </DialogFooter>
      </Dialog>
    )

    const firstButton = screen.getByRole('button', { name: 'First' })
    const lastButton = screen.getByRole('button', { name: 'Confirm' })

    await waitFor(() => {
      expect(document.activeElement).toBe(firstButton)
    })

    await user.tab()
    await user.tab()
    await user.tab()
    await user.tab()
    expect(document.activeElement).toBe(firstButton)

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(handleClose).toHaveBeenCalledTimes(1)
    expect(lastButton).toBeInTheDocument()
  })
})
