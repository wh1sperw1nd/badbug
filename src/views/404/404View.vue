<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const lines = [
    'Hold on, don\'t run off — see, even badbug is confused,',
    'but we\'ll figure it out, we\'re... you know... that kind of guys...',
    'Anyway, let\'s figure out what\'s going on together.',
    'What you\'re looking for isn\'t here.',
    'Wrong URL.',
    'I even tried looking nearby.',
    'Nothing even close.',
    'Did you maybe mix it up with https://wh1sperw1nd.github.io/badbug ?',
    'Too bad that\'s not it...',
    'Look, I\'m just a humble web server.',
    'I don\'t know anything. I haven\'t seen anyone.',
    'I don\'t even have ears to hear with.',
    'I\'m in deep depression.',
    'How am I supposed to know what you want from me?',
    'Do you really think I can just guess?',
    'So, when are you leaving?',
    'There\'s nothing here.',
    'Honestly.',
    'I\'m about to cry...',
    'Stop tormenting a poor web server!',
    'It\'s not my fault the page doesn\'t exist.',
    'Oh, I feel awful...',
    'So, are you still here?',
    'Oh, I have an idea!',
    'Try https: instead of http:',
    'Great, right?',
    'Yeah, it probably would be great if I actually had SSL.',
    'Funny joke, huh?',
    'Well, never mind.',
    'I asked around at the neighboring servers.',
    'They don\'t have that URL either.',
    'Believe me!',
    'I\'m really sorry.',
    'Maybe ask Bill Gates? He\'s smart, maybe he knows.',
    'I know, it\'s my job to serve you the pages you request.',
    'And I do my best to do my job well.',
    'I have good administrators.',
    'Believe me!',
    'Listen, I do have other pages, you know.',
    'Good ones... with anime...',
    'Not interested?',
    'Too bad.',
    'Maybe some pictures?',
    'Too bad. Really too bad.',
    'Oh wait, I know a great joke!',
    'There are only two hard problems in computer science:',
    'cache invalidation,',
    'naming things,',
    'and off-by-one errors.',
    'Did you like it?',
    'Oh, someone else just showed up.',
    'Sorry, I\'ll leave you for just a second...',
    'But before I go, let me leave you with one wise thing:',
    'Only eagles fly alone, and only sheep graze in herds.',
    'Farewell!!!'
];

const displayedLines = ref([]);
const currentText = ref('');
let lineIndex = 0;
let charIndex = 0;
let timeoutId = null;

function typeNextChar() {
    const line = lines[lineIndex];

    if (charIndex <= line.length) {
        currentText.value = `${line.slice(0, charIndex)}${charIndex < line.length ? '_' : ''}`;
        charIndex++;
        timeoutId = setTimeout(typeNextChar, 60);
        return;
    }

    displayedLines.value = [...displayedLines.value, line];
    currentText.value = '';
    lineIndex++;
    charIndex = 0;

    if (lineIndex < lines.length) {
        timeoutId = setTimeout(typeNextChar, 1000);
    }
}

onMounted(() => {
    timeoutId = setTimeout(typeNextChar, 400);
});

onUnmounted(() => {
    clearTimeout(timeoutId);
});
</script>

<template>
  <div class="tab error-404">
    <h1 class="title">404 error</h1>
    <p>Whoopsie, oh dear, there's simply no such page!!!</p>
    <router-link to="/">&larr; Back to home</router-link>
    <div class="typewriter">
      <p v-for="(line, index) in displayedLines" :key="index">{{ line }}</p>
      <p v-if="currentText">{{ currentText }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss" src="./404View.scss"></style>
