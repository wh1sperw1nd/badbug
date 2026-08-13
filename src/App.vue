<template>

  <section class="wrapper">
    <canvas id="fx" class="fx-canvas" width="1449" height="1237" aria-hidden="true"></canvas>
    <section>
      <Header />
      <section class="content">
        <div class="content_inner">
          <router-view />
        </div>
        <aside class="side_slide">
          <div id="dont_click">
            <button type="button" class="dontclick_btn" @click="handleDontClick">
              <span class="visually-hidden">Don't click</span>
            </button>
            <Transition name="bubble-fade">
              <div v-if="bubbleText" class="dontclick-bubble">{{ bubbleText }}</div>
            </Transition>
          </div>
        </aside>
      </section>
    </section>
  </section>
  <footer class="footer">
    <div class="line_inner">
      <div class="foot_line">
        <canvas id="fx-ice" class="fx-ice" width="545" height="235" aria-hidden="true"></canvas>
        <div class="copy">
          <div class="foot_txt">
            © {{ currentYear }} badbug. All rights reserved.
          </div>
          <div class="footer_logo"></div>
        </div>
      </div>
    </div>
  </footer>

</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Header from './components/Header.vue';
import { shatterLogo, celebrateLogo, useLogoShatter } from './composables/useLogoShatter';
import { startAnimations } from './animations';
import './assets/css/style.scss';

const currentYear = ref(new Date().getFullYear());

const dontClickMessages = [
    'Stop that.',
    'I said don\'t.',
    'Okay, that\'s it, you asked for this.',
    'There. Happy now? The logo\'s in pieces.',
    'It grew back. Bugs do that.',
    'Do it again, I dare you.',
    'You have too much free time.',
    'This is between you and the button now.',
    'The button remembers this.',
    'Achievement unlocked: Chaos Enjoyer.'
];

const { logoReplyText } = useLogoShatter();
const bubbleText = ref('');
let clickCount = 0;
let replyTimeoutId = null;

function handleDontClick() {
    const index = Math.min(clickCount, dontClickMessages.length - 1);
    logoReplyText.value = dontClickMessages[index];
    clickCount++;

    clearTimeout(replyTimeoutId);
    replyTimeoutId = setTimeout(() => {
        logoReplyText.value = '';
    }, 1800);

    const isFinalMessage = index === dontClickMessages.length - 1;

    if (isFinalMessage) {
        celebrateLogo();
    }
    else if (clickCount >= 3) {
        shatterLogo();
    }
}

let stopAnimations = null;
let motionQuery = null;

// The background FX are decoration, so they stay off for anyone who asked the
// OS for reduced motion — and follow the setting if it changes mid-visit.
function syncAnimations() {
    if (motionQuery.matches) {
        stopAnimations?.();
        stopAnimations = null;
    }
    else if (!stopAnimations) {
        stopAnimations = startAnimations();
    }
}

onMounted(() => {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', syncAnimations);
    syncAnimations();
});

onUnmounted(() => {
    clearTimeout(replyTimeoutId);
    motionQuery?.removeEventListener('change', syncAnimations);
    stopAnimations?.();
});
</script>
<style scoped>
  .fx-canvas {
    position: absolute;
    z-index: 0;
  }
</style>
