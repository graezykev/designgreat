import clsx from 'clsx'
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type PropsWithChildren,
  type ReactNode
} from 'react'
import { createPortal } from 'react-dom'

type DialogSize = 'sm' | 'md' | 'lg'

type DialogContextValue = {
  registerTitle: (id: string | undefined) => void
  registerDescription: (id: string | undefined) => void
  titleId?: string
  descriptionId?: string
}

const DialogContext = createContext<DialogContextValue | undefined>(undefined)

function useDialogContext(componentName: string): DialogContextValue {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error(`${componentName} must be used within a <Dialog> component.`)
  }

  return context
}

const SIZE_CLASSNAME: Record<DialogSize, string> = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl'
}

type DialogBaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'role'>

export type DialogProps = PropsWithChildren<
  {
    readonly open: boolean
    readonly onClose: () => void
    readonly size?: DialogSize
    readonly closeOnOverlayClick?: boolean
    readonly initialFocusRef?: React.RefObject<HTMLElement>
    readonly renderInPortal?: boolean
  } & DialogBaseProps
>

export function Dialog({
  open,
  onClose,
  size = 'md',
  closeOnOverlayClick = true,
  initialFocusRef,
  renderInPortal = true,
  children,
  className,
  'aria-labelledby': ariaLabelledByProp,
  'aria-describedby': ariaDescribedByProp,
  ...rest
}: DialogProps): ReactNode {
  const overlayRef = useRef<HTMLDivElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const [titleId, setTitleId] = useState<string>()
  const [descriptionId, setDescriptionId] = useState<string>()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useBodyScrollLock(open)
  useDialogFocus(open, dialogRef, onClose, initialFocusRef)

  const contextValue = useMemo<DialogContextValue>(
    () => ({
      registerTitle: setTitleId,
      registerDescription: setDescriptionId,
      titleId,
      descriptionId
    }),
    [descriptionId, titleId]
  )

  if (!open) {
    return null
  }

  const dialogNode = (
    <DialogContext.Provider value={contextValue}>
      <div
        ref={overlayRef}
        className="dg-dialog-overlay fixed inset-0 z-50 flex items-center justify-center bg-color-alpha-neutral-5 px-spacing-8 py-spacing-10"
        onMouseDown={(event) => {
          if (!closeOnOverlayClick) {
            return
          }

          if (event.target === event.currentTarget) {
            event.preventDefault()
            onClose()
          }
        }}
      >
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={[ariaLabelledByProp, titleId].filter(Boolean).join(' ') || undefined}
          aria-describedby={[ariaDescribedByProp, descriptionId].filter(Boolean).join(' ') || undefined}
          tabIndex={-1}
          className={clsx(
            'dg-dialog-panel relative mx-auto flex w-full flex-col gap-spacing-7 rounded-xl bg-color-background-default text-color-text-default shadow-xl outline-none focus-visible:ring-2 focus-visible:ring-color-border-button-interaction-focus-visible',
            SIZE_CLASSNAME[size],
            className
          )}
          {...rest}
        >
          {children}
        </div>
      </div>
    </DialogContext.Provider>
  )

  if (renderInPortal && isMounted && typeof document !== 'undefined') {
    return createPortal(dialogNode, document.body)
  }

  return dialogNode
}

export type DialogSectionProps = HTMLAttributes<HTMLDivElement>

const PADDING_X = 'px-spacing-12'

export function DialogHeader({ className, ...rest }: DialogSectionProps): ReactNode {
  return (
    <div
      className={clsx(
        'dg-dialog-header flex flex-col gap-spacing-4 pt-spacing-12',
        PADDING_X,
        className
      )}
      {...rest}
    />
  )
}

export function DialogBody({ className, ...rest }: DialogSectionProps): ReactNode {
  return (
    <div
      className={clsx(
        'dg-dialog-body flex flex-col gap-spacing-6 pb-spacing-10',
        PADDING_X,
        className
      )}
      {...rest}
    />
  )
}

export function DialogFooter({ className, ...rest }: DialogSectionProps): ReactNode {
  return (
    <div
      className={clsx(
        'dg-dialog-footer flex flex-col gap-spacing-5 border-t border-color-border-subtle pt-spacing-6 pb-spacing-12 sm:flex-row sm:justify-end',
        PADDING_X,
        className
      )}
      {...rest}
    />
  )
}

export type DialogTitleProps = HTMLAttributes<HTMLHeadingElement>

export function DialogTitle({ id, className, ...rest }: DialogTitleProps): ReactNode {
  const context = useDialogContext('DialogTitle')
  const generatedId = useId()
  const titleId = id ?? `${generatedId}-title`

  useEffect(() => {
    context.registerTitle(titleId)
    return () => {
      context.registerTitle(undefined)
    }
  }, [context, titleId])

  return (
    <h2
      id={titleId}
      className={clsx('text-lg font-semibold text-color-text-bold', className)}
      {...rest}
    />
  )
}

export type DialogDescriptionProps = HTMLAttributes<HTMLParagraphElement>

export function DialogDescription({ id, className, ...rest }: DialogDescriptionProps): ReactNode {
  const context = useDialogContext('DialogDescription')
  const generatedId = useId()
  const descriptionId = id ?? `${generatedId}-description`

  useEffect(() => {
    context.registerDescription(descriptionId)
    return () => {
      context.registerDescription(undefined)
    }
  }, [context, descriptionId])

  return (
    <p
      id={descriptionId}
      className={clsx('text-base text-[var(--dg-color-text-subtle,#616168)]', className)}
      {...rest}
    />
  )
}

function useDialogFocus(
  open: boolean,
  dialogRef: React.RefObject<HTMLDivElement>,
  onClose: () => void,
  initialFocusRef?: React.RefObject<HTMLElement>
) {
  useEffect(() => {
    if (!open) {
      return
    }

    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    const previousActiveElement = document.activeElement as HTMLElement | undefined

    const focusTarget = initialFocusRef?.current ?? findFirstFocusableElement(dialog) ?? dialog

    requestAnimationFrame(() => {
      focusTarget?.focus({ preventScroll: true })
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const focusable = findFocusableElements(dialog)

      if (focusable.length === 0) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const current = document.activeElement as HTMLElement | undefined

      if (event.shiftKey) {
        if (current === first || !focusable.includes(current ?? dialog)) {
          event.preventDefault()
          last.focus()
        }
      } else if (current === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousActiveElement?.focus?.({ preventScroll: true })
    }
  }, [dialogRef, initialFocusRef, onClose, open])
}

function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) {
      return
    }

    const { style } = document.body
    const previousOverflow = style.overflow
    style.overflow = 'hidden'

    return () => {
      style.overflow = previousOverflow
    }
  }, [active])
}

function findFocusableElements(root: HTMLElement): HTMLElement[] {
  const selectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ]

  return Array.from(root.querySelectorAll<HTMLElement>(selectors.join(','))).filter(
    (element) => !element.hasAttribute('disabled') && element.tabIndex !== -1
  )
}

function findFirstFocusableElement(root: HTMLElement): HTMLElement | undefined {
  return findFocusableElements(root)[0]
}
