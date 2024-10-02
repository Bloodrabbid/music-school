<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="video-background" aria-hidden="true">
      <video autoplay loop muted playsinline>
        <source src="@/assets/hero-bg.webm" type="video/webm">
        <track kind="captions" src="@/assets/hero-bg-captions.vtt" srclang="ru" label="Russian">
        Your browser does not support the video tag.
      </video>
    </div>
    <div class="overlay"></div>
    <div class="animated-background">
      <div v-for="i in 20" :key="i" class="note" :style="randomNoteStyle()">♪</div>
    </div>
    <div class="container">
      <h1 class="fade-in-up">БУМ студия музыки</h1>
      <p class="fade-in-up">Обучение для всех возрастов с профессионалами</p>
        <img
          src="@/assets/button.svg"
        alt="Записаться на пробное занятие"
        class="cta-button"
        @click="handleClick"
        />
    </div>
    <div class="floating-instruments" aria-hidden="true">
      <span
        v-for="(instrument, index) in instruments"
        :key="index"
        class="instrument"
        :style="randomInstrumentStyle(index)"
      >
        {{ instrument }}
      </span>
    </div>
    <!-- Black transition at the bottom -->
    <img
      src="@/assets/black-grange-border-hero.png"
      alt=""
      class="section-transition-bottom"
      aria-hidden="true"
    />
  </section>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeroSection',
  data() {
    return {
      instruments: ['🎸', '🎹', '🥁', '🎤', '🎼', '🎧'],
    }
  },
  methods: {
    randomNoteStyle() {
      return {
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${15 + Math.random() * 10}s`
      }
    },
    randomInstrumentStyle(index) {
      return {
        left: `${Math.random() * 90 + 5}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${20 + Math.random() * 10}s`,
        fontSize: `${30 + Math.random() * 5}px`
      }
    },
    handleClick() {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({behavior: 'smooth'});
      } else {
        console.error('Секция контактов не найдена');
      }
    }
  }
});
</script>

<style lang="scss" src="@/styles/components/sections/HeroSection.scss"></style>