# vue-todolist
## 目录
1. 通过webpack搭建vue工程;
2. .vue文件开发模式;
3. vue使用jsx进行开发的方式;
4. vue组件间通信的基本方式;
5. webpack打包优化的基本点

## 通过webpack搭建vue工程
  根目录webpack.config.js
  ```javascript
  const config = {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
      filename: 'bundle.js',
      path: path.join(__dirname, 'dist'),
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          }
        ]
      }
    }
  }
  ```
  查看更多[webpack.config.js](https://github.com/chinadbo/vue-webpack-demo/blob/master/webpack.config.js)

## .vue文件开发模式
  在入口index.js文件中，声明Vue，并且挂在到$el元素上。
  ```javascript
  new Vue({
    render: (h) => h(App)
  }).$mount($el)
  ```
  熟悉Vue之后可使用Vue官方推荐路由Vue-router
  ```javascript
  import Vue from 'vue'
  import App from './App'
  import router from './router'

  Vue.config.productionTip = false

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
  })
  ```
  组件 (Component) 是 Vue.js 最强大的功能之一。组件可以扩展 HTML 元素，封装可重用的代码。在较高层面上，组件是自定义元素，Vue.js 的编译器为它添加特殊功能。在有些情况下，组件也可以表现为用 is 特性进行了扩展的原生 HTML 元素。

  所有的 Vue 组件同时也都是 Vue 的实例，所以可接受相同的选项对象 (除了一些根级特有的选项) 并提供相同的生命周期钩子。

  ```javascript
  import Header from './todo/header.vue' // 引入组件
  export default {
    components: {
      Header,
    }
  }
  ```
  ```html
  <template>
    <div id='app'>
      <Header/>  <!-- Header组件 -->
  </template>
  ```

### css预处理、后处理
  开发过程中使用Sass、Less、Stylus等css预处理
  ```javascript
  // webpack.config.js
  {
    // 基本的css loader
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader'
    ]
  },
  {
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  }
  ```
  更进一步，加载postcss后处理器
  ```javascript
  // webpack.config.js
  {
    test: /\.styl$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
        }
      },
      'stylus-loader'
    ]
  }
  ```
  根目录新建postcss.config.js配置文件
  ```javascript
  const autoprefixer = require('autoprefixer') // 加载autoprefixer（浏览器兼容前缀）
  module.exports = {
    plugins: [
      autoprefixer()
    ]
  }
  ```