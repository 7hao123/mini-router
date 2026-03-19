<template>
  <div id="app">
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/about">关于</router-link>
    </nav>
    <main>
      <router-view />
    </main>
    {{ location }}
  </div>
</template>

<script setup>
import { inject } from "vue";
const location = inject("location");
</script>

<style scoped>
nav {
  padding: 30px;
  text-align: center;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 4px;
  transition: all 0.3s;
}

nav a:hover {
  background-color: #42b983;
  color: white;
}

nav a.router-link-active {
  color: #42b983;
}

main {
  padding: 20px;
}
</style>
