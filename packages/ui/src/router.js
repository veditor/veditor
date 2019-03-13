import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/list',
      name: 'list',
      component: () => import('./views/List')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('./views/Form')
    },
    {
      path: '/icon',
      name: 'icon',
      component: () => import('./views/Icon')
    },
    {
      path: '/bar',
      name: 'bar',
      component: () => import('./views/Bar')
    }
  ]
})
