<template>
    <div class="image-comparison-container">
      <div class="image-container">
        <span class="label old-label">1984</span>
        <img :src="oldImage" alt="Old Image" class="comparison-image" />
      </div>
      <div class="image-container">
        <span class="label new-label">2023</span>
        <img :src="newImage" alt="New Image" class="comparison-image" />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "ImageComparison",
    props: {
      oldImage: {
        type: String,
        required: true,
      },
      newImage: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .image-comparison-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* margin: 20px; */
    padding: 0 20px 20px 20px;
    /* margin-bottom: 40px; 确保底部有留白 */
  }
  
  .image-container {
  position: relative;
  width: 48%;
  height: 150px; /* 设定一个固定的高度 */
  overflow: hidden; /* 确保没有留白 */
}

.comparison-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保图像填满容器，并保持其比例 */
  border-radius: 5px;
}
  .label {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
  }
  
  </style>
  