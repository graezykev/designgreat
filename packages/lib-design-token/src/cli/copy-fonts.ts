#!/usr/bin/env node
import { program } from 'commander'

import { copyFonts } from './lib/copy-fonts.js'

program
  .name('dg-copy-fonts')
  .description('Copy font assets (font-face.css + woff2 files) from @designgreat/lib-design-token')
  .argument('<dest>', 'Destination directory')
  .action((dest: string) => {
    copyFonts(dest)
  })

program.parse()
