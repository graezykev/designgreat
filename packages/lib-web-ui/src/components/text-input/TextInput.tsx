import clsx from 'clsx'
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

const INPUT_BASE =
  'block w-full rounded-md border focus:outline-none focus-visible:ring-2 focus-visible:ring-color-border-input-interaction-focus focus-visible:ring-offset-2 transition-shadow duration-150'

const INPUT_VARIANTS: Record<TextInputValidationState, string> = {
  default: clsx(
    'bg-color-background-default',
    'text-color-text-input-default',
    'border-color-border-input-default'
  ),
  error: clsx(
    'bg-color-background-default',
    'border-color-border-error-bold',
    'focus-visible:ring-color-border-error-bold',
    'focus-visible:ring-offset-color-background-default'
  ),
  success: clsx(
    'bg-color-background-default',
    'border-color-border-success-bold',
    'focus-visible:ring-color-border-success-bold',
    'focus-visible:ring-offset-color-background-default'
  )
}

const INPUT_SIZES: Record<TextInputSize, string> = {
  sm: 'h-9 px-spacing-8 text-sm',
  md: 'h-10 px-spacing-9 text-base',
  lg: 'h-12 px-spacing-10 text-lg'
}

export type TextInputSize = 'sm' | 'md' | 'lg'
export type TextInputValidationState = 'default' | 'error' | 'success'

/**
 * Component-specific props for the TextInput component.
 */
export type TextInputOwnProps = {
  /**
   * Visible label text rendered above the input.
   */
  readonly label?: string
  /**
   * Supplementary helper text rendered below the input.
   */
  readonly description?: string
  /**
   * Error message shown when validation fails.
   */
  readonly errorMessage?: string
  /**
   * Controls the visual state (default/success/error).
   */
  readonly validationState?: TextInputValidationState
  /**
   * Tokenized height and padding preset.
   * @defaultValue 'md'
   */
  readonly size?: TextInputSize
  /**
   * Displays an "Optional" badge next to the label.
   */
  readonly optional?: boolean
  /**
   * Slot rendered inside the left side of the input.
   */
  readonly leadingIcon?: ReactNode
  /**
   * Slot rendered inside the right side of the input.
   */
  readonly trailingIcon?: ReactNode
}

export type TextInputProps = TextInputOwnProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>

const LABEL_BASE = 'mb-spacing-4 block text-sm font-medium text-color-text-default'
const DESCRIPTION_CLASS = 'mt-spacing-4 text-sm text-color-text-subtle'
const ERROR_CLASS = 'mt-spacing-4 text-sm text-color-text-error'

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    id,
    label,
    description,
    errorMessage,
    validationState = errorMessage ? 'error' : 'default',
    size = 'md',
    optional = false,
    leadingIcon,
    trailingIcon,
    className,
    disabled,
    ...rest
  },
  ref
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const descriptionId = description ? `${inputId}-description` : undefined
  const errorId = errorMessage ? `${inputId}-error` : undefined

  const ariaDescribedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined

  const iconWrapperClasses =
    'pointer-events-none absolute inset-y-0 flex items-center text-color-text-subtle'

  return (
    <div className={clsx('flex flex-col', className)}>
      {label ? (
        <label className={LABEL_BASE} htmlFor={inputId}>
          <span>{label}</span>
          {optional ? (
            <span className="ml-spacing-3 text-color-text-subtle">
              Optional
            </span>
          ) : null}
        </label>
      ) : null}

      <div className="relative">
        {leadingIcon ? (
          <span className={clsx(iconWrapperClasses, 'left-spacing-7')}>
            {leadingIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            INPUT_BASE,
            INPUT_VARIANTS[validationState],
            INPUT_SIZES[size],
            leadingIcon && 'pl-spacing-9',
            trailingIcon && 'pr-spacing-9',
            disabled && 'bg-color-background-bold cursor-not-allowed'
          )}
          aria-describedby={ariaDescribedBy}
          aria-invalid={validationState === 'error' ? true : undefined}
          disabled={disabled}
          {...rest}
        />
        {trailingIcon ? (
          <span className={clsx(iconWrapperClasses, 'right-spacing-7')}>
            {trailingIcon}
          </span>
        ) : null}
      </div>

      {description ? (
        <p id={descriptionId} className={DESCRIPTION_CLASS}>
          {description}
        </p>
      ) : null}

      {errorMessage ? (
        <p id={errorId} className={ERROR_CLASS}>
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
})

TextInput.displayName = 'TextInput'
