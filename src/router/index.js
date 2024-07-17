import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Point from '../components/Point.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
