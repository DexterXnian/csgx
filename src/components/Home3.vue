<template>
  <div>
    <h1>城市更新</h1>
    <ul>
      <li v-for="point in points" :key="point.id">
        <router-link :to="{ name: 'Point', params: { point: point.点位 } }">
          {{ point.点位 }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'Home',
  setup() {
    const points = ref([]);

    const fetchPoints = async () => {
      try {
        const response = await fetch('/outputjson_point.json');
        const data = await response.json();

        if (Array.isArray(data)) {
          points.value = data;
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching points data:', error);
      }
    };

    onMounted(fetchPoints);

    return { points };
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
