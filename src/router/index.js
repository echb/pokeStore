import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import NotFound from '../views/NotFound.vue'
import singlePokemon from '../views/SinglePokemon.vue'
import { getCurrentUser } from '../store/auth'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // name: 'inde',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/pokemon/:id',
    name: 'singlePokemon',
    component: singlePokemon,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: NotFound
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
});

export default router
