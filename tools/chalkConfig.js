// Centralized configuration for chalk, which is used to add color to console.log statements.
import chalk from 'chalk'

const chalkError = chalk.red
const chalkSuccess = chalk.green
const chalkWarning = chalk.yellow
const chalkProcessing = chalk.blue

export { chalkError, chalkSuccess, chalkWarning, chalkProcessing }
