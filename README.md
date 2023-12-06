# 目录结构

```
.
├── CONTRIBUTING.md
├── CONTRIBUTORS.md
├── LICENSE
├── PULL_REQUEST_TEMPLATE.md
├── README.md
├── TODO.md
├── api               # API接口约定目录
│   ├── dev.js        # 前端接口配置，配合npm run start启动，npm run build:static打包
│   ├── index.js
│   ├── predev.js     # 后端接口配置，配合npm run start:dev启动，npm run build:dev打包
│   └── prod.js       # 线上接口配置，无启动配置，npm run build打包
├── appveyor.yml
├── config
│   ├── auth.js       # 后端权限映射文件
│   ├── project.js    # 项目配置，修改启动端口等
│   ├── role.js       # 角色预设文件，配合src/routes.js做路由权限配置
│   └── site.js       # 网站信息配置
├── docker
├── docs
├── mocks                    # 使用YApi后，本地mocks暂停使用
│   ├── json-server.mjs      # json server配置文件
│   └── public               # mocks数据配置，对应api/dev.js中的json文件接口
├── node_scripts             # 开发环境使用的node脚本
├── package-lock.json        # 项目package版本锁定文件
├── package.json             # 项目package
├── postcss.config.js        # postcss配置文件
├── src
│   ├── actions              # redux actions
│   │   ├── auth.js          # 用户信息
│   │   ├── config.js        # 系统配置
│   │   ├── home.js          # home页面
│   │   ├── init.js          # 系统初始化
│   │   └── organization.js  # 组织结构
│   ├── assets               # 图片等
│   │   ├── bg               # 登录页背景
│   │   ├── icon             # 常用icon
│   │   ├── level            # 等级icon
│   │   ├── logo             # 平台、媒体logo
│   │   └── menu             # 菜单icon配置
│   ├── components           # 公共组件
│   │   ├── App.js           # 路由渲染
│   │   ├── Bar.js           # 标题栏
│   │   ├── BtnLink.js       # 按钮链接
│   │   ├── ColorText.js     # 对大于或小于指定比例的文本变色
│   │   ├── Copy.tsx         # 复制
│   │   ├── CustomIcon.js    # 自定义icon
│   │   ├── FilterRow.js     # 筛选
│   │   ├── Gender.js        # 性别
│   │   ├── Init.js          # 初始化处理
│   │   ├── Layouts          # ui布局
│   │   ├── LeftRight.js     # 文本左右布局组件
│   │   ├── Link.js          # 跳转链接
│   │   ├── Loading          # Loading组件
│   │   ├── MixMultipleSelect.js    # 可混选Select
│   │   ├── Modal.js                # 弹窗
│   │   ├── ModalForm.js            # 表单弹窗
│   │   ├── Placeholder             # 占位组件
│   │   ├── Root.js                 # 主题、配置等注入
│   │   ├── Search.js               # 搜索组件
│   │   ├── SearchFilter.js         # 可搜索远程数据的Select
│   │   ├── Table.js                # 表格组件
│   │   ├── TableColumnFilter.js    # 表格列过滤
│   │   ├── TagSelect.js            # Tag选择器
│   │   ├── TooltipQuestion.js      # Tooltip组件
│   │   ├── Tp.js                   # 可截断指定文本行数的组件
│   │   ├── Upload                  # 上传组件
│   │   ├── UserPop                 # 站点右上角用户信息
│   │   ├── antd                    # 重写antd组件
│   │   ├── auth                    # 权限控制高阶组件
│   │   └── preview                 # 预览组件
│   ├── constants                   # redux constants
│   ├── hooks
│   │   ├── useApp.ts               # antd useApp
│   │   ├── useFIxedColumn.js       # 缓存表格列固定
│   │   ├── useKeyPress.js          # 按键监听
│   │   └── useSystemUserList.js    # 拉取系统用户列表
│   ├── index.ejs                   # 输出index.html
│   ├── index.js                    # js入口
│   ├── lib
│   │   ├── delay.js                # js delay
│   │   ├── download.ts             # 文件下载处理
│   │   ├── handleError.js          # 请求错误处理
│   │   ├── request.js              # 请求处理
│   │   └── requestInstance.js      # 请求实例配置
│   ├── pages                       # 页面文件
│   │   ├── 403.js
│   │   ├── 404.js
│   │   ├── 500.js
│   │   ├── HomePage.js
│   │   └── LoginPage.js
│   ├── reducers                    # redux reducer
│   ├── routes.js                   # 路由配置
│   ├── store
│   │   ├── appStore.js             # 导出全局可用的appStore
│   │   ├── auth.js                 # 权限表现处理
│   │   ├── configureStore.js       # redux configureStore
│   │   └── history.js              # 导出全局可用的history
│   ├── styled                      # styled-components组件
│   ├── styles                      # 项目样式一般使用styled-components配置，不使用css文件
│   ├── theme                       # 全局主题设置
│   ├── types                       # TypeScript types
│   ├── utils
│   │   ├── debounce.js             # 防抖和节流
│   │   ├── getApiFullPath.js       # 取API真实路径
│   │   ├── getStrWidth.js          # 计算字符宽度
│   │   ├── getUploadFiles.js       # 取上传后的文件列表
│   │   ├── gradientColors.js       # 生成渐变色
│   │   ├── isIE.js                 # 检查是否IE浏览器
│   │   ├── log.js                  # console.log格式化
│   │   ├── mapKeys.js              # List -> Map
│   │   ├── message.js              # postMessage, 消息跨Tab页处理
│   │   ├── np.js                   # NP数学计算
│   │   ├── parseNumber.js          # 数字格式化
│   │   ├── parsePost.js            # post字段处理
│   │   ├── parseTime.js            # 时间格式化
│   │   ├── pattern.js              # 常用正则
│   │   ├── quickSort.js            # 快速排序
│   │   ├── react-to-print.tsx      # 打印处理
│   │   ├── reverseModalConfirmBtn.js    # 交换Modal确认弹窗按钮位置
│   │   ├── setApp.js                    # 全局变量注入
│   │   ├── setCss.js                    # 全局CSS注入
│   │   ├── setJs.js                     # 全局脚本注入
│   │   ├── styled-px2vw.js              # 将css单位px->vw
│   │   ├── timeGreetings.js             # 欢迎语配置
│   │   └── unique.js                    # 去重
│   └── webpack-public-path.js
├── tools                           # 开发环境配置工具
│   ├── analyzeBundle.js            # 打包分析
│   ├── assetsTransformer.js
│   ├── build.js                    # NODE_ENV=production
│   ├── chalkConfig.js
│   ├── distServer.js               # RUNTIME_ENV=development, NODE_ENV=production; 使用api/dev.js
│   ├── enzymeTestAdapterSetup.js
│   ├── fileMock.js
│   ├── getRepoInfo.js              # 生成git信息
│   ├── nodeVersionCheck.js
│   ├── preServer.js                # RUNTIME_ENV=predev, NODE_ENV=development; 使用api/predev.js
│   ├── removeDemo.js
│   ├── srcServer.js                # RUNTIME_ENV=development, NODE_ENV=development; 使用api/dev.js
│   ├── startMessage.js
│   ├── updateEnvFile.js            # 更新RUNTIME_ENV
│   ├── updateRoutes.js             # 更新routes.js中路由引入写法
│   └── webpackPlugins
│       ├── sassVarsToLess.js
│       └── setVersion.js           # 写版本插件
├── tsconfig.json                   # TypeScript配置
├── webpack.config.dev.js           # NODE_ENV=development
└── webpack.config.prod.js          # NODE_ENV=production
```

