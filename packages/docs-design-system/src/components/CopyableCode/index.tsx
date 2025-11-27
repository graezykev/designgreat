import React, { useState } from 'react'

import styles from './CopyableCode.module.css'

type CopyableCodeProps = {
  readonly children: string;
  readonly inline?: boolean;
  readonly bold?: boolean;
}

export function CopyableCode({ children, inline = false, bold = false }: CopyableCodeProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => { setCopied(false) }, 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <code
      className={`${styles.copyableCode} ${inline ? styles.inline : ''} ${bold ? styles.bold : ''} ${copied ? styles.copied : ''}`}
      title="Click to copy"
      onClick={handleCopy}
    >
      {children}
      {copied ? <span className={styles.copiedIndicator}>✓</span> : null}
    </code>
  )
}

export default CopyableCode

