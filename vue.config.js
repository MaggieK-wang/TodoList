const { city } = require("./mockData");

const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  // lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    before(app) {
      app.post("/api/city/getList", (req, res) => {
        res.json(city);
      });
      // 删除数据
      app.post("/api/todoList/deleteTodo", (req, res) => {
        res.json({
          msg: "删除成功",
          code: 1,
          success: true,
          data: {
            id: ''
          },
        });
      });
    },
  },
  // 路径别名
  chainWebpack(config) {
    config.resolve.alias.set("@", resolve("src"));
  },
  configureWebpack: {
    resolve: {
      alias: {
        vue$: "vue/dist/vue.esm.js",
      },
    },
  },
};
