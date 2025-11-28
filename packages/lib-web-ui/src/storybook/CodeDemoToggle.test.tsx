import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { CodeDemoToggle } from './CodeDemoToggle'

type Callback = MutationCallback

type ObserverRecord = {
  callback: Callback
  disconnect: jest.Mock
}

const observers: ObserverRecord[] = []

class MockMutationObserver {
  readonly observe = jest.fn()
  readonly disconnect = jest.fn()
  constructor(readonly callback: Callback) {
    observers.push({ callback, disconnect: this.disconnect })
  }
}

Object.defineProperty(global, 'MutationObserver', {
  configurable: true,
  writable: true,
  value: MockMutationObserver
})

const triggerMutation = () => {
  observers.forEach(({ callback }) => {
    callback([], {} as MutationObserver)
  })
}

const originalClipboard = navigator.clipboard
const originalExecCommand = document.execCommand

const setClipboard = (value: typeof navigator.clipboard | undefined) => {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value })
}

afterEach(() => {
  setClipboard(originalClipboard)
  document.execCommand = originalExecCommand
  observers.length = 0
  document.body.className = ''
})

describe('CodeDemoToggle', () => {
  it('toggles between demo and code views', async () => {
    const user = userEvent.setup()

    render(
      <CodeDemoToggle code="const Greeting = () => <div>Code</div>">
        <span>Demo content</span>
      </CodeDemoToggle>
    )

    expect(screen.getByText('Demo content')).toBeInTheDocument()

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Code' }))
    })
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.queryByText('Demo content')).not.toBeInTheDocument()

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Demo' }))
    })
    expect(screen.getByText('Demo content')).toBeInTheDocument()
  })

  it('copies code using the clipboard API when available', async () => {
    const user = userEvent.setup()
    const writeText = jest.fn().mockResolvedValue(undefined)
    setClipboard({ writeText } as unknown as Clipboard)

    render(
      <CodeDemoToggle code="const CopyExample = () => null">
        <span>Preview</span>
      </CodeDemoToggle>
    )

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Code' }))
    })
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Copy' }))
    })

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith('const CopyExample = () => null')
      expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
    })
  })

  it('falls back to document.execCommand when clipboard write fails', async () => {
    const user = userEvent.setup()
    const writeText = jest.fn().mockRejectedValue(new Error('clipboard blocked'))
    setClipboard({ writeText } as unknown as Clipboard)
    const execCommand = jest.fn().mockReturnValue(true)
    document.execCommand = execCommand

    render(
      <CodeDemoToggle code="const LegacyCopy = () => null">
        <span>Preview</span>
      </CodeDemoToggle>
    )

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Code' }))
    })
    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Copy' }))
    })

    await waitFor(() => {
      expect(writeText).toHaveBeenCalled()
      expect(execCommand).toHaveBeenCalledWith('copy')
      expect(screen.getByRole('button', { name: 'Copied' })).toBeInTheDocument()
    })
  })

  it('reacts to theme mutations triggered on document.body', async () => {
    const user = userEvent.setup()

    const { unmount } = render(
      <CodeDemoToggle code="const ThemeExample = () => null">
        <span>Preview</span>
      </CodeDemoToggle>
    )

    await act(async () => {
      await user.click(screen.getByRole('button', { name: 'Code' }))
    })
    const toggleGroup = screen.getByRole('button', { name: 'Demo' }).parentElement!
    expect(toggleGroup.style.boxShadow).toContain('0 12px 24px rgba(15, 23, 42, 0.12)')

    document.body.classList.add('dg-theme-dark')
    await act(async () => {
      triggerMutation()
    })

    await waitFor(() => {
      expect(toggleGroup.style.boxShadow).toContain('0 12px 30px rgba(0, 0, 0, 0.35)')
    })

    unmount()
    observers.forEach(({ disconnect }) => {
      expect(disconnect).toHaveBeenCalled()
    })
  })
})
