<!-- components/AboutSection.vue -->
<template>
  <section id="about" class="section about">
    <div class="container">
      <h2 class="section-title" v-scroll-animation>О нас</h2>
      <div class="about-content" v-scroll-animation="{ delay: 200 }" role="region" aria-label="Информация о нашей музыкальной школе">
        <p>
          МЫ - МУЗЫКАльная школа в хабаровске. В нашей команде только профессионалы с большим опытом и любовью к своему делу.
        </p>
        <p>
          Обучение в нашей школе подходит для всех возрастов.
        </p>
        <p>
          С нами Вы можете не только научиться играть на музыкальных инструментах, но и найти единомышленников. а на отчетном концерте почувствовать себя настоящей рок звездой!
        </p>
      </div>
    </div><!-- Black transition at the bottom -->
    <img
      src="@/assets/black-grange-border-about.png"
      alt=""
      class="section-transition-top"
      loading="lazy"
      aria-hidden="true"
    />

  </section>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AboutSection',
});
</script>

<style lang="scss" src="@/styles/components/sections/AboutSection.scss"></style>
