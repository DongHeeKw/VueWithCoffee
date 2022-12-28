// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Cookies from 'js-cookie'

Vue.config.productionTip = false


// // 쿠키에 저장된 토큰을 사용하여 인증
// // app이 초기화 될 때 수행되어야 하므로 main.js에서 실시
// const savedToken = Cookies.get('accessToken')
// if (savedToken) {
//   store.dispatch('signinByToken', savedToken)
// }
function init () {
  const savedToken = Cookies.get('accessToken')
  if(savedToken) {
    // 저장된 토큰이 존재한다면 signinByToken 액션을 반환한다.
    return store.dispatch('signinByToken', savedToken)
  } else {
    // 토큰이 존재하지 않는다면 바로 Promise를 성공시킨다.
    return Promise.resolve()
  }
}

// 토큰의 확인을 반드시 "먼저" 확인한 후에
// then 페이지를 정상적으로 생성.
/* eslint-disable no-new */
//init.then(res => {
init().then(() => {
    new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})