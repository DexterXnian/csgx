import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../components/Home3.vue';
import Point from '../components/Point.vue';
import Home from '../components/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/point/:point',
    name: 'Point',
    component: Point,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
