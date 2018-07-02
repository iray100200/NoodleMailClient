import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mail from '@/components/Mail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: Home,
      children: [
        {
          name: 'mail',
          path: 'mail/:id',
          component: Mail
        }
      ]
    }
  ]
})
