import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mail from '@/components/Mail'
import New from '@/components/New'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'mail/:target',
          component: Mail
        },
        {
          path: 'mail/:target/:id',
          component: Mail
        },
        {
          path: 'new',
          component: New
        },
        {
          path: '*',
          redirect: 'mail/inbox'
        }
      ]
    }
  ]
})
