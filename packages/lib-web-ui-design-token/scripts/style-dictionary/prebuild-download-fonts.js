import fs from 'fs'
import https from 'https'
import path from 'path'
import { fileURLToPath } from 'url'

import tokens from '../../src/tokens/typography/font-weight.js'

const RobotoSource = 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'

// traverse and down load every font file
const request = https.get(RobotoSource, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36 Edg/132.0.0.0'
  }
}, res => {
  let cssText = ''
  res.on('data', chunk => {
    cssText += chunk
  })
  res.on('end', async () => {
    try {
      await processAndDownload(cssText)
    } catch (error) {
      console.warn('[design-token-support] Failed fetching Roboto CSS, skipping font download.', error)
    }
  })
})

request.on('error', (error) => {
  console.warn('[design-token-support] Failed to download Roboto fonts:', error.message)
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const fontFileDir = path.resolve(__dirname, '../../assets/fonts')
if (!fs.existsSync(fontFileDir)) {
  fs.mkdirSync(fontFileDir, { recursive: true })
}

const weights = tokens['font-weight']
const weightMap = Object.keys(weights).reduce((map, weight) => {
  map[weights[weight].value] = weight
  return map
}, {})

async function processAndDownload(cssText) {
  const regExp =
    /\/\*\s*([^\s]+)\s*\*\/[\s\S]*?font-family:\s*['"]([^'"]+)['"];[\s\S]*?font-style:\s*([\w-]+);[\s\S]*?font-weight:\s*(\d+);[\s\S]*?src:\s*url\((?:['"])?([^'")\s]+)(?:['"])?\)/i
  const regExpGlobal = new RegExp(regExp, 'g')

  // console.log(cssText)

  const allFaces = cssText.match(regExpGlobal) ?? []

  if (allFaces.length === 0) {
    console.warn('[design-token-support] No font-face definitions found in Roboto CSS response.')
    return
  }

  await Promise.all(
    allFaces.map(async face => {
      const match = face.match(regExp)
      if (!match) {
        return
      }

      const [, lang, name, style, weightValue, url] = match
      if (!url) {
        console.warn(`[design-token-support] Missing font URL for ${name}-${lang}-${style}`)
        return
      }

      const safeUrl = String(url)
      const weight = weightMap[weightValue]
      const fontName = `${name}-${lang}-${weight}-${style}`
      await downloadFromURL(safeUrl, path.resolve(fontFileDir, fontName))
    })
  )
  console.log('Downloaded fonts success')
}

/**
 * @param {string} url
 * @param {string} filePath
 */
async function downloadFromURL(url, filePath) {
  return new Promise((resolve, reject) => {
    const extensionMatch = /\.\w+$/.exec(url)
    const resolvedPath = `${filePath}${extensionMatch ? extensionMatch[0] : ''}`

    if (fs.existsSync(resolvedPath)) {
      fs.unlinkSync(resolvedPath)
    }

    const requestUrl = new URL(url)

    const request = https.get(requestUrl, res => {
      const writeStream = fs.createWriteStream(resolvedPath)
      res.pipe(writeStream)

      writeStream.on('finish', () => {
        writeStream.close()
        resolve()
      })

      writeStream.on('error', error => {
        writeStream.close()
        console.warn('Downloaded fail from: ', requestUrl.href)
        reject(error)
      })
    })

    request.on('error', (error) => {
      console.warn('Request failed for: ', requestUrl.href)
      reject(error)
    })
  })
}
