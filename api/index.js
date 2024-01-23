/**
 * Auth config.
 */
import project from '../config/project'
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
  production: prodConfig,

  pre: {
    ...preDevConfig,
    apiBaseUrl: project.api.pre,
    uploadFile: `${project.api.pre}/file/add`,
  },
  prod: {
    ...preDevConfig,
    apiBaseUrl: project.api.prod,
    uploadFile: `${project.api.prod}/file/add`,
  },
}

export const apiList = apiConfig[RUNTIME_ENV].apiList
export default apiConfig[RUNTIME_ENV]
