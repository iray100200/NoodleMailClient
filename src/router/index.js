import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Mail from '@/components/Mail'
import Summary from '@/components/Summary'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: 'mail/:target',
          component: Summary
        },
        {
          path: 'mail/:target/:id',
          component: Mail
        },
        {
          path: '*',
          redirect: 'mail/inbox'
        }
      ]
    }
  ]
})
