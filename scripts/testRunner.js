'use strict'

process.env.NODE_ENV = 'test'
process.env.PUBLIC_URL = ''

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', (err) => {
  throw err
})

// Load environment variables from .env file. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({ silent: true })

const jest = require('jest')
const argv = process.argv.slice(2)

// Watch unless on CI or in coverage mode
if (!process.env.CI && argv.indexOf('--coverage') < 0) {
  argv.push('--watch')
}

// @remove-on-eject-begin
// This is not necessary after eject because we embed config into package.json.
const createJestConfig = require('../utils/createJestConfig')
const path = require('path')
const paths = require('../config/paths')
argv.push(
  '--config',
  JSON.stringify(
    createJestConfig(
      relativePath => path.resolve(__dirname, '..', relativePath),
      path.resolve(paths.appSrc, '..'),
      false
    )
  )
)

jest.run(argv)
