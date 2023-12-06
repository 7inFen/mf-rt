import project from '../../config/project'

const setApp = (params = {}) => {
  const globalName = project.globalKeyName
  const _APP = window[globalName] || {}
  window[globalName] = {
    ..._APP,
    ...project.globals,
    // buildTime: new Date(project.globals.PROJECT_BUILD_VERSION),
    ...params,
  }
}

export default setApp
