import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView/HomeView.vue';
import AboutView from '../views/AboutView/AboutView.vue';
import PortfolioView from '../views/PortfolioView/PortfolioView.vue';
import ContactsView from '../views/ContactsView/ContactsView.vue';

const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/',
            name:'Home',
            component:HomeView
        },
        {
            path:'/about',
            name:'About',
            component:AboutView
        },
        {
            path:'/portfolio',
            name:'Portfolio',
            component:PortfolioView
        },
        {
            path:'/contacts',
            name:'Contacts',
            component:ContactsView
        }
    ]
});

export default router;
