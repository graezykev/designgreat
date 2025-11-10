import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'

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

  it('accepts aria-label when no title is provided', () => {
    render(
      <Dialog open renderInPortal={false} aria-label="Custom dialog name" onClose={jest.fn()}>
        <DialogBody>
          <p>Standalone content</p>
        </DialogBody>
      </Dialog>
    )

    expect(screen.getByRole('dialog', { name: 'Custom dialog name' })).toBeInTheDocument()
  })

  it('returns null when closed', () => {
    const handleClose = jest.fn()

    render(
      <Dialog open={false} renderInPortal={false} onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Hidden dialog</DialogTitle>
        </DialogHeader>
      </Dialog>
    )

    expect(screen.queryByRole('dialog')).toBeNull()
    expect(handleClose).not.toHaveBeenCalled()
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

  it('does not close when overlay clicks are disabled', () => {
    const handleClose = jest.fn()
    render(
      <Dialog open renderInPortal={false} closeOnOverlayClick={false} onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Invite team</DialogTitle>
        </DialogHeader>
      </Dialog>
    )

    const overlay = document.querySelector('.dg-dialog-overlay')!
    fireEvent.mouseDown(overlay)
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('merges custom aria-labelledby values with generated ids', () => {
    render(
      <>
        <h2 id="external-heading">External heading</h2>
        <Dialog
          open
          renderInPortal={false}
          aria-labelledby="external-heading"
          onClose={jest.fn()}
        >
          <DialogHeader>
            <DialogTitle>Internal heading</DialogTitle>
          </DialogHeader>
        </Dialog>
      </>
    )

    const dialog = screen.getByRole('dialog', { name: /external heading/i })
    const labelledBy = dialog.getAttribute('aria-labelledby')
    expect(labelledBy).toContain('external-heading')
    expect(labelledBy).toMatch(/-title/)
  })

  it('renders via portal when enabled', async () => {
    const handleClose = jest.fn()
    const { container, rerender } = render(
      <Dialog open onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Portal dialog</DialogTitle>
        </DialogHeader>
      </Dialog>
    )

    await waitFor(() => {
      expect(screen.getByRole('dialog', { name: /portal dialog/i })).toBeInTheDocument()
    })

    expect(container.querySelector('.dg-dialog-overlay')).toBeNull()

    rerender(
      <Dialog open renderInPortal={false} onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Portal dialog</DialogTitle>
        </DialogHeader>
      </Dialog>
    )

    expect(container.querySelector('.dg-dialog-overlay')).not.toBeNull()
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

  it('focuses the provided initialFocusRef', async () => {
    const initialFocusRef = createRef<HTMLButtonElement>()

    render(
      <Dialog
        open
        renderInPortal={false}
        initialFocusRef={initialFocusRef}
        onClose={jest.fn()}
      >
        <DialogHeader>
          <DialogTitle>Initial focus</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Button ref={initialFocusRef}>Primary</Button>
          <Button>Secondary</Button>
        </DialogBody>
      </Dialog>
    )

    await waitFor(() => {
      expect(document.activeElement).toBe(initialFocusRef.current)
    })
  })

  it('keeps focus on the dialog when no focusable elements exist', async () => {
    render(
      <Dialog open renderInPortal={false} onClose={jest.fn()}>
        <DialogHeader>
          <DialogTitle>Static dialog</DialogTitle>
          <DialogDescription>Only static content</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <p>There are no interactive elements here.</p>
        </DialogBody>
      </Dialog>
    )

    const dialog = screen.getByRole('dialog', { name: /static dialog/i })
    await waitFor(() => {
      expect(dialog).toHaveFocus()
    })

    fireEvent.keyDown(document, { key: 'Tab' })
    expect(dialog).toHaveFocus()
  })

  it('wraps focus backwards with Shift+Tab', async () => {
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

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(document.activeElement).toBe(lastButton)
    expect(handleClose).not.toHaveBeenCalled()
  })

  it('restores body scroll locking after closing', async () => {
    const handleClose = jest.fn()
    const { rerender } = render(
      <Dialog open renderInPortal={false} onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Scroll lock</DialogTitle>
        </DialogHeader>
      </Dialog>
    )

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('hidden')
    })

    rerender(
      <Dialog open={false} renderInPortal={false} onClose={handleClose}>
        <DialogHeader>
          <DialogTitle>Scroll lock</DialogTitle>
        </DialogHeader>
      </Dialog>
    )

    await waitFor(() => {
      expect(document.body.style.overflow).toBe('')
    })
  })

  it('throws when Dialog subcomponents are rendered outside the provider', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<DialogTitle>Broken usage</DialogTitle>)).toThrow(
      'DialogTitle must be used within a <Dialog> component.'
    )
    consoleSpy.mockRestore()
  })
})
