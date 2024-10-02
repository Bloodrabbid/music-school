<!-- components/AppFooter.vue -->
<template>
  <footer class="app-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <img src="../../../assets/logo.svg" alt="БУМ школа-студия музыки" />
        </div>
        <div class="footer-links">
          <h3>Быстрые ссылки</h3>
          <ul>
            <li v-for="item in menuItems" :key="item.href">
              <a :href="item.href">{{ item.title }}</a>
            </li>
          </ul>
        </div>
        <div class="footer-contact">
          <h3>Контакты</h3>
          <p>Адрес: ул. Музыкальная, 123, Хабаровск</p>
          <p>Телефон: +7 (123) 456-7890</p>
          <p>Email: info@bum-music.ru</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2023 БУМ школа-студия музыки. Все права защищены.</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppFooter',
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
});
</script>

<style lang="scss" src="@/styles/components/layout/AppFooter.scss"></style>