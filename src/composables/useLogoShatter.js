import { ref } from 'vue';

const shatterTrigger = ref(0);
const celebrateTrigger = ref(0);
const logoReplyText = ref('');

export function useLogoShatter() {
    return { shatterTrigger, celebrateTrigger, logoReplyText };
}

export function shatterLogo() {
    shatterTrigger.value++;
}

export function celebrateLogo() {
    celebrateTrigger.value++;
}
