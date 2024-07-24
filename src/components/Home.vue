<template>
  <div class="home">
    <div class="content">
      <!-- 提示框 -->
      <div class="tips">
        点击地图图标查看详情
      </div>
      <main class="main-content">
        <div class="map-container">
          <div class="map-wrapper" @click="calculateRelativePosition">
            <!-- <div class="map-overlay"></div> -->
            <img ref="mapImage" src="@/assets/maps/0722-（线上版底图）图溯上海 城市更新.jpg" alt="总地图" class="map-image" />
            <div
              v-for="point in points"
              :key="point.id"
              :class="['map-point', point.type === 'big' ? 'big-point' : 'small-point', point.iconClass]"
              :style="{ top: point.top + '%', left: point.left + '%' }"
              @click.stop="openModal(point)"
            ></div>
          </div>
        </div>
      </main>
    </div>
    <Modal v-if="showModal" :point="selectedPoint" @close="showModal = false" @navigate="navigateToPoint" />
  </div>
</template>

<script>
import Modal from './Modal.vue';

export default {
  name: "Home",
  components: {
    Modal
  },
  data() {
    return {
      points: [
        { id: 1, 点位: "外滩·中央", top: 32, left: 43, type: 'small', iconClass: 'icon-waitan-class', imageUrl: 'src/assets/imgs/img1_1.JPG' },
        { id: 2, 点位: "外滩·中央", top: 22, left: 78, type: 'big', iconClass: 'icon-waitan-class', imageUrl: 'src/assets/imgs/img1_1.JPG' },
        { id: 3, 点位: "外滩·老市府", top: 35, left: 40, type: 'small', iconClass: 'icon-waitan-class', imageUrl: 'src/assets/imgs_lives/img2_1.JPG' },
        { id: 4, 点位: "外滩·老市府", top: 29.5, left: 89, type: 'big', iconClass: 'icon-waitan-class', imageUrl: 'src/assets/imgs_lives/img2_1.JPG' },
        { id: 5, 点位: "新天地", top: 46.8, left: 37, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: "/src/assets/imgs_lives/img3_1.JPG" },
        { id: 6, 点位: "新天地", top: 54, left: 91, type: 'big', iconClass: 'icon-shikumen-class', imageUrl: "/src/assets/imgs_lives/img3_1.JPG" },
        { id: 7, 点位: "张园", top: 39.8, left: 29.5, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img9_1.JPG' },
        { id: 9, 点位: "张园", top: 53, left: 79.6, type: 'big', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img9_1.JPG' },
        { id: 10, 点位: "思南公馆", top: 51.5, left: 33.7, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img4_1.JPG' },
        { id: 11, 点位: "思南公馆", top: 48.8, left: 66, type: 'big', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img4_1.JPG' },
        { id: 12, 点位: "今潮8弄", top: 22.2, left: 41.3, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img14_1.JPG' },
        { id: 13, 点位: "今潮8弄", top: 57.3, left: 66, type: 'big', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img14_1.JPG' },
        { id: 14, 点位: "1933老场坊", top: 19, left: 45.4, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: 'src/assets/imgs_lives/img15_3.JPG' },
        { id: 15, 点位: "1933老场坊", top: 77, left: 91.6, type: 'big', iconClass: 'icon-shikumen-class', imageUrl: 'src/assets/imgs_lives/img15_3.JPG' },
        { id: 16, 点位: "西岸穹顶艺术中心", top: 94.4, left: 31.9, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img8_1.JPG' },
        { id: 17, 点位: "西岸穹顶艺术中心", top: 88, left: 91.5, type: 'big', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img8_1.JPG' },
        { id: 18, 点位: "绿之丘", top: 19.4, left: 67.2, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img16_1.JPG' },
        { id: 19, 点位: "绿之丘", top: 77.1, left: 79.1, type: 'big', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img16_1.JPG' },
        { id: 18, 点位: "上生新所", top: 57.1, left: 13.3, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img11_1.JPG' },
        { id: 19, 点位: "上生新所", top: 89, left: 79, type: 'big', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img11_1.JPG' },
        { id: 20, 点位: "北外滩国客中心", top: 25.1, left: 48.1, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img13_1.JPG' },
        { id: 21, 点位: "北外滩国客中心", top: 77.1, left: 67.8, type: 'big', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img13_1.JPG' },
        { id: 22, 点位: "上海油罐艺术中心", top: 91.4, left: 31.4, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img7_1.JPG' },
        { id: 23, 点位: "上海油罐艺术中心", top: 88.6, left: 67.6, type: 'big', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img7_1.JPG' },
        { id: 24, 点位: "上海潜艇展览馆", top: 67.8, left: 43.4, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img6_1.JPG' },
        { id: 25, 点位: "上海潜艇展览馆", top: 88.6, left: 55.5, type: 'big', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img6_1.JPG' },
        { id: 26, 点位: "M50创意园", top: 24.5, left: 23.6, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img12_1.JPG' },
        { id: 27, 点位: "M50创意园", top: 77.1, left: 55.8, type: 'big', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img12_1.JPG' },
        { id: 28, 点位: "船厂1862", top: 27.9, left: 56.6, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img19_1.JPG' },
        { id: 29, 点位: "上海国际时尚中心", top: 5.8, left: 78, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img18_1.JPG' },
        { id: 30, 点位: "世界技能博物馆", top: 18, left: 70, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img17_1.JPG' },
        { id: 31, 点位: "上海当代艺术博物馆", top: 62.7, left: 48.2, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img5_1.JPG' },
        { id: 32, 点位: "上海世博文化公园", top: 78.7, left: 37.8, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img20_1.JPG' },
        { id: 33, 点位: "苏河湾万象天地", top: 29.1, left: 38.3, type: 'small', iconClass: 'icon-shikumen-class', imageUrl: '/src/assets/imgs_lives/img10_1.JPG' },
        // 其他点位...
      ],
      showModal: false,
      selectedPoint: null
    };
  },
  methods: {
    openModal(point) {
      this.selectedPoint = point;
      this.showModal = true;
    },
    navigateToPoint(point) {
      this.showModal = false;
      this.$router.push({ name: 'Point', params: { point: point.点位 } });
    },
    calculateRelativePosition(event) {
      const mapImage = this.$refs.mapImage;
      const rect = mapImage.getBoundingClientRect();

      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      const relativeLeft = (clickX / rect.width) * 100;
      const relativeTop = (clickY / rect.height) * 100;

      console.log(`relativeTop: ${relativeTop}%`);
      console.log(`relativeLeft: ${relativeLeft}%`);
    }
  }
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.tips {
  position: fixed;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  z-index: 1000;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.main-content {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow-y: hidden; /* 隐藏垂直滚动条 */
  width: 100%;
}

.map-container {
  width: 100%;
  height: 100vh; /* 调整地图高度适合手机端 */
  overflow-x: scroll; /* 使地图可以左右滚动 */
  overflow-y: hidden; /* 隐藏垂直滚动条 */
  white-space: nowrap; /* 防止图片换行 */
  position: relative;
}

.map-wrapper {
  display: inline-block;
  height: 100%;
  position: relative; /* 关键是将地图容器设置为相对定位 */
}

/* .map-overlay{
  height: 100%;
  width: 1100px;
  background-image: url('/src/assets/maps/0722-（线上版底图）图溯上海 城市更新.jpg');
  background-size: cover;
} */

.map-image {
  height: 100%; /* 高度充满容器高度 */
  width: auto; /* 宽度自适应 */
  display: block; /* 将图片设为块级元素 */
}

.map-point {
  position: absolute;
  cursor: pointer;
  transform: translate(-50%, -50%);
  pointer-events: auto;
  opacity:0;
}

.big-point {
  width: 50px;
  height: 50px;
}

.small-point {
  width: 24px;
  height: 24px;
}

.icon-waitan-class {
  background-color: red;
  /* 在这里可以自定义背景图 */
}

.icon-shikumen-class {
  background-color: green;
  /* 在这里可以自定义背景图 */
}

.icon-xintiandi {
  background-color: blue;
  /* 在这里可以自定义背景图 */
}
</style>