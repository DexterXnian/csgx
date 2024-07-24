<template>
  <div
    class="point-container"
    :style="{ backgroundImage: `url(${point?.background_img})` }"
  >
    <div class="header">
      <router-link to="/">
        <img src="@/assets/返回.svg" alt="Home" class="home-icon" />
      </router-link>
      <h1>{{ point ? point.点位 : "加载中..." }}</h1>
    </div>
    <div class="background-overlay">
      <div v-if="point" class="carousel-top">
        <CarouselComponent :images="point.images" />
      </div>

      <div v-if="point" class="point-details">
        <div class="original-site">原址: {{ point.原址 }}</div>
        <div class="address">地址: {{ point.地址 }}</div>

        <div class="description-card" v-if="point.描述1">
          <div
            class="description"
            v-html="point.描述1.replace(/\n/g, '<br>')"
          ></div>
        </div>

        <div v-if="point" class="carousel-middle">
          <span class="label">现场图</span>
          <CarouselComponent :images="point.live_images" />
        </div>

        <div class="description-card" v-if="point.描述2">
          <div
            class="description"
            v-html="point.描述2.replace(/\n/g, '<br>')"
          ></div>
        </div>

        <h3>40年前后影像对比</h3>
        <ImageComparison
          :oldImage="point.oldImage"
          :newImage="point.newImage"
        />
      </div>
      <div v-else>
        <p>加载中...</p>
      </div>
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
        const response = await fetch("/point_info.json");
        const data = await response.json();

        console.log("Fetched data:", data); // 日志输出获取的数据

        if (Array.isArray(data)) {
          const foundPoint = data.find((p) => p.点位 === props.point);
          console.log("Found point:", foundPoint); // 日志输出找到的点位

          if (foundPoint) {
            point.value = foundPoint;
          } else {
            console.error("Point not found:", props.point);
          }
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching point data:", error);
      }
    };

    onMounted(fetchPoint);

    const pointBackgroundStyle = computed(() => {
      const backgroundImg = point.value
        ? point.value.background_img
        : "/path/to/default/background.jpg";
      return {
        backgroundImage: `url(${backgroundImg})`,
      };
    });

    return { point, pointBackgroundStyle };
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0; /* 距离顶部的距离 */
  left: 0; /* 距离左边的距离 */
  width: 100%; /* 固定在顶部，宽度为100% */
  display: flex;
  align-items: center;
  justify-content: center; /* 标题居中 */
  background-color: #ffffff; /* 白色背景 */
  z-index: 1000;
  height: 60px; /* 固定高度 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.home-icon {
  position: absolute;
  left: 20px; 
  top: 16px;
  width: 24px; 
  height: 25px; 
  /* filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.5)); 添加阴影 */
}

h1 {
  color: #333; /* 标题颜色 */
  margin: 0; /* 移除默认的外边距 */
  font-size: 20px; /* 调整标题的字体大小 */
}

h3 {
  text-align: center;
  color: #ffffff; /* 改为白色，使其在暗背景上更明显 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6); /* 添加文字阴影 */
}

.carousel-container {
  width: 100%;
  height: 200px; /* 确保容器高度和轮播图一致 */
  overflow: hidden;
}

.carousel-top {
  width: 100%;
  margin-bottom: 20px;
  border-bottom: #ffffff solid 2px;
}

.carousel-middle  {
  position: relative;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保图像填满容器，并保持其比例 */
  /* border-radius: 5px; */
  border-top: #ffffff solid 2px;
  border-bottom: #ffffff solid 2px;

}
  .label {
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%); /* 使标签的水平位置相对于其自身宽度居中 */
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    z-index: 500;
  }

.point-container {
  background-size: cover;
  background-position: center;
  position: relative;
  padding-top: 60px; /* 为了避开固定的header */
}

.background-overlay {
  backdrop-filter: blur(8px);
  background-color: rgba(0, 0, 0, 0.39); /* 半透明黑色背景以增强可读性 */
  height: 100%;
  width: 100%;
}

.original-site,
.address {
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff; /* 改为白色，使其在暗背景上更明显 */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9); /* 添加文字阴影 */
  margin-bottom: 10px;
}

.description-card {
  background-color: rgba(255, 255, 255, 0.8); /* 半透明白色背景以增强可读性 */
  border: 2px solid #ddd; /* 卡片边框 */
  border-radius: 10px; /* 圆角 */
  padding: 20px; /* 内边距 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 阴影 */
  margin: 20px; /* 顶部外边距 */
}

.description {
  font-size: 14px;
  color: #444;
  text-align: justify;
}

.point-details {
  padding-bottom: 20px; /* 为了增加底部留白 */
}
</style>
