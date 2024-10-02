<!-- components/ReviewsSection.vue -->
<template>
  <section id="reviews" class="section reviews">
    <div class="container">
      <h2 class="section-title fade-in-up">Отзывы о нас</h2>
      <div class="reviews-slider fade-in-up">
        <div v-for="review in paginatedReviews" :key="review.id" class="review-card">
          <div class="review-content">
            <p class="review-text">"{{ review.text }}"</p>
            <p class="review-author">- {{ review.author }}</p>
          </div>
        </div>
      </div>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">&lt; Назад</button>
        <span>{{ currentPage }} из {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Вперед &gt;</button>
      </div>
      <div id="page-change-announcer" class="visually-hidden" aria-live="polite"></div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';

export default defineComponent({
  name: 'ReviewsSection',
  setup() {
    const reviews = ref([
      {
        id: 1,
        text: 'Отличная школа! Преподаватели - настоящие профессионалы своего дела.',
        author: 'Анна С.',
      },
      {
        id: 2,
        text: 'Благодаря БУМ! я наконец-то научился играть на гитаре. Спасибо за индивидуальный подход!',
        author: 'Иван П.',
      },
      {
        id: 3,
        text: 'Атмосфера в школе просто потрясающая. Всегда с удовольствием хожу на занятия.',
        author: 'Мария К.',
      },
      // Добавьте больше отзывов здесь
    ]);

    const itemsPerPage = 3;
    const currentPage = ref(1);

    const totalPages = computed(() => Math.ceil(reviews.value.length / itemsPerPage));

    const paginatedReviews = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return reviews.value.slice(start, end);
    });

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const prevPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const announcePageChange = () => {
      const announcement = `Страница ${currentPage.value} из ${totalPages.value}`;
      const announcer = document.getElementById('page-change-announcer');
      if (announcer) {
        announcer.textContent = announcement;
      }
    };

    watch(currentPage, announcePageChange);

    return {
      paginatedReviews,
      currentPage,
      totalPages,
      nextPage,
      prevPage,
      announcePageChange
    };
  },
});
</script>


