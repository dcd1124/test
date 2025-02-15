<script setup lang="ts">
// 引入 HelloWorld 组件，这是项目中自定义的一个组件，用于展示特定内容
//import HelloWorld from './HelloWorld.vue'
// 引入 MacbookPro 组件，同样是项目中自定义的组件
import MacbookPro from './MacbookPro.vue'

</script>

<template>
  <div>
    <!--<a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>-->
    <!-- 创建一个用于挂载 X-Flowchart-Vue 插件的 DOM 元素 -->
    <div id="xfc"></div>
  </div>
  <!-- 使用 HelloWorld 组件，并传递一个消息属性 -->
  <HelloWorld msg="Vite + Vue" />
  <!-- 使用 MacbookPro 组件 -->
  <MacbookPro />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>