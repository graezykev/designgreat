#!/usr/bin/env node
import { program } from 'commander'

import { copyAll } from './lib/copy-all.js'

program
  .name('dg-copy-all')
  .description('Copy all assets (brand + fonts) from @designgreat/lib-design-token')
  .argument('<dest>', 'Destination directory')
  .action((dest: string) => {
    copyAll(dest)
  })

program.parse()
