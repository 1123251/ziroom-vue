import Vue from 'vue'
import VueRouter from 'vue-router'
import RentHouse from '../views/RentHouse'
import HomePage from '../views/HomePage.vue'
import RoomLanding from '../views/RoomLanding'
import Register from '../views/Register'
import Login from '../views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'homepage',
    component: HomePage
  },  {
    path: '/renthouse',
    name: 'renthouse',
    component: RentHouse
  },{
    path: '/roomlanding',
    name: 'roomlanding',
    component: RoomLanding
  },{
    path: '/login',
    name: 'login',
    component: Login
  },{
    path: '/register',
    name: 'register',
    component: Register
  },
 
  
]

const router = new VueRouter({
  routes
})

export default router