# 环境配置

## 安装
`npm install`  
`npm run _install`  
`npm install --legacy-peer-deps`  

## 开发环境

`RUNTIME_ENV`确定接口运行环境`api/index.js`（前端、后端、线上），`NODE_ENV`确定 App 模式（开发、生产）。由`package.json`中`script`参数传入，通过`tools`下的启动入口处理。

- `npm run start`
  ```
  RUNTIME_ENV=development
  NODE_ENV=development
  ```
- `npm run start:dev`
  ```
  RUNTIME_ENV=predev
  NODE_ENV=development
  ```

## 打包环境

- `npm run build:static`
  ```
  RUNTIME_ENV=development
  NODE_ENV=production
  ```
- `npm run build:dev`
  ```
  RUNTIME_ENV=predev
  NODE_ENV=production
  ```
- `npm run build`
  ```
  RUNTIME_ENV=production
  NODE_ENV=production
  ```

# 权限和路由管理

## 权限

`config/auth.js`中定义系统全部权限集合，具体权限的值由后端定义。  
在 App 初始化时取到用户拥有的所有权限并渲染路由。因此路由文件的 auth 的值与该文件的值一一对应。  
页面中按钮等控件的可操作权限在 components/auth 中处理。

## 路由

路由配置在`src/routes.js`文件  
其中，auth 为 false 或空不校验权限；auth 是 true 表示仅校验是否登录；如果是字符串或其他值，除了会校验是否登录，还会校验是否有这个值代表的权限。
因热更新与`loadable`冲突，`NODE_ENV=production`时，会重写`routes.js`文件以支持`loadable`，因此请在 `IMPORT COMPONENTS BEGIN`和`IMPORT COMPONENTS END`之间引入组件，也不要删除或修改该注释。

# 发版与更新

`src/store/history.js, tools/webpackPlugins/setVersion.js`  
项目打包时，将当前开始打包的时间戳作为版本号写入`version.json`文件，前端路由切换会请求这个文件的版本信息，比对不一致后强刷当前页面重新获取资源。

# 以下依赖暂时不建议升级

- dependencies

1. history@4
2. react-router-dom@5

- devDependencies

1. chalk@4
