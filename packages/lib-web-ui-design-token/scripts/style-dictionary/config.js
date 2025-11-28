/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import tinycolor2 from 'tinycolor2'

import { generateColorShades, ACCENT_MAP } from './color-gradient.js'
import { resolveStyleDictionaryModule } from './load-style-dictionary.js'

const utilsModule = await import(pathToFileURL(resolveStyleDictionaryModule('style-dictionary/utils')).href)
const { usesReferences } = utilsModule

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const packageRoot = resolve(__dirname, '..', '..')
const distRoot = resolve(packageRoot, 'dist')
const srcRoot = resolve(packageRoot, 'src')

const BASE_TRANSFORMS_REGISTERED = new WeakSet()
const BASE_FORMATS_REGISTERED = new WeakSet()
const COLOR_TRANSFORM_NAMES = new WeakMap()

const FontAssetPath = '.' // Relative path - fonts in same directory as CSS
const BasePixelFontSize = 16

export default function getStyleDictionaryConfig(theme, StyleDictionary) {
  registerBaseTransforms(StyleDictionary)
  registerBaseFormats(StyleDictionary)
  const colorTransformName = registerColorTransform(StyleDictionary, theme)

  // Only generate font-face.css and copy assets for the first theme (light)
  const isFirstTheme = theme === 'light'

  // Determine CSS selector based on theme
  const cssSelector = theme === 'dark' ? '.dg-theme-dark' : ':root'

  return {
    source: [
      `${resolve(srcRoot, 'tokens')}/**/*.json`,
      `${resolve(srcRoot, 'tokens')}/**/*.js`
    ],
    platforms: {
      // Font platform - theme-independent, generates to dist/font/
      ...(isFirstTheme ? {
        font: {
          transforms: ['attribute/cti'],
          buildPath: `${resolve(distRoot, 'font')}/`,
          files: [
            {
              destination: 'font-face.css',
              filter: (token) => token.type === 'fontFace' && token?.attributes?.fonts,
              format: 'css/font-face'
            }
          ]
        }
      } : {}),
      // CSS platform - theme-specific variables
      css: {
        transforms: [
          'attribute/cti',
          'name/kebab',
          'css/flatten-composition-properties',
          'time/seconds',
          'html/icon',
          'size/rem',
          'color/css',
          colorTransformName,
          'asset/url',
          'fontFamily/css',
          'cubicBezier/css',
          'strokeStyle/css/shorthand',
          'border/css/shorthand',
          'typography/css/shorthand',
          'transition/css/shorthand',
          'shadow/css/shorthand',
          'line-height',
          'text-shadow/css/shorthand',
          'linear-gradient/shorthand',
          'radial-gradient/shorthand',
          'conic-gradient/shorthand'
        ],
        buildPath: `${resolve(distRoot, 'css', theme)}/`,
        prefix: 'dg',
        files: [
          {
            destination: 'variables.scss',
            format: 'scss/variables'
          },
          {
            destination: 'variables.css',
            format: 'css/variables-themed',
            options: {
              selector: cssSelector
            }
          }
        ],
        actions: []
      },
      jsts: {
        transforms: [
          'attribute/cti',
          'name/pascal',
          'size/rem',
          colorTransformName,
          'color/css',
          'time/seconds',
          'line-height',
          'linear-gradient/shorthand',
          'radial-gradient/shorthand',
          'conic-gradient/shorthand',
          'asset/url'
        ],
        buildPath: `${resolve(distRoot, 'jsts', theme)}/`,
        files: [
          {
            destination: 'variables.js',
            format: 'javascript/esm'
          },
          {
            destination: 'variables.d.ts',
            format: 'typescript/module-declarations'
          }
        ]
      }
    },
    log: {
      warnings: 'warn',
      verbosity: 'verbose',
      errors: {
        brokenReferences: 'throw'
      }
    }
  }
}

