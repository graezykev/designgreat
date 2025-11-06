import clsx from 'clsx'
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

const BUTTON_BASE_CLASSES =
  'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 gap-spacing-5 select-none'

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: clsx(
    'bg-color-background-button-default',
    'text-color-text-button-default',
    'hover:bg-color-background-button-interaction-hover',
    'focus-visible:ring-color-background-button-interaction-focus-visible',
    'active:bg-color-background-button-interaction-active',
    'disabled:bg-color-background-button-state-disabled',
    'disabled:text-color-text-button-state-disabled'
  ),
  secondary: clsx(
    'bg-color-background-button-subtle-default',
    'text-color-text-button-subtle-default',
    'hover:bg-color-background-button-subtle-interaction-hover',
    'focus-visible:ring-color-background-button-subtle-interaction-focus-visible',
    'active:bg-color-background-button-subtle-interaction-active',
    'disabled:bg-color-background-button-subtle-state-disabled',
    'disabled:text-color-text-button-subtle-state-disabled'
  ),
  outline: clsx(
    'border border-color-border-button-wireframe-default',
    'bg-transparent',
    'text-color-text-button-wireframe-default',
    'hover:border-color-border-button-wireframe-interaction-hover',
    'hover:text-color-text-button-wireframe-interaction-hover',
    'focus-visible:ring-color-border-button-wireframe-interaction-focus-visible',
    'active:border-color-border-button-wireframe-interaction-active',
    'active:text-color-text-button-wireframe-interaction-active',
    'disabled:border-color-border-button-wireframe-state-disabled',
    'disabled:text-color-text-button-wireframe-state-disabled'
  )
}

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-9 px-spacing-10 text-sm leading-5',
  md: 'h-10 px-spacing-11 text-base leading-6',
  lg: 'h-12 px-spacing-12 text-lg leading-6'
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = {
  readonly variant?: ButtonVariant
  readonly size?: ButtonSize
  readonly fullWidth?: boolean
  readonly leadingIcon?: ReactNode
  readonly trailingIcon?: ReactNode
  readonly loading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const SPINNER_CLASSES =
  'inline-block h-4 w-4 animate-spin rounded-full border-2 border-transparent border-t-current'

function ButtonSpinner() {
  return <span aria-hidden className={SPINNER_CLASSES} />
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    className,
    variant = 'primary',
    size = 'md',
    fullWidth,
    leadingIcon,
    trailingIcon,
    loading = false,
    disabled,
    type = 'button',
    ...rest
  },
  ref
) {
  const isDisabled = disabled ?? loading

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        BUTTON_BASE_CLASSES,
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        fullWidth && 'w-full',
        loading && 'cursor-progress',
        className
      )}
      disabled={isDisabled}
      aria-busy={loading}
      {...rest}
    >
      {loading ? (
        <ButtonSpinner />
      ) : (
        leadingIcon && <span className="inline-flex items-center">{leadingIcon}</span>
      )}
      <span className="truncate">{children}</span>
      {trailingIcon && !loading ? (
        <span className="inline-flex items-center">{trailingIcon}</span>
      ) : null}
    </button>
  )
})

Button.displayName = 'Button'
