import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import { useEffect, useState } from 'react'

import styles from './styles.module.css'

type LogoProps = {
  readonly className?: string
  readonly to?: string
}

function Logo({ className, to }: LogoProps): JSX.Element {
  const logoLink = useBaseUrl(to ?? '/')
  const logoSrc = useBaseUrl('/img/logo.svg')
  const brandName = 'Design Great'
  const [svgContent, setSvgContent] = useState<string | undefined>(undefined)

  useEffect(() => {
    // Fetch SVG to inline it for CSS variable (theme) support
    const loadSvg = async (): Promise<void> => {
      try {
        const res = await fetch(logoSrc)

        if (!res.ok) return

        const svg = await res.text()
        setSvgContent(svg)
      } catch {
        // Keep using img fallback
      }
    }

    void loadSvg()
  }, [logoSrc])

  return (
    // @ts-expect-error - React 18/19 types compatibility issue
    <Link to={logoLink} className={`${styles.logoLink} ${className ?? ''}`}>
      {svgContent ? (
        <span
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: svgContent }}
          aria-label="Design Great Logo"
          className={styles.logo}
        />
      ) : (
        <img
          alt="Design Great Logo"
          className={styles.logo}
          height={32}
          src={logoSrc}
          width={32}
        />
      )}
      <span className={styles.title}>{brandName}</span>
    </Link>
  )
}

export default Logo
