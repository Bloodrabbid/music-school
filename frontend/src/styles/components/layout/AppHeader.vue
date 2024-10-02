<template>
  <header class="app-header" :class="{ 'menu-open': isMenuOpen }">
    <div class="container">
      <div class="logo">
        <img src="../../../assets/logo.svg" alt="БУМ школа-студия музыки"/>
      </div>
      <nav>
        <ul>
          <li v-for="item in menuItems" :key="item.href">
            <a :href="item.href" @click="closeMenu">{{ item.title }}</a>
          </li>
        </ul>
      </nav>
      <div class="burger" @click="toggleMenu">
        <div class="line" v-for="n in 3" :key="n"></div>
      </div>
    </div>
  </header>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppHeader',
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isMenuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
      }
  },
  mounted() {
    this.$nextTick(() => {
      const menuItems = this.$el.querySelectorAll('nav ul li');
      menuItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
      });
    });
  }
});
</script>

<style lang="scss" src="@/styles/components/layout/AppHeader.scss"></style>