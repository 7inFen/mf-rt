/**
 * Auth config.
 */
import devConfig from './dev'
import preDevConfig from './predev'
import prodConfig from './prod'
const RUNTIME_ENV = process.env.RUNTIME_ENV || 'development'
const NODE_ENV = process.env.NODE_ENV
if (NODE_ENV === 'development') {
  console.log(`========= RUNTINE_ENV: ${RUNTIME_ENV} =========`)
}

export const apiConfig = {
  // ======================================================
  // Overrides when NODE_ENV === 'development'
  // ======================================================
  development: devConfig,

  // ======================================================
  // Overrides when NODE_ENV === 'predev'
  // ======================================================
  // test: preDevConfig,
  predev: preDevConfig,

  // ======================================================
  // Overrides when NODE_ENV === 'production'
  // ======================================================
  production: prodConfig
}

export const apiList = apiConfig[RUNTIME_ENV].apiList
export default apiConfig[RUNTIME_ENV]
