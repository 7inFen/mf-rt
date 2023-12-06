/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

import project from './config/project'
const px2vw = !!project.viewportWidth

const plugins = [
  require('autoprefixer')()
]
if (px2vw) {
  plugins.push(
    require('postcss-px-to-viewport')({
      viewportWidth: project.viewportWidth,
      // 加入下行会使插件不工作？
      // selectorBlackList: ['no-px-to-vw', /^\.ant-.+$/, /^\.am-.+$/],
      mediaQuery: true
      // fontViewportUnit: 'vmin',
    })
  )
}

module.exports = () => ({
  // The list of plugins for PostCSS
  // https://github.com/postcss/postcss
  plugins
});
