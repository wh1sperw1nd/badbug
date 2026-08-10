<template>
  <header class="top">
    <router-link to="/" class="logo">
      <div class="logo_name">
        <div class="logo_txt">
          <span class="spn1">ba</span>
          <span class="red">db</span>
          <span class="spn1">ug</span>
        </div>
        <div class="studio">
          <span class="grey">Entertainment</span>
        </div>
      </div>
      <div class="logo_img" :class="{ 'is-shattering': isShattering, 'is-celebrating': isCelebrating }">
        <div class="logo_img_face"></div>
        <span
          v-for="(particle, index) in particles"
          :key="index"
          class="particle"
          :style="particle.style"
        ></span>
        <Transition name="bubble-fade">
          <div v-if="logoReplyText" class="logo-bubble">{{ logoReplyText }}</div>
        </Transition>
      </div>
    </router-link>

    <nav class="menu">
      <ul class="publicTabs navigate" id="menu">
        <li class="navTab" v-for="{ url, name } in routes" :key="url">
          <router-link class="navLink" :to="url">{{ name }}</router-link>
        </li>
        <div class="lavalamp"></div>
      </ul>
    </nav>
    <div class="social">
      <a
        class="socialLink"
        href="https://www.linkedin.com/in/whisperwind"
        target="_blank"
        rel="noopener"
        aria-label="LinkedIn"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9
              h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06
              0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM3.56 20.45h3.56V9H3.56v11.45Z"
          />
        </svg>
      </a>
      <a
        class="socialLink"
        href="https://github.com/wh1sperw1nd"
        target="_blank"
        rel="noopener"
        aria-label="GitHub"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path
            d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49
              0-.24-.01-1.05-.01-1.9-2.78.61-3.37-1.21-3.37-1.21-.45-1.18-1.11-1.49-1.11-1.49-.9-.64.07-.63.07-.63
              1 .07 1.53 1.06 1.53 1.06.89 1.55 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.06
              0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.72 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33
              2.75-1.05 2.75-1.05.55 1.41.2 2.46.1 2.72.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.05.36.32.68.94.68 1.9
              0 1.37-.01 2.48-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z"
          />
        </svg>
      </a>
    </div>
  </header>
</template>
<script setup>
import { ref, watch, onUnmounted, nextTick } from 'vue';
import { useLogoShatter } from '../composables/useLogoShatter';

const routes = [
    { url:'/', name:'Home' },
    { url:'/about', name:'About me' },
    { url:'/portfolio', name:'Portfolio' },
    { url:'/contacts', name:'Contacts' }
];

const particleColors = ['#f90514', '#c40010', '#1a1a1a', '#ad9c82', '#ffffff'];
const particleCount = 20;

const particles = Array.from({ length:particleCount }, (_, index) => {
    const angle = (360 / particleCount) * index + (Math.random() * 18 - 9);
    const radians = (angle * Math.PI) / 180;
    const distance = 3 + Math.random() * 4.5;
    const size = 0.22 + Math.random() * 0.34;

    return {
        style:{
            '--particle-size':`${size.toFixed(2)}em`,
            '--tx':`${(Math.sin(radians) * distance).toFixed(2)}em`,
            '--ty':`${(-Math.cos(radians) * distance).toFixed(2)}em`,
            '--rot':`${Math.round(Math.random() * 720 - 360)}deg`,
            'animation-delay':`${Math.round(Math.random() * 70)}ms`,
            background:particleColors[index % particleColors.length],
            borderRadius:Math.random() > 0.3 ? '50%' : '2px'
        }
    };
});

const { shatterTrigger, celebrateTrigger, logoReplyText } = useLogoShatter();
const isShattering = ref(false);
const isCelebrating = ref(false);
let resetTimeoutId = null;
let celebrateTimeoutId = null;

watch(shatterTrigger, async () => {
    clearTimeout(resetTimeoutId);
    isShattering.value = false;
    await nextTick();
    isShattering.value = true;
    resetTimeoutId = setTimeout(() => {
        isShattering.value = false;
    }, 1150);
});

watch(celebrateTrigger, async () => {
    clearTimeout(celebrateTimeoutId);
    isCelebrating.value = false;
    await nextTick();
    isCelebrating.value = true;
    celebrateTimeoutId = setTimeout(() => {
        isCelebrating.value = false;
    }, 950);
});

onUnmounted(() => {
    clearTimeout(resetTimeoutId);
    clearTimeout(celebrateTimeoutId);
});
</script>
