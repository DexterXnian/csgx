<template>
  <div class="home">
    <!-- <header class="header">  
    </header> -->
    <div class="content">
      <main class="main-content">
        <GotoComponent />
        <div class="button-container">
          <button @click="showMap('left')" :class="{ active: currentMap === 'left' }">左</button>
          <button @click="showMap('center')" :class="{ active: currentMap === 'center' }">中</button>
          <button @click="showMap('right')" :class="{ active: currentMap === 'right' }">右</button>
        </div>
        <div v-if="currentMap === 'left'" class="map-container">
          <img src="@/assets/maps/左-图溯上海 城市更新.jpg" alt="地图1" class="map-image" />
        </div>
        <div v-if="currentMap === 'center'" class="map-container">
          <img src="@/assets/maps/中-图溯上海 城市更新.jpg" alt="地图2" class="map-image" />
        </div>
        <div v-if="currentMap === 'right'" class="map-container">
          <img src="@/assets/maps/右-图溯上海 城市更新.jpg" alt="地图3" class="map-image" />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import GotoComponent from './GotoComponent.vue';

export default {
  name: "Home",
  components: {
    GotoComponent
  },
  data() {
    return {
      currentMap: 'left', // 默认显示左地图
    };
  },
  methods: {
    showMap(map) {
      this.currentMap = map;
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

.header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.home-icon {
  position: absolute;
  left: 10px;
  width: 24px;
  height: 24px;
}

.content {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.button-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.button-container button {
  cursor: pointer;
  padding: 10px 20px;
  background-color: #3490dc;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  border: none;
  margin: 0 10px;
}

.button-container button.active {
  background-color: #2779bd;
}

.main-content {
  flex: 1;
  position: relative; /* 关键部分 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  width: 100%;
}

.map-container {
  width: 100%;
  text-align: center; /* 中心对齐图片 */
}

.map-image {
  width: 100%;
  height: auto;
}
</style>
