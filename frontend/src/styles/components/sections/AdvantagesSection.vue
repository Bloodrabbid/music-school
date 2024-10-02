<template>
  <section id="advantages" class="section advantages" aria-labelledby="advantages-title">
    <!-- Red blurred transition at the top -->
    <img
      src="@/assets/red-transition-top-advantage.png"
      alt=""
      class="section-transition-top"
      loading="lazy"
      aria-hidden="true"
    />

    <div class="container">
      <h2 id="advantages-title" class="section-title" v-scroll-animation>Наши преимущества</h2>
      <ul class="advantages-grid">
        <li v-for="(advantage, index) in advantages" :key="index" class="advantage-item">
          <AdvantageCard
            :title="advantage.title"
            :description="advantage.description"
            :icon="['fas', advantage.iconName]"
            v-scroll-animation="{ delay: index * 50, duration: 500 }"
          />
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AdvantageCard from '@/styles/components/common/AdvantageCard.vue';

export default defineComponent({
  name: 'AdvantagesSection',
  components: {
    AdvantageCard
  },
  setup() {
    const advantages = ref([
      {
        iconName: 'clock',
        title: 'Гибкое расписание',
        description: 'Вы сами решаете, когда прийти на урок или репетицию.'
      },
      {
        iconName: 'user',
        title: 'Индивидуальный подход',
        description: 'Уроки проводятся индивидуально - особый подход к каждому.'
      },
      {
        iconName: 'music',
        title: 'Профессиональное оборудование',
        description: 'Оборудование всегда доступно для занятий и репетиций.'
      },
      {
        iconName: 'star',
        title: 'Крутые мероприятия',
        description: 'Концерты, мастер-классы и возможность выступить на настоящей сцене.'
      }
    ]);

    return {
      advantages,
    };
  },
});
</script>
<style lang="scss" src="@/styles/components/sections/AdvantagesSection.scss"></style>