function registerBaseTransforms(StyleDictionary) {
  if (BASE_TRANSFORMS_REGISTERED.has(StyleDictionary)) {
    return
  }

  StyleDictionary.registerTransform({
    name: 'line-height',
    type: 'value',
    transitive: true,
    filter: (token) => token.type === 'lineHeight' && token?.attributes?.targetHeight,
    transform(token) {
      if (usesReferences(token.value)) {
        return undefined
      }

      return token.attributes.targetHeight / (parseFloat(token.value) * BasePixelFontSize)
    }
  })

  StyleDictionary.registerTransform({
    name: 'line-spacing',
    type: 'value',
    transitive: true,
    filter: (token) => token.type === 'lineHeight' && token?.attributes?.targetHeight,
    transform(token) {
      if (usesReferences(token.value)) {
        return undefined
      }

      const lineSpacing = token.attributes.targetHeight - parseFloat(token.value)
      return lineSpacing.toFixed(2)
    }
  })

  const stringifyShadow = (val) => {
    if (typeof val !== 'object') {
      return val
    }

    const { color, offsetX, offsetY, blur } = val
    return `${offsetX ?? 0} ${offsetY ?? 0} ${blur ?? 0} ${color ?? ''}`
  }

  StyleDictionary.registerTransform({
    name: 'text-shadow/css/shorthand',
    type: 'value',
    transitive: true,
    filter: ({ type }) => ['textShadow'].includes(type),
    transform({ value }) {
      if (!value) return value
      if (Array.isArray(value)) {
        return value.map(stringifyShadow).join(', ')
      }

      return stringifyShadow(value)
    }
  })

  const createGradientTransform = (name, fn) => {
    StyleDictionary.registerTransform({
      name,
      type: 'value',
      transitive: true,
      filter: ({ type }) => [name.split('/')[0]].includes(type),
      transform({ value }) {
        if (!value || typeof value !== 'object') {
          return value
        }

        return fn(value)
      }
    })
  }

  createGradientTransform('linear-gradient/shorthand', (val) => {
    const { angle, interpolation, colors } = val
    const angleValue = typeof angle === 'number' ? `${angle}deg` : (angle ?? '0deg')
    const colorsValue = colors
      ? colors.reduce((str, { color, length, percentage }) => str.concat(`, ${color}${percentage > 0 && percentage < 100 ? ` ${percentage}%` : (length ? ` ${length}` : '')}`), '')
      : ''
    return `linear-gradient(${angleValue}${interpolation ? ` in ${interpolation}` : ''}${colorsValue})`
  })

  createGradientTransform('radial-gradient/shorthand', (val) => {
    const { endingShape, size, position = {}, interpolation, colors } = val
    const colorsValue = colors
      ? colors.reduce((str, { color, length, percentage }) => str.concat(`, ${color}${percentage > 0 && percentage < 100 ? ` ${percentage}%` : (length ? ` ${length}` : '')}`), '')
      : ''
    return `radial-gradient(${endingShape ?? 'ellipse'} ${size ?? 'farthest-corner'} at ${position.x ?? 'center'} ${position.y ?? 'center'}${interpolation ? ` in ${interpolation}` : ''}${colorsValue})`
  })

  createGradientTransform('conic-gradient/shorthand', (val) => {
    const { angle, position = {}, interpolation, colors } = val
    const angleValue = typeof angle === 'number' ? `${angle}deg` : (angle ?? '0deg')
    const colorsValue = colors
      ? colors.reduce((str, { color, length, percentage }) => str.concat(`, ${color}${percentage > 0 && percentage < 100 ? ` ${percentage}%` : (length ? ` ${length}` : '')}`), '')
      : ''
    return `conic-gradient(from ${angleValue} at ${position.x ?? 'center'} ${position.y ?? 'center'}${interpolation ? ` in ${interpolation}` : ''}${colorsValue})`
  })

  BASE_TRANSFORMS_REGISTERED.add(StyleDictionary)
}

