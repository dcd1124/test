<template>
  <div class="macbook-pro" @mousemove="handleMouseMove">
    <div class="overlap-wrapper">
      <div class="overlap">
        <img
          class="wall wall-transition"
          alt="Wall"
          :src="wall"
          :style="{ opacity: originalClickCount % 2 === 1 ? '1' : '0' }"
        />
        <img class="light" alt="Light" :src="light" />
        <img class="WHATCANISAY" alt="WHATCANISAY" :src="WHATCANISAY" />
        <img class="mouseSHADONIGHT" alt="mouseSHADONIGHT" :src="mouseSHADONIGHT" :style="{ opacity: mouseShadoNightOpacity }" />
        <img class="computershadowNIGHT" alt="computershadowNIGHT" :src="computershadowNIGHT" :style="{ opacity: computerShadowNightOpacity }" />
        <img class="mountainSHADO" alt="mountainSHADO" :src="mountainSHADO" :style="{ opacity: mountainShadoOpacity }" />
        <img class="mountainSHADON00000" alt="mountainSHADON00000" :src="mountainSHADON00000" />
        <img class="windowfillSIDENIGHT" alt="windowfillSIDENIGHT" :src="windowfillSIDENIGHT" />
        <img class="dateSHADOW" alt="dateSHADOW" :src="dateSHADOW" :style="{ opacity: dateShadowOpacity }" />
        <img class="timeSHADOW1" alt="timeSHADOW1" :src="timeSHADOW1" :style="{ opacity: timeShadow1Opacity }" />
        <img class="wallday" alt="wallday" :src="wallday" :style="{ opacity: walldayOpacity }" />
        <img class="SHADOWdaymain" alt="SHADOWdaymain" :src="SHADOWdaymain" :style="{ opacity: shadowDayMainOpacity }" />
        <div ref="lottieContainer" class="time"></div>
        <div
          class="time-interaction-block"
          @click="handleOriginalClick"
          @mouseenter="handleOriginalMouseEnter"
          @mouseleave="handleOriginalMouseLeave"
        ></div>
        <div ref="datAnimationContainer" class="dat-animation">
          <span
            ref="clickCountText"
            :class="{ 'click-count': true, 'fade-out': isFadingOut, 'fade-in': isFadingIn, 'bold': true }"
          >{{ clickCount }}</span>
        </div>
        <div
          class="dat-animation-interaction-block"
          @click="handleNewClick"
          @mouseenter="handleNewMouseEnter"
          @mouseleave="handleNewMouseLeave"
        ></div>
        <div ref="manAnimationContainer" class="man-animation" @click="handleManClick"></div>
        <img class="table" alt="Table" :src="table" />
        <img class="computer" alt="Computer" :src="computer" />
        <img class="mouse" alt="Mouse" :src="mouse" />
        <img class="decoration" alt="Decoration" :src="decoration" />
        <div class="eye" :style="{ left: eye1X + 'px', top: eye1Y + 'px' }"></div>
        <div class="eye" :style="{ left: eye2X + 'px', top: eye2Y + 'px' }"></div>
        <img class="windowSIDENIGHT" alt="windowSIDENIGHT" :src="windowSIDENIGHT" />
        <img class="mountainNIGHT" alt="mountainNIGHT" :src="mountainNIGHT" />
        <img
          class="sun"
          alt="sun"
          :src="sun"
          :class="{ 'sun-animation': shouldAnimateSun }"
        />
        <div
          class="square-block"
          :style="{
            width: squareBlockWidth + 'px',
            height: squareBlockHeight + 'px',
            backgroundColor: squareBlockColor
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import lottie from 'lottie-web';
import type { AnimationItem } from 'lottie-web';
import wall from './components/svg/wall.svg';
import light from './components/svg/light16.svg';
import table from './components/svg/table.svg';
import computer from './components/svg/computer.svg';
import mouse from './components/svg/mouse.svg';
import decoration from './components/svg/zhuangshi.svg';
import WHATCANISAY from './components/svg/WHATCANISAY.svg';
import mouseSHADONIGHT from './components/svg/mouseSHADONIGHT.svg';
import computershadowNIGHT from './components/svg/computershadowNIGHT.svg';
import originalAnimationData from './lottie-animations/time.json';
import datAnimationData from './lottie-animations/data.json';
import manAnimationData from './lottie-animations/man.json';
import windowSIDENIGHT from './components/svg/windowSIDENIGHT.svg';
import mountainNIGHT from './components/svg/mountainNIGHT.svg';
import sun from './components/svg/sun.svg';
import './MacbookPro.css';
import mountainSHADO from './components/svg/mountainSHADO.svg';
import mountainSHADON00000 from './components/svg/mountainSHADON00000.svg';
import windowfillSIDENIGHT from './components/svg/windowfillSIDENIGHT.svg';
import dateSHADOW from './components/svg/dateSHADOW.svg';
import timeSHADOW1 from './components/svg/timeSHADOW1.svg';
import wallday from './components/svg/wallday.svg';
import SHADOWdaymain from './components/svg/SHADOWdaymain.svg';

