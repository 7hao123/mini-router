<template>
  <div class="home">
    <h1>欢迎来到首页</h1>
    <p>这是一个使用 Vue3 + Vite + Vue Router 构建的项目</p>
    <div class="card">
      <button @click="count++">计数: {{ count }}</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Home',
  setup() {
    const count = ref(0)

    return {
      count
    }
  }
}
</script>

<style scoped>
.home {
  padding: 40px;
}

h1 {
  font-size: 3em;
  margin-bottom: 20px;
  color: #42b983;
}

p {
  font-size: 1.2em;
  margin-bottom: 30px;
}

.card {
  padding: 20px;
}

button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1em;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background-color: #359268;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 185, 131, 0.4);
}
</style>
