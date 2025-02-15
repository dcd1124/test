<template>
  <!-- 去掉按钮，直接在动画容器上绑定点击事件 -->
  <div ref="lottieContainer" @click="handleClick"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
// 引入 lottieUtils.ts 里的函数
import { loadLottie, setupClickInteraction } from '../utils/lottieUtils.ts'; 
import animationData from '../../lottie-animations/time.json';

const lottieContainer = ref<HTMLDivElement | null>(null);
let anim: any;
let handleClick: () => void;

onMounted(() => {
    if (lottieContainer.value) {
        // 调用 loadLottie 函数加载动画
        anim = loadLottie(lottieContainer.value, animationData);
        // 初始时将动画设置到第 0 帧并暂停，呈现静态图片效果
        anim.goToAndStop(0, true); 
        // 调用 setupClickInteraction 函数获取点击处理函数
        handleClick = setupClickInteraction(anim);
    }
});
</script>