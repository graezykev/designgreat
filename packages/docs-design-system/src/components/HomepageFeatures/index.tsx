import Heading from '@theme/Heading'
import clsx from 'clsx'
import type { ComponentType, ReactNode } from 'react'

import SvgMountain from '@site/static/img/undraw_docusaurus_mountain.svg'
import SvgReact from '@site/static/img/undraw_docusaurus_react.svg'
import SvgTree from '@site/static/img/undraw_docusaurus_tree.svg'

import styles from './styles.module.css'

// Type workaround for Docusaurus SVG imports with React 19 types
type SvgComponent = ComponentType<{ className?: string; role?: string }>

type FeatureItem = {
  readonly title: string;
  readonly Svg: SvgComponent;
  readonly description: ReactNode;
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: SvgMountain as SvgComponent,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    )
  },
  {
    title: 'Focus on What Matters',
    Svg: SvgTree as SvgComponent,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    )
  },
  {
    title: 'Powered by React',
    Svg: SvgReact as SvgComponent,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    )
  }
]

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props) => (
            <Feature key={props.title} {...props} />
          ))}
        </div>
      </div>
    </section>
  )
}
