/* eslint-disable @typescript-eslint/no-unsafe-argument */
import tinycolor2 from 'tinycolor2'

/**
 * @typedef {{
 *  gradients: Record<number, string>;
 *  alias: Record<string, string>;
 *  aliasMap: Record<string, number>;
 *  darkAliasMap: Record<string, number>;
 * }} AccentEntry
 */

const emphasisLevels = [
  'silent',
  'dullest',
  'duller',
  'dull',
  'lowest',
  'lower',
  'low',
  'subtlest',
  'subtler',
  'subtle',
  'DEFAULT',
  'bold',
  'bolder',
  'boldest'
]

const defaultIndex = emphasisLevels.indexOf('DEFAULT')

/** @type {Record<string, AccentEntry>} */
export const ACCENT_MAP = {}

export function generateColorShades(
  name,
  baseColor,
  {
    totalShades = 10,
    defaultShade = 7,
    darkestLightness = 0.05,
    lightestLightness = 0.95
  } = {}
) {
  const cached = ACCENT_MAP[name]
  if (cached) {
    return cached
  }

  const darkerShades = totalShades - defaultShade
  const lighterShades = defaultShade - 1

  /** @type {AccentEntry} */
  const rst = {
    gradients: {},
    alias: {},
    aliasMap: {},
    darkAliasMap: {}
  }

  const value = baseColor
  rst.gradients[defaultShade] = value

  const color = tinycolor2(value)
  const hsl = /** @type {import('tinycolor2').ColorFormats.HSLA} */ (color.toHsl())
  const lightness = hsl.l
  const lightGap = (lightestLightness - lightness) / lighterShades
  const darkGap = (lightness - darkestLightness) / darkerShades

  for (let from = 1; from <= darkerShades; from++) {
    const l = lightness - from * darkGap
    const darkerHsl = /** @type {import('tinycolor2').ColorFormats.HSLA} */ ({ ...hsl, l })
    const newColor = tinycolor2(/** @type {import('tinycolor2').ColorInput} */ (darkerHsl))
    rst.gradients[defaultShade + from] = `#${newColor.toHex()}`
  }

  for (let from = 1; from <= lighterShades; from++) {
    const l = lightness + from * lightGap
    const lighterHsl = /** @type {import('tinycolor2').ColorFormats.HSLA} */ ({ ...hsl, l })
    const newColor = tinycolor2(/** @type {import('tinycolor2').ColorInput} */ (lighterHsl))
    rst.gradients[defaultShade - from] = `#${newColor.toHex()}`
  }

  rst.alias.DEFAULT = rst.gradients[defaultShade]
  rst.aliasMap.DEFAULT = defaultShade
  rst.darkAliasMap.DEFAULT = totalShades - defaultShade + 1

  for (let l = defaultIndex + 1; l < emphasisLevels.length; l++) {
    const curLevel = emphasisLevels[l]
    const reflectLevel = defaultShade + (l - defaultIndex)
    const target = rst.gradients[reflectLevel]
    if (!target) break
    rst.alias[curLevel] = target
    rst.aliasMap[curLevel] = reflectLevel
    rst.darkAliasMap[curLevel] = totalShades - reflectLevel + 1
  }

  for (let l = defaultIndex - 1; l >= 0; l--) {
    const curLevel = emphasisLevels[l]
    const reflectLevel = defaultShade - (defaultIndex - l)
    const target = rst.gradients[reflectLevel]
    if (!target) break
    rst.alias[curLevel] = target
    rst.aliasMap[curLevel] = reflectLevel
    rst.darkAliasMap[curLevel] = totalShades - reflectLevel + 1
  }

  ACCENT_MAP[name] = rst

  // console.log(rst)

  return rst
}
