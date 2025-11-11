/* eslint-disable react/no-danger */
import { getThemeClassName } from '@designgreat/design-token-support'
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from 'react'

const DARK_THEME_CLASS = getThemeClassName('dark')

const useIsDarkTheme = () => {
  const getInitial = () => {
    if (typeof document === 'undefined') {
      if (typeof window === 'undefined') return false
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    return document.body.classList.contains(DARK_THEME_CLASS)
  }

  const [isDark, setIsDark] = useState(getInitial)

  useEffect(() => {
    if (typeof document === 'undefined') return

    const update = () => { setIsDark(document.body.classList.contains(DARK_THEME_CLASS)) }
    const observer = new MutationObserver(update)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => { observer.disconnect() }
  }, [])

  return isDark
}

const wrapperStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: '1rem'
}

const toggleRowStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '0 1.5rem',
  marginBottom: '0.5rem'
}

const toggleGroupStyle: CSSProperties = {
  display: 'inline-flex',
  gap: '0.2rem',
  padding: '0.2rem',
  borderRadius: '999px',
  backdropFilter: 'blur(10px)'
}

const toggleButtonBaseStyle: CSSProperties = {
  border: 'none',
  borderRadius: '999px',
  padding: '0.24rem 0.85rem',
  fontSize: '0.8rem',
  lineHeight: 1.2,
  cursor: 'pointer',
  backgroundColor: 'transparent',
  color: 'var(--dg-color-text-muted, #9da9c7)',
  fontWeight: 600,
  minWidth: '3.6rem',
  letterSpacing: '0.02em'
}

const demoSlotStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%'
}

const codePanelStyle: CSSProperties = {
  width: '100%',
  borderRadius: '0.9rem',
  boxShadow: '0 25px 65px rgba(15, 23, 42, 0.25)',
  overflow: 'hidden',
  border: '1px solid rgba(15, 23, 42, 0.08)'
}

const codeToolbarStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0.35rem 0.75rem',
  fontSize: '0.75rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase'
}

const codeBodyStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  fontSize: '0.85rem',
  maxHeight: '70vh',
  overflow: 'auto'
}

const lineNumberColumnStyle: CSSProperties = {
  padding: '1rem 0.75rem',
  textAlign: 'right',
  userSelect: 'none'
}

const codeColumnStyle: CSSProperties = {
  padding: '1rem 1.25rem',
  overflowX: 'auto'
}

const CODE_VIEW_THEME = {
  light: {
    background: '#f8fafc',
    border: 'rgba(15, 23, 42, 0.08)',
    headerBackground: 'rgba(15, 23, 42, 0.04)',
    headerText: '#0f172a',
    text: '#0f172a',
    keyword: '#7c3aed',
    string: '#0f9d58',
    component: '#0284c7',
    tag: '#0ea5e9',
    prop: '#c026d3',
    number: '#b45309',
    operator: '#0f172a',
    punctuation: '#475569',
    comment: '#94a3b8',
    lineNumber: '#94a3b8',
    copyButton: '#0f172a',
    copyButtonBackground: 'rgba(15, 23, 42, 0.08)'
  },
  dark: {
    background: '#0f172a',
    border: 'rgba(148, 163, 184, 0.32)',
    headerBackground: 'rgba(148, 163, 184, 0.1)',
    headerText: '#e2e8f0',
    text: '#e2e8f0',
    keyword: '#c084fc',
    string: '#4ade80',
    component: '#38bdf8',
    tag: '#0ea5e9',
    prop: '#f472b6',
    number: '#facc15',
    operator: '#f1f5f9',
    punctuation: '#94a3b8',
    comment: '#64748b',
    lineNumber: '#475569',
    copyButton: '#f8fafc',
    copyButtonBackground: 'rgba(148, 163, 184, 0.2)'
  }
} as const

type Palette = (typeof CODE_VIEW_THEME)[keyof typeof CODE_VIEW_THEME]

