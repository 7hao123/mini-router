<script setup lang="ts">
import router from "../router";
</script>

<template>
  <div class="about">
    <h1>my a</h1>
    <router-link to="/my/a">取a</router-link>
    <router-link to="/my/b">取b</router-link>

    <router-view></router-view>
  </div>
</template>
