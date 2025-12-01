import clsx from 'clsx'
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

const VARIANT_CLASSNAMES: Record<ButtonVariant, string> = {
  primary: 'dg-btn--primary',
  secondary: 'dg-btn--secondary',
  outline: 'dg-btn--outline'
}

const SIZE_CLASSNAMES: Record<ButtonSize, string> = {
  sm: 'dg-btn--sm',
  md: '',
  lg: 'dg-btn--lg'
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * Component-specific props consumed by the Button component.
 */
export type ButtonOwnProps = {
  /**
   * Visual treatment of the button.
   * @defaultValue 'primary'
   */
  readonly variant?: ButtonVariant
  /**
   * Tokenized size that drives height, padding, and typography.
   * @defaultValue 'md'
   */
  readonly size?: ButtonSize
  /**
   * Makes the button expand to the full width of its container.
   */
  readonly fullWidth?: boolean
  /**
   * Optional icon rendered before the label.
   */
  readonly leadingIcon?: ReactNode
  /**
   * Optional icon rendered after the label.
   */
  readonly trailingIcon?: ReactNode
  /**
   * Displays a spinner and disables pointer events.
   * @defaultValue false
   */
  readonly loading?: boolean
}

export type ButtonProps = ButtonOwnProps & ButtonHTMLAttributes<HTMLButtonElement>

function ButtonSpinner() {
  return <span aria-hidden className="dg-btn__spinner" />
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
        'dg-btn',
        VARIANT_CLASSNAMES[variant],
        SIZE_CLASSNAMES[size],
        fullWidth && 'dg-btn--block',
        loading && 'dg-btn--loading',
        className
      )}
      disabled={isDisabled}
      aria-busy={loading}
      {...rest}
    >
      {loading ? (
        <ButtonSpinner />
      ) : (
        leadingIcon && <span className="dg-btn__icon dg-btn__icon--leading">{leadingIcon}</span>
      )}
      <span className="dg-btn__label">{children}</span>
      {trailingIcon && !loading ? (
        <span className="dg-btn__icon dg-btn__icon--trailing">{trailingIcon}</span>
      ) : null}
    </button>
  )
})

Button.displayName = 'Button'
