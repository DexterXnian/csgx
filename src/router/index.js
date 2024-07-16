import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Region from '../components/Region.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/region/:regionName',
    name: 'Region',
    component: Region,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
