// This file configures a web server for testing the production build
// on your local machine.

import browserSync from 'browser-sync'
import historyApiFallback from 'connect-history-api-fallback'
import { chalkProcessing } from './chalkConfig'
import project from '../config/project'

/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'))

const browserSyncPort = project.port.browserSync
// Run Browsersync
browserSync({
  port: project.port.build,
  ui: browserSyncPort ? {
    port: browserSyncPort
  } : false,
  server: {
    baseDir: 'dist'
  },

  files: [
    'src/*.html'
  ],

  middleware: [historyApiFallback()]
})
