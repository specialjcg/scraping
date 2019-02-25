import Vue from "vue";
import App from "./App.vue";
import VueSocketIO from "vue-socket.io";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "http://localhost:3000/"
  })
);
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
