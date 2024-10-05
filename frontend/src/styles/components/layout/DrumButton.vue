<template>
    <div>
      <!-- Кнопка барабанов -->
      <div class="drum-button" @click="toggleThoughtBubble">
        <font-awesome-icon icon="fa-solid fa-music" />
      </div>
      <!-- Окно мысли -->
      <div v-if="showThoughtBubble" class="thought-bubble">
        <p>Запишитесь на пробное занятие!</p>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    name: 'DrumButton',
    components: {},
    setup() {
      const showThoughtBubble = ref(false);
  
      const toggleThoughtBubble = () => {
        showThoughtBubble.value = !showThoughtBubble.value;
      };
  
      return {
        showThoughtBubble,
        toggleThoughtBubble,
      };
    },
  });
  </script>
  
  <style lang="scss" src="@/styles/components/layout/DrumButton.scss"></style>