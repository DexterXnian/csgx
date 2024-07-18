<template>
    <div class="goto-container">
      <button @click="toggleList" class="goto-button">到这去</button>
      <div v-if="showList" class="point-list">
        <h3>点位列表</h3>
        <ul>
          <li v-for="point in points" :key="point.id">
            <router-link :to="{ name: 'Point', params: { point: point.点位 } }">{{ point.点位 }}</router-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "GotoComponent",
    data() {
      return {
        showList: false,
        points: [
          { id: 1, 点位: "外滩·中央" },
          { id: 2, 点位: "外滩·老市府" },
          { id: 3, 点位: "新天地" },
          // 其他点位...
        ]
      };
    },
    methods: {
      toggleList() {
        this.showList = !this.showList;
      }
    }
  };
  </script>
  
  <style scoped>
  .goto-container {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 1000;
  }
  
  .goto-button {
    cursor: pointer;
    padding: 10px 20px;
    background-color: #3490dc;
    color: white;
    font-weight: bold;
    border-radius: 8px;
    border: none;
  }
  
  .point-list {
    position: absolute;
    top: 40px;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 200px;
    z-index: 1000;
  }
  
  .point-list h3 {
    text-align: center;
    margin: 10px 0;
  }
  
  .point-list ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .point-list li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }
  
  .point-list li:hover {
    background-color: #f0f0f0;
  }
  
  router-link {
    text-decoration: none;
    color: #333;
  }
  
  router-link:hover {
    text-decoration: underline;
  }
  </style>
  