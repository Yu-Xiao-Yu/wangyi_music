# 网易云音乐（移动端）

项目介绍：网易云音乐移动端，发现歌单，展示歌单里面歌曲，音乐的播放、暂停、切歌以及播放界面（利用官方API文档来实现）

技术栈：Vue2+Axios+Vue-Router+Vuex+ ES6+ CSS3+Vant+ iconfont

技术：
1.	用DIV+CSS进行flex页面布局（用到less写法）
2.	使用 Axios 来请求数据并渲染页面
3.	使用Vant实现轮播效果、底部弹出层实现播放界面
4.	用Javascript, CSS3实现了播放界面的指针的摆动、图片的旋转动态效果
5.	用Vue-Router来实现跳转和权限控制效果

缺点：
1. 本项目用的是Vue3-cil，但项目大部分用Vue2写（注：现实开发中，建议Vue2，Vue3不可混用）
    （理由：想练习一下Vue3写法，后续会逐步修改成Vue3写法）

2. Vuex还没又组件模块化，现在数据显的很混乱

3. 还有很多BUG还没有修改，可能自己知识面不够，完善的进度不如人意
    (注：登录api接口有时候不太正常，所以我注释掉了路由守卫)

首先

安装网易云音乐 NodeJS 版 API（地址：https://binaryify.github.io/NeteaseCloudMusicApi/#/）

$ git clone git@github.com:Binaryify/NeteaseCloudMusicApi.git
$ cd NeteaseCloudMusicApi
$ npm install
运行
$ node app.js
服务器启动默认端口为 3000, 若不想使用 3000 端口 , 可使用以下命令 : Mac/Linux

$ PORT=4000 node app.js
windows 下使用 git-bash 或者 cmder 等终端执行以下命令 :

$ set PORT=4000 && node app.js
服务器启动默认 host 为 localhost,如果需要更改, 可使用以下命令 : Mac/Linux

$ HOST=127.0.0.1 node app.js
windows 下使用 git-bash 或者 cmder 等终端执行以下命令 :

$ set HOST=127.0.0.1 && node app.js

然后打开本项目
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# wangyi_music