type CodeDemoToggleProps = {
  readonly code: string
  readonly children: ReactNode
}

export type WithCodeDemoOptions<Props> = {
  readonly code: string | ((args: Props) => string)
  readonly render: (args: Props) => ReactNode
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

const highlightLine = (line: string, palette: Palette) => {
  let html = escapeHtml(line)
  const placeholders: string[] = []

  const inject = (value: string) => {
    const index = placeholders.push(value) - 1
    return `@@__TOKEN_${index}__@@`
  }

  const colorize = (pattern: RegExp, color: string) => {
    html = html.replace(pattern, match => inject(`<span style="color:${color}">${match}</span>`))
  }

  const replaceWith = (
    pattern: RegExp,
    replacer: (...args: any[]) => string
  ) => {
    html = html.replace(pattern, (...args) => inject(replacer(...args)))
  }

  colorize(/(\/\/.*$)/g, palette.comment)
  colorize(/(\/\*[\s\S]*?\*\/)/g, palette.comment)
  colorize(/(&quot;.*?&quot;|&#39;.*?&#39;|`.*?`)/g, palette.string)
  colorize(/(&lt;\/?[A-Z][\w.]*)/g, palette.component)
  colorize(/(&lt;\/?[a-z][\w-]*)(?=[\s/>])/g, palette.tag)
  colorize(/\b(\d+(\.\d+)?)\b/g, palette.number)
  colorize(
    /\b(import|from|return|export|function|const|let|type|interface|extends|implements|new|async|await|if|else|switch|case|default)\b/g,
    palette.keyword
  )
  replaceWith(
    /([a-zA-Z_][\w-]*)(=)/g,
    (_match, name: string, equals: string) =>
      `<span style="color:${palette.prop}">${name}</span><span style="color:${palette.punctuation}">${equals}</span>`
  )
  colorize(/(&amp;&amp;|\|\||=>)/g, palette.operator)
  colorize(/([{}()[\].,:+*/?-])/g, palette.punctuation)

  html = html.replace(/;/g, (character: string, index: number, original: string) => {
    const lastAmpersandIndex = original.lastIndexOf('&', index)
    const isEntityTerminator =
      lastAmpersandIndex !== -1 && /^&[a-zA-Z0-9#]+$/.test(original.slice(lastAmpersandIndex, index))

    if (isEntityTerminator) {
      return character
    }

    return inject(`<span style="color:${palette.punctuation}">${character}</span>`)
  })

  return html.replace(/@@__TOKEN_(\d+)__@@/g, (_match, index) => placeholders[Number(index)])
}

const buildHighlightedLines = (code: string, palette: Palette) => {
  const normalized = code.replace(/\r\n/g, '\n').trimEnd().split('\n')
  return normalized.map(line => highlightLine(line, palette))
}

const CodeBlock = ({ code }: { readonly code: string }) => {
  const isDarkTheme = useIsDarkTheme()
  const palette = isDarkTheme ? CODE_VIEW_THEME.dark : CODE_VIEW_THEME.light
  const [copied, setCopied] = useState(false)
  const highlightedLines = useMemo(
    () => buildHighlightedLines(code, palette),
    [code, palette]
  )

  const handleCopy = () => {
    void (async () => {
      try {
        await navigator.clipboard?.writeText(code.trim())
      } catch {
        const textarea = document.createElement('textarea')
        textarea.value = code.trim()
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
      } finally {
        setCopied(true)
        window.setTimeout(() => { setCopied(false) }, 1200)
      }
    })()
  }

  return (
    <div
      style={{
        ...codePanelStyle,
        border: `1px solid ${palette.border}`
      }}
    >
      <div
        style={{
          ...codeToolbarStyle,
          backgroundColor: palette.headerBackground,
          color: palette.headerText
        }}
      >
        <span>Code</span>
        <button
          type="button"
          style={{
            border: 'none',
            borderRadius: '999px',
            padding: '0.2rem 0.8rem',
            fontSize: '0.7rem',
            cursor: 'pointer',
            backgroundColor: palette.copyButtonBackground,
            color: palette.copyButton
          }}
          onClick={handleCopy}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <div
        style={{
          ...codeBodyStyle,
          backgroundColor: palette.background,
          color: palette.text
        }}
      >
        <pre
          aria-hidden="true"
          style={{
            ...lineNumberColumnStyle,
            color: palette.lineNumber
          }}
        >
          {highlightedLines.map((_, index) => (
            /* eslint-disable-next-line react/no-array-index-key */
            <span key={`line-${index}`} style={{ display: 'block' }}>
              {index + 1}
            </span>
          ))}
        </pre>
        <pre
          style={{
            ...codeColumnStyle,
            color: palette.text
          }}
        >
          { }
          <code
            dangerouslySetInnerHTML={{ __html: highlightedLines.join('\n') }}
            style={{ fontFamily: '"JetBrains Mono", "SFMono-Regular", Consolas, Menlo, monospace' }}
          />
        </pre>
      </div>
    </div>
  )
}

const ToggleButton = ({
  active,
  label,
  onClick,
  themeVariant
}: {
  readonly active: boolean
  readonly label: string
  readonly onClick: () => void
  readonly themeVariant: 'light' | 'dark'
}) => {
  const isDark = themeVariant === 'dark'
  const inactiveColor = isDark ? '#cbd5f5' : '#0f172a'
  const activeBackground = 'var(--dg-color-background-button-default, #1d4ed8)'
  const activeTextColor = 'var(--dg-color-text-button-default, #ffffff)'

  return (
    <button
      type="button"
      aria-pressed={active}
      style={{
        ...toggleButtonBaseStyle,
        backgroundColor: active ? activeBackground : 'transparent',
        color: active ? activeTextColor : inactiveColor,
        border: active ? '1px solid rgba(255,255,255,0.2)' : '1px solid transparent',
        boxShadow: active ? '0 8px 18px rgba(37,99,235,0.35)' : 'none',
        transition: 'all 180ms ease'
      }}
      onClick={onClick}
    >
      <span>{label}</span>
    </button>
  )
}

export const CodeDemoToggle = ({ code, children }: CodeDemoToggleProps) => {
  const [mode, setMode] = useState<'demo' | 'code'>('demo')
  const isDarkTheme = useIsDarkTheme()

  return (
    <div style={wrapperStyle}>
      <div style={toggleRowStyle}>
        <div
          style={{
            ...toggleGroupStyle,
            background: isDarkTheme
              ? 'linear-gradient(145deg, rgba(8, 11, 22, 0.95), rgba(18, 22, 33, 0.92))'
              : 'rgba(255, 255, 255, 0.95)',
            border: isDarkTheme ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(15,23,42,0.12)',
            boxShadow: isDarkTheme
              ? '0 12px 30px rgba(0, 0, 0, 0.35)'
              : '0 12px 24px rgba(15, 23, 42, 0.12)'
          }}
        >
          <ToggleButton
            active={mode === 'demo'}
            label="Demo"
            themeVariant={isDarkTheme ? 'dark' : 'light'}
            onClick={() => { setMode('demo') }}
          />
          <ToggleButton
            active={mode === 'code'}
            label="Code"
            themeVariant={isDarkTheme ? 'dark' : 'light'}
            onClick={() => { setMode('code') }}
          />
        </div>
      </div>
      {mode === 'demo' ? (
        <div style={demoSlotStyle}>{children}</div>
      ) : (
        <CodeBlock code={code} />
      )}
    </div>
  )
}

export const withCodeDemo = <Props,>({ code, render }: WithCodeDemoOptions<Props>) =>
  (args: Props) => (
    <CodeDemoToggle code={typeof code === 'function' ? code(args) : code}>
      {render(args)}
    </CodeDemoToggle>
  )
