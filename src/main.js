import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Shoe from "./components/Shoe.vue";
import OrdersDetails from "./components/OrdersDetails.vue";
import Orders from "./components/Orders.vue";
import Login from "./components/Login.vue";
import AdjustPassword from "./components/AdjustPassword.vue";
import * as VueRouter from "vue-router";

const routes = [
    { path: '/', component: Login },

    { path: '/Orders', component: Orders, beforeEnter: (to, from, next) => {
        const isAdmin = localStorage.getItem('admin') === 'true';
            if (isAdmin) {
                next();
            } else {
                window.alert('You are not an admin. Access denied.');
                next('/Shoe');
            }
        }, 
    },

    { path: '/Orders/:id', component: OrdersDetails, beforeEnter: (to, from, next) => {
        const isAdmin = localStorage.getItem('admin') === 'true';
            if (isAdmin) {
                next();
            } else {
                window.alert('You are not an admin. Access denied.');
                next('/Shoe');
            }
        },  
    },

    { path: '/Shoe', component: Shoe },

    { path: '/AdjustPassword', component: AdjustPassword, beforeEnter: (to, from, next) => {
        const isAdmin = localStorage.getItem('admin') === 'true';
            if (isAdmin) {
                next();
            } else {
                window.alert('You are not an admin. Access denied.');
                next('/Shoe');
            }
        },  
    },
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(), //de url vanboven is history
    routes, // short for `routes: routes`
  })

  const app = createApp(App);
  app.use(router);
  app.mount('#app');