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
          <div id="dont_click" @click="handleDontClick">
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
import { startAnimations } from './animations.js';
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

onMounted(() => {
    stopAnimations = startAnimations();
});

onUnmounted(() => {
    clearTimeout(replyTimeoutId);
    stopAnimations?.();
});
</script>
<style scoped>
  .fx-canvas {
    position: absolute;
    z-index: 0;
  }
</style>
