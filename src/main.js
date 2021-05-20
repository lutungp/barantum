import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import 'bootstrap'
import io from 'socket.io-client';

Vue.use(ElementUI, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  data: {
    message: '',
    socket : process.env.VUE_APP_SOCKET_LINK
  },
  io : false,
  render: h => h(App),

  created ()  {
      var me = this;
      if (me.socket != 'false') {
          me.io= io(me.socket);
      }
  }

})
