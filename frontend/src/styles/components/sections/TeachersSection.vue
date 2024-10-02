<template>
  <section id="teachers" class="section teachers">
    <div class="container">
      <h2 class="section-title" v-scroll-animation>Наши преподаватели</h2>
      <div class="teachers-grid">
        <div v-for="(teacher, index) in teachers" :key="teacher.name"
             class="teacher-card"
             v-scroll-animation="{ delay: index * 100 }">
          <img :src="teacher.photo" :alt="teacher.name">
          <h3>{{ teacher.name }}</h3>
          <p>{{ teacher.instrument }}</p>
          <p class="bio">{{ teacher.bio }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TeachersSection',
  setup() {
    const teachers = ref([
      {
        name: 'Анна Петрова',
        instrument: 'Фортепиано',
        photo: '/img/teacher1.jpg',
        bio: 'Выпускница консерватории, 10 лет опыта преподавания.'
      },
      {
        name: 'Иван Иванов',
        instrument: 'Гитара',
        photo: '/img/teacher2.jpg',
        bio: 'Профессиональный музыкант, участник рок-группы.'
      },
      // Добавьте больше преподавателей по необходимости
    ]);

    return {
      teachers
    };
  }
});
</script>

<style lang="scss" src="@/styles/components/sections/TeachersSection.scss"></style>
