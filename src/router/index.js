import Vue from 'vue'
import Router from 'vue-router'
import Account from '@/components/Account'
import Home from '@/components/Home'
import Mail from '@/components/Mail'
import Summary from '@/components/Summary'
import NewMail from '@/components/NewMail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'mail/new',
          name: 'new',
          component: NewMail
        },
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
