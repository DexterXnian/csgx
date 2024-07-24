import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Point from '../components/Point.vue';

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

// 跳转之后重置界面大小
router.afterEach((to, from) => {
  // 基准
  const baseSize = 64
  // 设置 rem 函数
  function setRem() {
    // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 1920
    // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
  }
  setRem()
})

export default router;
