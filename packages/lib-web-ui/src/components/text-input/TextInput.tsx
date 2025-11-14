import clsx from 'clsx'
import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

const INPUT_SIZES: Record<TextInputSize, string> = {
  sm: 'dg-text-input__field--sm',
  md: '',
  lg: 'dg-text-input__field--lg'
}

const INPUT_STATES: Record<TextInputValidationState, string> = {
  default: '',
  error: 'dg-text-input__field--error',
  success: 'dg-text-input__field--success'
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

  return (
    <div className={clsx('dg-text-input', className)}>
      {label ? (
        <label className="dg-text-input__label" htmlFor={inputId}>
          <span>{label}</span>
          {optional ? <span className="dg-text-input__optional">Optional</span> : null}
        </label>
      ) : null}

      <div className="dg-text-input__field-wrapper">
        {leadingIcon ? (
          <span className="dg-text-input__icon dg-text-input__icon--leading">
            {leadingIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'dg-text-input__field',
            INPUT_SIZES[size],
            INPUT_STATES[validationState],
            leadingIcon && 'dg-text-input__field--has-leading',
            trailingIcon && 'dg-text-input__field--has-trailing'
          )}
          aria-describedby={ariaDescribedBy}
          aria-invalid={validationState === 'error' ? true : undefined}
          disabled={disabled}
          {...rest}
        />
        {trailingIcon ? (
          <span className="dg-text-input__icon dg-text-input__icon--trailing">
            {trailingIcon}
          </span>
        ) : null}
      </div>

      {description ? (
        <p id={descriptionId} className="dg-text-input__description">
          {description}
        </p>
      ) : null}

      {errorMessage ? (
        <p id={errorId} className="dg-text-input__error">
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
})

TextInput.displayName = 'TextInput'
