#!/usr/bin/env node
import { program } from 'commander'

import { copyBrandAssets } from './lib/copy-brand-assets.js'

program
  .name('dg-copy-brand')
  .description('Copy brand assets (logo.svg) from @designgreat/lib-design-token')
  .argument('<dest>', 'Destination directory')
  .action((dest: string) => {
    copyBrandAssets(dest)
  })

program.parse()
