#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-unsafe-argument, no-implicit-coercion */

/**
 * Navigation Color Contrast Verification Script
 * Calculates WCAG contrast ratios for all navigation text colors
 */

// Color values from CSS variables (light theme)
const colors = {
  background: '#ffffff', // --dg-color-background-default

  // Primary Navigation
  navPrimaryDefault: '#1d1d1f',      // --dg-color-text-nav-default
  navPrimaryHover: '#003c90',        // --dg-color-text-nav-interaction-hover
  navPrimaryFocus: '#0055cc',        // --dg-color-text-nav-interaction-focus
  navPrimaryActive: '#002355',       // --dg-color-text-nav-interaction-active
  navPrimarySelected: '#002355',     // --dg-color-text-nav-state-selected

  // Secondary Navigation
  navSecondaryDefault: '#333336',   // --dg-color-text-nav-secondary-default
  navSecondaryHover: '#003c90',     // --dg-color-text-nav-secondary-interaction-hover
  navSecondaryFocus: '#0055cc',     // --dg-color-text-nav-secondary-interaction-focus
  navSecondaryActive: '#002355',    // --dg-color-text-nav-secondary-interaction-active
  navSecondarySelected: '#002355', // --dg-color-text-nav-secondary-state-selected

  // Tertiary Navigation
  navTertiaryDefault: '#48484d',    // --dg-color-text-nav-tertiary-default
  navTertiaryHover: '#333336',      // --dg-color-text-nav-tertiary-interaction-hover
  navTertiaryFocus: '#1d1d1f',      // --dg-color-text-nav-tertiary-interaction-focus
  navTertiaryActive: '#0055cc',    // --dg-color-text-nav-tertiary-interaction-active
  navTertiarySelected: '#002355'  // --dg-color-text-nav-tertiary-state-selected
}

/**
 * Convert hex to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

/**
 * Calculate relative luminance
 * Formula from WCAG 2.1: https://www.w3.org/WAI/GL/wiki/Relative_luminance
 */
function getRelativeLuminance(hex) {
  const rgb = hexToRgb(hex)
  if (!rgb) return 0

  // Normalize RGB values to 0-1
  const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
    val /= 255
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055)**2.4
  })

  // Calculate relative luminance
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 * Calculate contrast ratio
 * Formula: (L1 + 0.05) / (L2 + 0.05)
 * where L1 is the lighter color and L2 is the darker color
 */
