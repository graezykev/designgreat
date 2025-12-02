import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'

import styles from './styles.module.css'

type LogoProps = {
  readonly className?: string
  readonly to?: string
}

function Logo({ className, to }: LogoProps): JSX.Element {
  const logoLink = useBaseUrl(to ?? '/')
  // Use short brand name for navbar, not full site title
  const brandName = 'Design Great'

  return (
    // @ts-expect-error - React 18/19 types compatibility issue
    <Link to={logoLink} className={`${styles.logoLink} ${className ?? ''}`}>
      {/* Inline SVG - Corporate pixel grid design */}
      <svg
        className={styles.logo}
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Design Great Logo"
      >
        {/* 3x3 pixel grid with rounded corners - corporate design aesthetic */}
        {/* Row 1 */}
        <rect x="2" y="2" width="8" height="8" rx="2" className={styles.layerTop} />
        <rect x="12" y="2" width="8" height="8" rx="2" className={styles.layerMid} />
        <rect x="22" y="2" width="8" height="8" rx="2" className={styles.layerBack} />

        {/* Row 2 */}
        <rect x="2" y="12" width="8" height="8" rx="2" className={styles.layerMid} />
        <rect x="12" y="12" width="8" height="8" rx="2" className={styles.layerTop} />
        <rect x="22" y="12" width="8" height="8" rx="2" className={styles.layerMid} />

        {/* Row 3 */}
        <rect x="2" y="22" width="8" height="8" rx="2" className={styles.layerBack} />
        <rect x="12" y="22" width="8" height="8" rx="2" className={styles.layerMid} />
        <rect x="22" y="22" width="8" height="8" rx="2" className={styles.layerTop} />
      </svg>
      <span className={styles.title}>{brandName}</span>
    </Link>
  )
}

export default Logo

