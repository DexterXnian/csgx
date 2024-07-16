<template>
    <div>
      <h1>城市更新</h1>
      <ul>
        <li v-for="regionName in regionNames" :key="regionName">
          <router-link :to="{ name: 'Region', params: { regionName }}">{{ regionName }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'Home',
    setup() {
      const regionNames = ref([]);
  
      onMounted(async () => {
        const response = await fetch('/outputjson_area.json');
        const data = await response.json();
        regionNames.value = Object.keys(data);
      });
  
      return { regionNames };
    }
  };
  </script>
  
  <style scoped>
  h1 {
    text-align: center;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin: 10px 0;
  }
  </style>
  