import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
// ElementUI 注册
Vue.use(ElementUI);
// 移动端弹窗
// import "vue-layer-mobile/need/layer.css";
// import layer from "vue-layer-mobile";
// Vue.use(layer);
// 引入mockjs
// require('./mock.js')
import 'element-ui/lib/theme-chalk/index.css'
import "vant/lib/index.less";
// 引入全局样式
import "./assets/index.scss";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
