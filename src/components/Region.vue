<template>
  <div>
    <h1>{{ regionName }}</h1>
    <router-link to="/">返回首页</router-link>
    <div v-if="points.length">
      
      <ul>
        <li v-for="point in points" :key="point.id">
          <CarouselComponent :images="point.images" />
          <strong>{{ point.点位 }}</strong
          ><br />
          原址: {{ point.原址 }}<br />
          地址: {{ point.地址 }}<br />
          <!-- X: {{ point.X }}, Y: {{ point.Y }}<br /> -->
          {{ point.描述 }}<br />
        </li>
      </ul>
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>
  
  <script>
import { ref, onMounted } from "vue";
import CarouselComponent from "./Carousel.vue";

export default {
  name: "Region",
  components: {
    CarouselComponent,
  },
  props: ["regionName"],
  setup(props) {
    const points = ref([]);

    onMounted(async () => {
      const response = await fetch("/outputjson_area.json");
      const data = await response.json();
      points.value = data[props.regionName] || [];
    });

    return { points };
  },
};
</script>
  
  <style scoped>
h1 {
  text-align: center;
  background-image: url("/src/assets/regions/徐汇区.jpg");
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

.carousel-container {
  width: 100%;
  height: 300px; /* 确保容器高度和轮播图一致 */
  overflow: hidden;
}

@media (max-width: 600px) {
  .carousel-container {
    height: 200px; /* 在小屏幕上调整高度 */
  }

  .point-item {
    margin: 10px 0;
  }

  h1 {
    font-size: 1.5em; /* 调整标题大小 */
  }
}
</style>
  