<template>
  <div id="app">
    <AppHeader :menuItems="menuItems"/>
    <main>
      <HeroSection />
      <AboutSection />
      <AdvantagesSection/>
      <!-- Добавляем квиз здесь -->
      <QuizComponent />
      <TeachersSection/>
      <ReviewsSection/>
      <ContactSection/>
    </main>
    <AppFooter :menuItems="menuItems"/>
    <DrumButton />
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import AppHeader from "@/styles/components/layout/AppHeader.vue";
import AppFooter from "@/styles/components/layout/AppFooter.vue";
import HeroSection from "@/styles/components/sections/HeroSection.vue";
import AboutSection from "@/styles/components/sections/AboutSection.vue";
import AdvantagesSection from "@/styles/components/sections/AdvantagesSection.vue";
import TeachersSection from "@/styles/components/sections/TeachersSection.vue";
import ReviewsSection from "@/styles/components/sections/ReviewsSection.vue";
import ContactSection from "@/styles/components/sections/ContactSection.vue";
import DrumButton from "@/styles/components/layout/DrumButton.vue";
import QuizComponent from "@/styles/components/sections/QuizComponent.vue";

export default defineComponent({
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    HeroSection,
    AboutSection,
    AdvantagesSection,
    TeachersSection,
    ReviewsSection,
    ContactSection,
    DrumButton,
    QuizComponent, // Добавили компонент квиза
  },
  setup() {
    const menuItems = ref([
      {title: 'О нас', href: '#about'},
      {title: 'Преимущества', href: '#advantages'},
      {title: 'Квиз', href: '#quiz'}, // Добавили пункт меню для квиза
      {title: 'Преподаватели', href: '#teachers'},
      {title: 'Отзывы', href: '#reviews'},
      {title: 'Контакты', href: '#contact'},
    ]);

    return {
      menuItems,
    };
  },
});
</script>

<style lang="scss" src="@/styles/App.scss"></style>