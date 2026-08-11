<script setup>
import { ref, computed } from 'vue';

// Kept in pieces and joined at runtime so the number never sits in the served
// HTML for scrapers to pick up. It only appears once a human asks for it.
const phoneParts = ['+38', '096', '654', '13', '18'];
const phoneShown = ref(false);

const phoneText = computed(() => {
    const [code, operator, a, b, c] = phoneParts;

    return `${code}(${operator})${a}-${b}-${c}`;
});

const phoneHref = computed(() => `tel:${phoneParts.join('')}`);
</script>
<template>
  <div class="tab">
    <h1 class="title">Contacts</h1>
    <div class="contact_list">
      <table>
        <tbody>
          <tr>
            <td>Telegram:</td>
            <td><a href="https://t.me/Wh1sperw1nd" target="_blank" rel="noopener noreferrer">@Wh1sperw1nd</a></td>
          </tr>
          <tr>
            <td>Linkedin:</td>
            <td>
              <a href="https://www.linkedin.com/in/whisperwind" target="_blank" rel="noopener noreferrer">whisperwind</a>
            </td>
          </tr>
          <tr>
            <td>E-mail:</td>
            <td><a href="mailto:badbug.pro@gmail.com">badbug.pro@gmail.com</a></td>
          </tr>
          <tr>
            <td>Tel:</td>
            <td>
              <a v-if="phoneShown" :href="phoneHref">{{ phoneText }}</a>
              <button v-else type="button" class="reveal_phone" @click="phoneShown = true">
                show number
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped lang="scss" src="./ContactsView.scss"></style>