export default defineComponent({
  setup() {
    const lottieContainer = ref<HTMLDivElement | null>(null);
    const datAnimationContainer = ref<HTMLDivElement | null>(null);
    const manAnimationContainer = ref<HTMLDivElement | null>(null);
    let originalAnim: AnimationItem | null = null;
    let datAnim: AnimationItem | null = null;
    let manAnim: AnimationItem | null = null;
    const originalClickCount = ref(0);
    const clickCount = ref(1);
    const clickCountText = ref<HTMLSpanElement | null>(null);
    const isFadingOut = ref(false);
    const isFadingIn = ref(false);
    const eye1X = ref(480);
    const eye1Y = ref(780);
    const offsetX = 100;
    const eye2X = ref(eye1X.value + offsetX);
    const eye2Y = ref(eye1Y.value);
    const minX = ref(50);
    const maxX = ref(1600);
    const minY = ref(50);
    const maxY = ref(1000);
    let initialMouseX = 0;
    let initialMouseY = 0;
    const shouldAnimateSun = ref(false);
    const squareBlockWidth = ref(800);
    const squareBlockHeight = ref(730);
    const squareBlockColor = ref('#ffffff');

    // mountainSHADO的透明度
    const mountainShadoOpacity = ref(0); // 初始透明度为0
    const shadowDayMainOpacity = ref(1); // 初始透明度为 1
    const walldayOpacity = ref(1); // 初始透明度为 1

    // 新增透明度控制变量
    const dateShadowOpacity = ref(0); // 初始透明度为 0
    const mouseShadoNightOpacity = ref(0); // 初始透明度为 0
    const timeShadow1Opacity = ref(0); // 初始透明度为 0
    const computerShadowNightOpacity = ref(0); // 初始透明度为 0

    const loadLottie = (container: HTMLElement, animationData: any): AnimationItem | null => {
      try {
        return lottie.loadAnimation({
          container,
          renderer: 'svg',
          loop: false,
          autoplay: false,
          animationData,
        });
      } catch (error) {
        console.error('Lottie 动画加载失败:', error);
        return null;
      }
    };

    const setupOriginalClickInteraction = (anim: AnimationItem, clickCount: number) => {
      if (clickCount % 2 === 1) {
        anim.playSegments([0, 30], true);
      } else {
        anim.playSegments([30, 60], true);
      }
    };

    onMounted(() => {
      if (lottieContainer.value) {
        originalAnim = loadLottie(lottieContainer.value, originalAnimationData);
        if (originalAnim) {
          originalAnim.goToAndStop(0, true);
        }
      }

      if (datAnimationContainer.value) {
        datAnim = loadLottie(datAnimationContainer.value, datAnimationData);
        if (datAnim) {
          datAnim.playSegments([0, 60], true);
        }
      }

      if (manAnimationContainer.value) {
        manAnim = loadLottie(manAnimationContainer.value, manAnimationData);
        if (manAnim) {
          manAnim.goToAndStop(0, true);
        }
      }
    });

    onUnmounted(() => {
      if (originalAnim) {
        originalAnim.destroy();
      }
      if (datAnim) {
        datAnim.destroy();
      }
      if (manAnim) {
        manAnim.destroy();
      }
    });

    const handleOriginalClick = () => {
      if (originalClickCount.value < 1000) {
        originalClickCount.value++;
      } else {
        originalClickCount.value = 0;
      }

      // 更新wall的透明度
      const newWallOpacity = originalClickCount.value % 2 === 1 ? 1 : 0;
      mountainShadoOpacity.value = newWallOpacity === 1 ? 1 : 0; // mountainSHADO的透明度

      // 更新wallday的透明度
      walldayOpacity.value = originalClickCount.value % 2 === 1 ? 0 : 1; // 奇数点击时，wallday 透明度为 0

      // 更新SHADOWdaymain的透明度
      shadowDayMainOpacity.value = originalClickCount.value % 2 === 1 ? 0 : 1; // 偶数点击时，SHADOWdaymain 透明度为 1

      // 更新其他元素的透明度
      if (originalClickCount.value % 2 === 1) {
        dateShadowOpacity.value = 1; // 奇数点击时，dateSHADOW 透明度为 1
        mouseShadoNightOpacity.value = 1; // 奇数点击时，mouseSHADONIGHT 透明度为 1
        timeShadow1Opacity.value = 1; // 奇数点击时，timeSHADOW1 透明度为 1
        computerShadowNightOpacity.value = 1; // 奇数点击时，computershadowNIGHT 透明度为 1
      } else {
        dateShadowOpacity.value = 0; // 偶数点击时，dateSHADOW 透明度为 0
        mouseShadoNightOpacity.value = 0; // 偶数点击时，mouseSHADONIGHT 透明度为 0
        timeShadow1Opacity.value = 0; // 偶数点击时，timeSHADOW1 透明度为 0
        computerShadowNightOpacity.value = 0; // 偶数点击时，computershadowNIGHT 透明度为 0
      }

      if (originalAnim) {
        setupOriginalClickInteraction(originalAnim, originalClickCount.value);
      }

      if (originalClickCount.value % 2 === 0 && datAnim) {
        datAnim.playSegments([90, 110], false);
        isFadingOut.value = true;

        const onComplete = () => {
          if (datAnim) {
            if (clickCount.value < 30) {
              clickCount.value++;
            } else {
              clickCount.value = 1;
            }
            isFadingOut.value = false;
            isFadingIn.value = true;
            setTimeout(() => {
              isFadingIn.value = false;
            }, 300);
            datAnim.removeEventListener('complete', onComplete);
          }
        };

        if (datAnim) {
          datAnim.addEventListener('complete', onComplete);
        }
      }

      shouldAnimateSun.value = true;
      setTimeout(() => {
        shouldAnimateSun.value = false;
      }, 2000);

      if (originalClickCount.value % 2 === 1) {
        squareBlockColor.value = '#242424';
      } else {
        squareBlockColor.value = '#ffffff';
      }
    };

    const handleOriginalMouseEnter = () => {};
    const handleOriginalMouseLeave = () => {};
    const handleNewMouseEnter = () => {
      if (datAnim) {
        datAnim.playSegments([60, 75], false);
      }
    };
    const handleNewMouseLeave = () => {
      if (datAnim) {
        datAnim.playSegments([75, 90], false);
      }
    };
    const handleNewClick = () => {
      if (datAnim) {
        datAnim.playSegments([90, 110], false);
        isFadingOut.value = true;

        const onComplete = () => {
          if (datAnim) {
            if (clickCount.value < 30) {
              clickCount.value++;
            } else {
              clickCount.value = 1;
            }
            isFadingOut.value = false;
            isFadingIn.value = true;
            setTimeout(() => {
              isFadingIn.value = false;
            }, 300);
            datAnim.removeEventListener('complete', onComplete);
          }
        };

        if (datAnim) {
          datAnim.addEventListener('complete', onComplete);
        }
      }
    };

    const handleManClick = () => {
      if (manAnim) {
        manAnim.playSegments([0, 60], false);
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      const speedFactor = 0.07;

      if (initialMouseX === 0 && initialMouseY === 0) {
        initialMouseX = event.clientX;
        initialMouseY = event.clientY;
      }

      const mouseDeltaX = event.clientX - initialMouseX;
      const mouseDeltaY = event.clientY - initialMouseY;

      let newEye1X = eye1X.value + mouseDeltaX * speedFactor;
      let newEye1Y = eye1Y.value + mouseDeltaY * speedFactor;
      let newEye2X = newEye1X + offsetX;
      let newEye2Y = newEye1Y;

      newEye1X = Math.max(minX.value, Math.min(newEye1X, maxX.value));
      newEye1Y = Math.max(minY.value, Math.min(newEye1Y, maxY.value));
      newEye2X = Math.max(minX.value, Math.min(newEye2X, maxX.value));
      newEye2Y = Math.max(minY.value, Math.min(newEye2Y, maxY.value));

      eye1X.value = newEye1X;
      eye1Y.value = newEye1Y;
      eye2X.value = newEye2X;
      eye2Y.value = newEye2Y;

      initialMouseX = event.clientX;
      initialMouseY = event.clientY;
    };

    return {
      wall,
      light,
      table,
      computer,
      mouse,
      decoration,
      lottieContainer,
      datAnimationContainer,
      manAnimationContainer,
      handleOriginalClick,
      handleOriginalMouseEnter,
      handleOriginalMouseLeave,
      handleNewMouseEnter,
      handleNewMouseLeave,
      handleNewClick,
      handleManClick,
      handleMouseMove,
      originalClickCount,
      clickCount,
      clickCountText,
      isFadingOut,
      isFadingIn,
      eye1X,
      eye1Y,
      eye2X,
      eye2Y,
      WHATCANISAY,
      mouseSHADONIGHT,
      computershadowNIGHT,
      windowSIDENIGHT,
      mountainNIGHT,
      sun,
      shouldAnimateSun,
      squareBlockWidth,
      squareBlockHeight,
      squareBlockColor,
      mountainSHADO,
      mountainSHADON00000,
      windowfillSIDENIGHT,
      mountainShadoOpacity, // 返回透明度变量
      shadowDayMainOpacity, // 返回 SHADOWdaymain 的透明度
      walldayOpacity, // 返回 wallday 的透明度
      dateShadowOpacity, // 返回 dateSHADOW 的透明度
      mouseShadoNightOpacity, // 返回 mouseSHADONIGHT 的透明度
      timeShadow1Opacity, // 返回 timeSHADOW1 的透明度
      computerShadowNightOpacity, // 返回 computershadowNIGHT 的透明度
      dateSHADOW,
      timeSHADOW1,
      wallday,
      SHADOWdaymain,
    };
  },
});
</script>

<style>
.mountainSHADO {
  transition: opacity 0.5s ease-in-out; /* 添加过渡效果 */
}
.SHADOWdaymain {
  position: absolute; /* 确保它是绝对定位 */
  z-index: 10; /* 确保它在其他元素之上 */
  transition: opacity 0.5s ease-in-out; /* 添加过渡效果 */
}
.wallday {
  position: absolute; /* 确保它是绝对定位 */
  z-index: 10; /* 确保它在其他元素之上 */
  transition: opacity 0.5s ease-in-out; /* 添加过渡效果 */
}
.dateSHADOW,
.mouseSHADONIGHT,
.timeSHADOW1,
.computershadowNIGHT {
  transition: opacity 0.5s ease-in-out; /* 添加过渡效果 */
}
</style>