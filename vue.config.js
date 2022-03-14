module.exports = {
  //lintOnSave: false,
  publicPath: '/',
  pages: {
      index: {
          // page 的入口
          entry: './src/pages/main.js',
          // 模板来源
          template: './public/index.html',
          // 在 dist/index.html 的输出
          filename: 'index.html',
          // 当使用 title 选项时，
          // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: '首页',
      },
      user: {
          // page 的入口
          entry: './src/pages/user.js',
          // 模板来源
          template: './public/user.html',
          // 在 dist/index.html 的输出
          filename: 'user.html',
          // 当使用 title 选项时，
          // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: '个人中心',
      },
  },
  lintOnSave:false,

  // devServer:{
  //     proxy:'http://www.baidu.com'
  // },

  devServer: {
    proxy: {
        '/api': {
            // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
            target: 'http://jwgl.cqjtu.edu.cn',
            // 允许跨域
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': ''
            }
        }
    }
}


  
}