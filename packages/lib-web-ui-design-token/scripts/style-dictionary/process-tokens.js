/**
 * @param {Record<string, unknown>} tokens
 */
export function extractTokenValue(tokens) {
  return Object.entries(tokens).reduce((rst, [key, node]) => {
    const normalizedKey = key.replace(/\./g, '-')

    if (node && typeof node === 'object' && 'value' in node) {
      const typedNode = /** @type {{ value?: unknown }} */ (node)
      if (typeof typedNode.value !== 'undefined') {
        rst[normalizedKey] = typedNode.value
        return rst
      }
    }

    if (node && typeof node === 'object') {
      rst[normalizedKey] = extractTokenValue(/** @type {Record<string, unknown>} */ (node))
    }

    return rst
  }, /** @type {Record<string, unknown>} */ ({}))
}

/**
 * @param {Record<string, unknown>} token
 * @param {string} prefix
 */
export function traverseFlattenTokens(token, prefix = '') {
  const normalizedPrefix = prefix ? `${prefix}-` : ''
  return Object.entries(token).reduce((rst, [key, node]) => {
    const path = `${normalizedPrefix}${key.replace(/\./g, '-')}`

    if (node && typeof node === 'object' && 'value' in node) {
      const typedNode = /** @type {{ value?: unknown }} */ (node)
      if (typeof typedNode.value !== 'undefined') {
        rst[path] = typedNode.value
        return rst
      }
    }

    if (node && typeof node === 'object') {
      Object.assign(
        rst,
        traverseFlattenTokens(/** @type {Record<string, unknown>} */ (node), path)
      )
    }

    return rst
  }, /** @type {Record<string, unknown>} */ ({}))
}

/*
const obj = {
  a: {
    b: {
      c: {
        value: 1
      }
    },
    d: {
      value: 2
    }
  },
  e: {
    value: 3
  }
}

console.log(
  JSON.stringify(
    traverseFlattenTokens(obj)
  ) ===
  JSON.stringify({
    'a-b-c': 1,
    'a-d': 2,
    'e': 3
  })
)
*/
