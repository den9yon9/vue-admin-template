# web管理后台模板

> 基于Vue框架封装了后台管理网站常用的功能，无需重复编写底层基础逻辑


### 实现功能有
1. 登陆功能
2. 菜单配置，页面路由跳转
3. 业务数据增删改查
4. 实时消息推送

### 抽取的组件与模块有
1. Selector选择器组件
2. Dialog对话框组件
3. Datepicker日期选择器组件
4. NavCol, NavRow导航组件
5. 下滑触底加载模块
6. 模态框插件
7. toasted插件
8. 网络请求插件
9. 路由配置模块

### 目录结构
├── build                                                // vue-cli webpack配置文件
│   ├── build.js
│   ├── check-versions.js
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config                                            // vue-cli webpack配置文件
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.html                                   //  项目打包根文件
├── package.json                              //  包描述文件
├── package-lock.json
├── README.md                              //  项目描述文档
├── src                                                 //  项目资源目录
│   ├── App.vue
│   ├── assets                                     //  存放静态资源
│   │   ├── bg.png
│   │   ├── cancel.png
│   │   ├── empty.png
│   │   ├── logo.png
│   │   ├── logout.png
│   │   ├── search.png
│   │   └── user.png
│   ├── components                       //  提取得Vue组件
│   │   ├── ItemEditor.vue             //  业务数据新增，修改的编辑组件
│   │   ├── Item.vue                         //  业务数据组件
│   │   ├── NavCol.vue                    //   一级菜单组件
│   │   ├── NavRow.vue                  //   二级菜单组件
│   │   └── ToolBar.vue                   //   工具条组件，筛选组件
│   ├── main.js                                  //   项目打包入口文件
│   ├── pages                                    //    页面组件
│   │   ├── Home.vue                      //    主页面（1级路由）
│   │   ├── Login.vue                       //	  登录页（1级路由）			
│   │   ├── NotFound404.vue       //    404页面（1级路由）
│   │   ├── SomethingList.vue      //    二级业务页面模板，根据一级菜单数量增加（2级路由）
│   │   └── Something.vue            //    三级业务页面模板，根据二级菜单数量增加（3级路由）
│   ├── plugins                                //    插件目录
│   │   ├── axios.js                          //    封装网络请求接口
│   │   ├── modal.js                       //     封装模态框
│   │   └── util.js                             //     封装工具库
│   ├── router                                //     路由相关
│   │   ├── addRouter.js              //    动态设置路由
│   │   └── index.js                                             
│   ├── store
│   │   └── index.js                        //     全局数据
│   └── ws.js                                   //    封装websocket实时消息推送
└── static                                       //      项目静态资源
    ├── browser.html                    //     浏览器兼容提示页面
    └── env.js                                    //     环境配置文件



### 开发
1. cmd到项目目录下执行 npm i  安装依赖
2. 执行 npm run dev
3. 浏览器打开 localhost:8080 即可预览
4. 业务开发参见项目代码注释


### 生产
1. cmd到项目目录下执行 npm run build
2. 将build出的dist目录部署到服务器相关目录下


### 测试
1.安装nodejs
2.安装http-server包
3.在build出的dist目录下执行hs命令，即可开始测试