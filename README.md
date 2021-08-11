# 目录结构

```
.
├── api
│   ├── apiList.js     # 导出apiList
│   ├── index.js       # 根据运行环境RUNTIME_ENV选择使用下列哪个接口配置，详见环境配置
│   ├── dev.js         # 前端接口配置，配合npm run start启动，npm run build:static打包
│   ├── predev.js      # 后端接口配置，配合npm run start:dev启动，npm run build:dev打包
│   └── prod.js        # 线上接口配置，无启动配置，npm run build打包
├── config
│   ├── auth.js        # 系统内所有权限集合
│   ├── project.js     # 项目配置
│   ├── site.js        # 网站配置
│   └── notice.js      # 系统右上角消息处理跳转配置
├── dist
│   └── version.json   # 打包时自动生成，用于版本更新后强刷新用户ui
├── docker
├── docs
├── mocks
│   ├── json-server.js  # json server配置文件
│   └── public          # mocks数据配置，对应api/dev.js
├── package-lock.json
├── package.json
├── src
│   ├── actions         # redux action
│   ├── assets          # assets
│   ├── components
│   │   ├── App.js      # 路由渲染
│   │   ├── Init.js     # 初始化处理
│   │   ├── Layouts     # ui布局
│   │   ├── Loading     # 全局loading效果
│   │   └── Root.js     # 主题、配置等注入
│   ├── constants       # redux constants
│   ├── index.ejs       # index.html模版文件
│   ├── index.js        # 项目入口
│   ├── lib
│   │   ├── delay.js            # 延时，Root.js使用
│   │   ├── handleError.js      # request error 处理
│   │   ├── request.js          # 请求封装
│   │   └── requestInstance.js  # axios请求实例
│   ├── pages                   # 页面入口
│   ├── reducers                # redux reducer
│   ├── routes.js               # 路由配置
│   ├── store
│   │   ├── appStore.js         # 导出全局可用的appStore
│   │   ├── auth.js             # 权限表现处理
│   │   ├── configureStore.js   # redux configureStore
│   │   └── history.js          # 导出全局可用的history
│   ├── styled                  # styled-components组件
│   ├── theme                   # 全局主题设置
│   │   ├── index.js            # 可通过styled-components取到
│   │   └── index.less          # antd主题覆盖
│   ├── types
│   ├── utils
│   │   ├── download.js         # 文件下载的处理
│   ├── version.json            # 打包时生成的版本信息，会自动拷贝到dist目录
│   └── webpack-public-path.js
├── tools
│   ├── analyzeBundle.js
│   ├── assetsTransformer.js
│   ├── build.js                # NODE_ENV=production
│   ├── chalkConfig.js
│   ├── distServer.js
│   ├── enzymeTestAdapterSetup.js
│   ├── fileMock.js
│   ├── nodeVersionCheck.js
│   ├── preServer.js            # RUNTIME_ENV=predev, NODE_ENV=development; 使用api/predev.js
│   ├── removeDemo.js
│   ├── srcServer.js            # RUNTIME_ENV=development, NODE_ENV=development; 使用api/dev.js
│   ├── startMessage.js
│   ├── updateEnvFile.js        # 更新RUNTIME_ENV
│   ├── updateRoutes.js         # NODE_ENV=production时更新routes.js中路由为分包写法
│   └── webpackPlugins
│       ├── sassVarsToLess.js   # sass转less插件
│       └── setVersion.js       # 写版本插件
├── tsconfig.json
├── webpack.config.dev.js       # NODE_ENV=development
└── webpack.config.prod.js      # NODE_ENV=production
```

# 环境配置

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

1. query-string@5.1.1 v6 在 ie11 下有兼容问题
2. history 保持 4.10.1 版本

- devDependencies

1. @babel/core@7.7.7 升级到 v7.8.0 及以上版本，js 无法编译通过
2. less-loader@5.0.0 升级到 v6，需要修改 webpack.config 对应配置，而且与hard-source-webpack-plugin@0.13.1不兼容
