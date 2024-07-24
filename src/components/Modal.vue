<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">关闭</button>
        <h1>{{ point.点位 }}</h1>
        <div>
          <img :src="point.imageUrl" alt="示意图" class="point-image" v-if="point.imageUrl" />
        </div>
        <button class="navigate-button" @click="navigate">查看详情</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Modal",
    props: {
      point: {
        type: Object,
        required: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      navigate() {
        this.$emit('navigate', this.point);
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
    text-align: center;
    position: relative; /* 使关闭按钮可以定位在内容内 */
  }
  
  .close-button {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  
  .navigate-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .point-image {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }
  </style>
  