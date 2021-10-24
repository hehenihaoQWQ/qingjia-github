import Vue from 'vue'
import VueRouter from 'vue-router'
import Profile from '@/views/profile/Profile'
import _404 from '@/views/404'
import Home from '../views/Home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/profile',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import('@/views/profile/Profile.vue')
    component: Profile
  },
  {
    path: '/404',
    component: _404
  }
]

const router = new VueRouter({
  // 打包成app状态下需注释mode
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// export default new VueRouter({
//   routes: [
//     {
//       path: '/profile',
//       name: 'Profile',
//       component: Profile
//     }
//   ],
//   mode: 'history'
// })