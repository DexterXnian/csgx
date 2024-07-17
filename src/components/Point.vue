<template>
  <div class="point-container">
    <div class="header">
      <router-link to="/">
        <img src="@/assets/返回.svg" alt="Home" class="home-icon" />
      </router-link>
    </div>
    <div v-if="point">
      <CarouselComponent :images="point.images" />
    </div>
    
    <h1>{{ point ? point.点位 : '加载中...' }}</h1>
    
    <div v-if="point" class="point-details">
      <div class="original-site">原址: {{ point.原址 }}</div>
      <div class="address">地址: {{ point.地址 }}</div>
      <div class="description-card">
        <div class="description" v-html="formattedDescription"></div>
      </div>
      <h3>40年前后影像对比</h3>
      <ImageComparison :oldImage="point.oldImage" :newImage="point.newImage" />
    </div>
    <div v-else>
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import CarouselComponent from "./Carousel.vue";
import ImageComparison from "./ImageComparison.vue";

export default {
  name: "Point",
  components: {
    CarouselComponent,
    ImageComparison,
  },
  props: ["point"],
  setup(props) {
    const point = ref(null);

    const fetchPoint = async () => {
      try {
        const response = await fetch("/outputjson_point.json");
        const data = await response.json();

        console.log("Fetched data:", data); // 日志输出获取的数据

        if (Array.isArray(data)) {
          const foundPoint = data.find(p => p.点位 === props.point);
          console.log("Found point:", foundPoint); // 日志输出找到的点位

          if (foundPoint) {
            point.value = foundPoint;
          } else {
            console.error('Point not found:', props.point);
          }
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching point data:', error);
      }
    };

    onMounted(fetchPoint);
    const formattedDescription = computed(() => {
      return point.value ? point.value.描述.replace(/\n/g, '<br>') : '';
    });

    return { point, formattedDescription };
  },
};
</script>

<style scoped>
.header {
  position: absolute;
  top: 20px; /* 距离顶部的距离 */
  left: 20px; /* 距离左边的距离 */
  z-index: 1000; 
}

.home-icon {
  width: 24px; /* 调整图标的宽度 */
  height: 24px; /* 调整图标的高度 */
  filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5)); /* 添加阴影 */
  stroke: black; /* 为SVG添加边框 */
}

h1 {
  text-align: center;
  /* margin-left: 20px; */
  color: #333;
}

.carousel-container {
  width: 100%;
  height: 200px; /* 确保容器高度和轮播图一致 */
  overflow: hidden;
}

.point-container {
  background-color: aquamarine;
  background-image: url("@/assets/cool-background2.png");
  /* margin: 20px; */
}

.original-site {
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.address {
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
}

.description-card {
  background-color: white; /* 卡片背景色 */
  border: 2px solid #ddd; /* 卡片边框 */
  border-radius: 10px; /* 圆角 */
  padding: 20px; /* 内边距 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
  margin: 20px; /* 顶部外边距 */
}

.description {
  /* margin-top: 20px; */
  font-size: 14px;
  color: #444;
  text-align:justify;
}

</style>
