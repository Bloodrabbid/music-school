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
            @click="openModal(advantage)"
          />
        </li>
      </ul>
    </div>

    <AdvantageModal
      v-if="selectedAdvantage"
      :advantage="selectedAdvantage"
      @close="closeModal"
    />
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AdvantageCard from '@/styles/components/common/AdvantageCard.vue';
import AdvantageModal from '@/styles/components/common/AdvantageModal.vue';

export default defineComponent({
  name: 'AdvantagesSection',
  components: {
    AdvantageCard,
    AdvantageModal
  },
  setup() {
    const getRandomImages = (count) => {
      return Array.from({ length: count }, (_, i) => `https://picsum.photos/400/300?random=${i}`);
    };

    const getRandomVideos = (count) => {
      const videoIds = ['ZTFTngOG2bg', 'K4TOrB7rX2Y', 'C0DPdy98e4c', 'FkMWsO_-maw', 'L_LUpnjgPso'];
      return Array.from({ length: count }, () => {
        const randomId = videoIds[Math.floor(Math.random() * videoIds.length)];
        return `https://www.youtube.com/embed/${randomId}`;
      });
    };

    const advantages = ref([
      {
        iconName: 'clock',
        title: 'Гибкое расписание',
        description: 'Вы сами решаете, когда прийти на урок или репетицию.',
        details: {
          text: 'Наше гибкое расписание позволяет вам выбирать удобное время для занятий. Мы работаем с раннего утра до позднего вечера, включая выходные дни. Вы можете легко согласовать уроки с вашим рабочим графиком или учебой.',
          images: getRandomImages(3),
          videos: getRandomVideos(2)
        }
      },
      {
        iconName: 'user',
        title: 'Индивидуальный подход',
        description: 'Уроки проводятся индивидуально - особый подход к каждому.',
        details: {
          text: 'Мы понимаем, что каждый ученик уникален. Наши преподаватели разрабатывают индивидуальную программу обучения, учитывая ваши цели, уровень подготовки и темп обучения. Это позволяет достичь максимальных результатов в кратчайшие сроки.',
          images: getRandomImages(4),
          videos: getRandomVideos(1)
        }
      },
      {
        iconName: 'guitar',
        title: 'Современное оборудование',
        description: 'Занятия проходят на профессиональном оборудовании.',
        details: {
          text: 'Наша студия оснащена самым современным музыкальным оборудованием. У нас есть профессиональные инструменты, звукозаписывающая аппаратура и программное обеспечение для создания музыки. Это позволяет нашим ученикам работать с тем же оборудованием, которое используется в профессиональных студиях.',
          images: getRandomImages(3),
          videos: getRandomVideos(2)
        }
      },
      {
        iconName: 'music',
        title: 'Разнообразие стилей',
        description: 'Обучаем игре в различных музыкальных стилях и жанрах.',
        details: {
          text: 'Мы не ограничиваемся одним музыкальным стилем. Наши преподаватели помогут вам освоить любой жанр - от классики до рока, от джаза до электронной музыки. Вы сможете экспериментировать и найти свой уникальный стиль.',
          images: getRandomImages(5),
          videos: getRandomVideos(2)
        }
      },
      {
        iconName: 'graduation-cap',
        title: 'Опытные преподаватели',
        description: 'Наши учителя - профессиональные музыканты с большим опытом.',
        details: {
          text: 'Наши преподаватели - это не только опытные педагоги, но и активно выступающие музыканты. Они имеют богатый опыт концертной деятельности и готовы поделиться своими знаниями и секретами мастерства. Многие из них являются лауреатами международных конкурсов.',
          images: getRandomImages(4),
          videos: getRandomVideos(3)
        }
      },
      {
        iconName: 'star',
        title: 'Выступления на сцене',
        description: 'Регулярные концерты и возможность выступить на настоящей сцене.',
        details: {
          text: 'Мы регулярно организуем концерты для наших учеников. Это отличная возможность показать свои достижения, побороть страх сцены и получить опыт выступления перед публикой. Лучшие ученики получают возможность участвовать в городских мероприятиях и фестивалях.',
          images: getRandomImages(6),
          videos: getRandomVideos(2)
        }
      }
    ]);

    const selectedAdvantage = ref(null);

    const openModal = (advantage) => {
      selectedAdvantage.value = advantage;
    };

    const closeModal = () => {
      selectedAdvantage.value = null;
    };

    return {
      advantages,
      selectedAdvantage,
      openModal,
      closeModal
    };
  },
});
</script>

<style lang="scss" src="@/styles/components/sections/AdvantagesSection.scss">
/* Добавьте следующие стили */
.advantage-item {
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}
</style>