function getContrastRatio(color1, color2) {
  const l1 = getRelativeLuminance(color1)
  const l2 = getRelativeLuminance(color2)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check WCAG compliance
 */
function checkWCAG(ratio, isLargeText = false) {
  const aaNormal = 4.5
  const aaLarge = 3.0
  const aaaNormal = 7.0
  const aaaLarge = 4.5

  const threshold = isLargeText ? aaLarge : aaNormal
  const aaaThreshold = isLargeText ? aaaLarge : aaaNormal

  if (ratio >= aaaThreshold) {
    return { level: 'AAA', compliant: true, type: isLargeText ? 'AAA (Large)' : 'AAA' }
  }

  if (ratio >= threshold) {
    return { level: 'AA', compliant: true, type: isLargeText ? 'AA (Large)' : 'AA' }
  }

  return { level: 'FAIL', compliant: false, type: isLargeText ? 'FAIL (Large)' : 'FAIL' }

}

/**
 * Format contrast ratio result
 */
function formatResult(textColor, bgColor, ratio, wcag) {
  const status = wcag.compliant ? '✅' : '❌'
  return {
    textColor,
    bgColor,
    ratio: ratio.toFixed(2),
    wcag: wcag.type,
    compliant: wcag.compliant,
    status
  }
}

// Calculate contrast ratios
const { background } = colors
const results = []

// Primary Navigation
results.push({
  variant: 'Primary Navigation',
  states: [
    formatResult('Default', background, getContrastRatio(colors.navPrimaryDefault, background), checkWCAG(getContrastRatio(colors.navPrimaryDefault, background))),
    formatResult('Hover', background, getContrastRatio(colors.navPrimaryHover, background), checkWCAG(getContrastRatio(colors.navPrimaryHover, background))),
    formatResult('Focus', background, getContrastRatio(colors.navPrimaryFocus, background), checkWCAG(getContrastRatio(colors.navPrimaryFocus, background))),
    formatResult('Active', background, getContrastRatio(colors.navPrimaryActive, background), checkWCAG(getContrastRatio(colors.navPrimaryActive, background))),
    formatResult('Selected', background, getContrastRatio(colors.navPrimarySelected, background), checkWCAG(getContrastRatio(colors.navPrimarySelected, background)))
  ]
})

// Secondary Navigation
results.push({
  variant: 'Secondary Navigation',
  states: [
    formatResult('Default', background, getContrastRatio(colors.navSecondaryDefault, background), checkWCAG(getContrastRatio(colors.navSecondaryDefault, background))),
    formatResult('Hover', background, getContrastRatio(colors.navSecondaryHover, background), checkWCAG(getContrastRatio(colors.navSecondaryHover, background))),
    formatResult('Focus', background, getContrastRatio(colors.navSecondaryFocus, background), checkWCAG(getContrastRatio(colors.navSecondaryFocus, background))),
    formatResult('Active', background, getContrastRatio(colors.navSecondaryActive, background), checkWCAG(getContrastRatio(colors.navSecondaryActive, background))),
    formatResult('Selected', background, getContrastRatio(colors.navSecondarySelected, background), checkWCAG(getContrastRatio(colors.navSecondarySelected, background)))
  ]
})

// Tertiary Navigation
results.push({
  variant: 'Tertiary Navigation',
  states: [
    formatResult('Default', background, getContrastRatio(colors.navTertiaryDefault, background), checkWCAG(getContrastRatio(colors.navTertiaryDefault, background))),
    formatResult('Hover', background, getContrastRatio(colors.navTertiaryHover, background), checkWCAG(getContrastRatio(colors.navTertiaryHover, background))),
    formatResult('Focus', background, getContrastRatio(colors.navTertiaryFocus, background), checkWCAG(getContrastRatio(colors.navTertiaryFocus, background))),
    formatResult('Active', background, getContrastRatio(colors.navTertiaryActive, background), checkWCAG(getContrastRatio(colors.navTertiaryActive, background))),
    formatResult('Selected', background, getContrastRatio(colors.navTertiarySelected, background), checkWCAG(getContrastRatio(colors.navTertiarySelected, background)))
  ]
})

// Output results
console.log('='.repeat(80))
console.log('NAVIGATION COLOR CONTRAST VERIFICATION')
console.log('='.repeat(80))
console.log(`Background Color: ${background} (--dg-color-background-default)`)
console.log(`WCAG AA Standard: 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt+ bold)`)
console.log(`WCAG AAA Standard: 7:1 for normal text, 4.5:1 for large text`)
console.log('='.repeat(80))
console.log()

results.forEach(({ variant, states }) => {
  console.log(`\n${variant}:`)
  console.log('-'.repeat(80))
  console.log('State'.padEnd(12) + 'Text Color'.padEnd(12) + 'Ratio'.padEnd(10) + 'WCAG'.padEnd(15) + 'Status')
  console.log('-'.repeat(80))

  states.forEach(state => {
    const ratio = parseFloat(String(state.ratio))
    const ratioStr = `${ratio}:1`.padEnd(10)
    const wcagStr = state.wcag.padEnd(15)
    console.log(
      state.textColor.padEnd(12) +
      state.textColor === 'Default' ? colors[`nav${variant.replace(' ', '')}Default`] : '' +
      ratioStr +
      wcagStr +
      state.status
    )
  })

  // Summary
  const allCompliant = states.every(s => s.compliant)
  const compliantCount = states.filter(s => s.compliant).length
  console.log(`\nSummary: ${compliantCount}/${states.length} states meet WCAG AA standards`)
  if (!allCompliant) {
    const failing = states.filter(s => !s.compliant)
    console.log(`⚠️  Failing states: ${failing.map(s => s.textColor).join(', ')}`)
  }
})

console.log('\n' + '='.repeat(80))
console.log('DETAILED RESULTS')
console.log('='.repeat(80))

// Map state names to color keys
const colorMap = {
  'Primary Navigation': {
    'Default': 'navPrimaryDefault',
    'Hover': 'navPrimaryHover',
    'Focus': 'navPrimaryFocus',
    'Active': 'navPrimaryActive',
    'Selected': 'navPrimarySelected'
  },
  'Secondary Navigation': {
    'Default': 'navSecondaryDefault',
    'Hover': 'navSecondaryHover',
    'Focus': 'navSecondaryFocus',
    'Active': 'navSecondaryActive',
    'Selected': 'navSecondarySelected'
  },
  'Tertiary Navigation': {
    'Default': 'navTertiaryDefault',
    'Hover': 'navTertiaryHover',
    'Focus': 'navTertiaryFocus',
    'Active': 'navTertiaryActive',
    'Selected': 'navTertiarySelected'
  }
}

results.forEach(({ variant, states }) => {
  console.log(`\n## ${variant}\n`)
  states.forEach(state => {
    const colorKey = colorMap[variant]?.[state.textColor] || 'N/A'
    const colorValue = colors[colorKey] || 'N/A'
    console.log(`**${state.textColor} State:**`)
    console.log(`- Text Color: \`${colorValue}\``)
    console.log(`- Background: \`${background}\``)
    console.log(`- Contrast Ratio: **${state.ratio}:1**`)
    console.log(`- WCAG Compliance: **${state.wcag}** ${state.status}`)
    console.log()
  })
})

// Overall summary
const allStates = results.flatMap(r => r.states)
const totalStates = allStates.length
const compliantStates = allStates.filter(s => s.compliant).length
const failingStates = allStates.filter(s => !s.compliant)

console.log('\n' + '='.repeat(80))
console.log('OVERALL SUMMARY')
console.log('='.repeat(80))
console.log(`Total States Tested: ${totalStates}`)
console.log(`✅ Compliant (WCAG AA): ${compliantStates}`)
console.log(`❌ Non-Compliant: ${failingStates.length}`)

if (failingStates.length > 0) {
  console.log('\n⚠️  NON-COMPLIANT STATES:')
  failingStates.forEach(state => {
    const variant = results.find(r => r.states.includes(state))?.variant || 'Unknown'
    console.log(`  - ${variant}: ${state.textColor} (${state.ratio}:1)`)
  })
  console.log('\n💡 RECOMMENDATIONS:')
  console.log('  - Consider using these colors only for large text (18pt+ or 14pt+ bold)')
  console.log('  - Or use them only for non-essential/supplementary content')
  console.log('  - Or adjust colors to meet WCAG AA standards')
} else {
  console.log('\n✅ All navigation text colors meet WCAG AA contrast requirements!')
}

console.log('='.repeat(80))

