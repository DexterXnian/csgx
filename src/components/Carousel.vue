<template>
  <div class="carousel-container">
    <van-swipe class="my-swipe" :autoplay="0" indicator-color="white">
    <van-swipe-item
      v-for="(image, index) in images"
      :key="index"
      class="my-swipe-item"
    >
      <img :src="image" alt="点位图片" class="carousel-image" />
    </van-swipe-item>
  </van-swipe>

  </div>
  
</template>

<script>
export default {
  name: "CarouselComponent",
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.carousel-container {
  width: 90%;
  
  /* padding: 12px 12px 12px 12px; */
}

.my-swipe {
  width: 100%;
  /* margin: 16px 0; */
  /* padding: 0px 12px; */
  /* height: 900px;  */
}

.my-swipe-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 确保每个项目占满父容器的高度 */
  
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保图像填满容器，并保持其比例 */
  
}

@media (max-width: 600px) {
  .my-swipe {
    height: 200px; /* 在小屏幕上调整高度 */
  }
}
</style>
