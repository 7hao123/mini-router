<template>
  <div class="about">
    <h1>关于页面</h1>
    <p>这是关于页面的内容</p>
    <div class="info">
      <h2>技术栈</h2>
      <ul>
        <li>Vue 3</li>
        <li>Vue Router 4</li>
        <li>Vite</li>
        <li>JavaScript</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
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

.info {
  margin-top: 40px;
}

h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  font-size: 1.1em;
  padding: 10px;
  margin: 10px 0;
  background-color: rgba(66, 185, 131, 0.1);
  border-radius: 4px;
  display: inline-block;
  min-width: 200px;
}
</style>
