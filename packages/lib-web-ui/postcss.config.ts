import autoprefixer from 'autoprefixer'
import type { AcceptedPlugin } from 'postcss'
import tailwindcss from 'tailwindcss'

const plugins: AcceptedPlugin[] = [tailwindcss(), autoprefixer()]

const config: { plugins: AcceptedPlugin[] } = {
  plugins
}

export default config