function registerBaseFormats(StyleDictionary) {
  if (BASE_FORMATS_REGISTERED.has(StyleDictionary)) {
    return
  }

  // Custom CSS format with theme-specific selectors
  StyleDictionary.registerFormat({
    name: 'css/variables-themed',
    format({ dictionary, options }) {
      const selector = options.selector || ':root'

      const variables = dictionary.allTokens
        .map(token => `  --${token.name}: ${token.value};`)
        .join('\n')

      const header = '/**\n * Do not edit directly, this file was auto-generated.\n */\n'
      return `${header}\n${selector} {\n${variables}\n}\n`
    }
  })

  StyleDictionary.registerFormat({
    name: 'css/font-face',
    format({ dictionary }) {
      const faces = dictionary.allTokens
        .map(generateFontFaceCSS)
        .join('\n')
      return faces
    }
  })

  StyleDictionary.registerTransform({
    name: 'css/flatten-composition-properties',
    type: 'value',
    transitive: true,
    filter: ({ type }) => ['composition'].includes(type),
    transform({ value, name, type }, config) {
      if (!value) return value
      const entries = Object.entries(value)
      const { transform } = config.transforms[1]
      const flattened = entries.reduce((acc, [key, v], index) => `${acc ? `${acc}\n\t` : ''}--${name}-${transform({ path: [key] }, { prefix: '' })}: ${v}${index + 1 === entries.length ? '' : ';'}`, `${name.includes(type) ? '' : `${name}-${type}`};`)
      return flattened
    }
  })

  BASE_FORMATS_REGISTERED.add(StyleDictionary)
}

function registerColorTransform(StyleDictionary, theme) {
  let themeMap = COLOR_TRANSFORM_NAMES.get(StyleDictionary)
  if (!themeMap) {
    themeMap = new Map()
    COLOR_TRANSFORM_NAMES.set(StyleDictionary, themeMap)
  }

  if (themeMap.has(theme)) {
    return themeMap.get(theme)
  }

  const transformName = `colorShadesMapping:${theme}`

  StyleDictionary.registerTransform({
    name: transformName,
    type: 'value',
    transitive: true,
    transform(token) {
      if (token.gradientConfig) {
        const colorName = token.path[token.path.length - 2]
        const gradientLevel = token.path[token.path.length - 1]
        let gradients
        if (ACCENT_MAP[colorName]) {
          gradients = ACCENT_MAP[colorName].gradients
          return gradients[gradientLevel]
        }

        const {
          totalShades = 10,
          defaultShade = 7,
          darkestLightness = 0.05,
          lightestLightness = 0.95
        } = token.gradientConfig
        const rst = generateColorShades(colorName, token.value, {
          totalShades,
          defaultShade,
          darkestLightness,
          lightestLightness
        })
        gradients = rst.gradients
        return gradients[gradientLevel]
      }

      if (token.isAlias) {
        const colorName = token.path[token.path.length - 2]
        const alias = token.path[token.path.length - 1]
        if (ACCENT_MAP[colorName]) {
          const { gradients } = ACCENT_MAP[colorName]
          const map = theme === 'dark' ? ACCENT_MAP[colorName].darkAliasMap : ACCENT_MAP[colorName].aliasMap
          return gradients[map[alias]]
        }
      }

      if (token.attributes && typeof token.attributes.alpha !== 'undefined') {
        if (usesReferences(token.value)) {
          return undefined
        }

        return tinycolor2(token.value).setAlpha(parseFloat(token.attributes.alpha, 10)).toHex8String()
      }

      return token.value
    }
  })

  themeMap.set(theme, transformName)
  return transformName
}

function generateFontFaceCSS(token) {
  const fonts = token?.attributes?.fonts
  if (!fonts) {
    return ''
  }

  return Object.keys(fonts).map((lang) => {
    const font = fonts[lang]
    const weightMap = font['font-weight'] || { '': null }
    const weightArr = Object.keys(weightMap)
    return weightArr.map((weight) => {
      const styles = font['font-style'] || ['']
      return styles.map((style) => {
        const name = [token.value, lang, weight, style].reduce((acc, item) => {
          if (item) acc.push(item)
          return acc
        }, []).join('-')
        const range = font['unicode-range']
        return `@font-face {
          font-family: '${token.value}';
          src: url('${FontAssetPath}/${name}.woff2') format('woff2'),
              url('${FontAssetPath}/${name}.woff') format('woff'),
              url('${FontAssetPath}/${name}.ttf') format('truetype'),
              url('${FontAssetPath}/${name}.otf') format('opentype');
          ${weight ? `font-weight: ${weightMap[weight]};` : ''}
          ${style ? `font-style: ${style};` : ''}
          ${range ? `unicode-range: ${range};` : ''}
        }`
      }).join('\n')
    }).join('\n')
  }).join('\n')
}
