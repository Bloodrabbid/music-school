<template>
  <header class="app-header" :class="{ 'menu-open': isMenuOpen, 'header-hidden': isHeaderHidden }">
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
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';

export default defineComponent({
  name: 'AppHeader',
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const isMenuOpen = ref(false);
    const isHeaderHidden = ref(false);
    let lastScrollTop = 0;

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollTop > lastScrollTop && currentScrollTop > 50) {
        // Scrolling down
        isHeaderHidden.value = true;
      } else {
        // Scrolling up
        isHeaderHidden.value = false;
      }
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
      const menuItems = document.querySelectorAll('nav ul li');
      menuItems.forEach((item, index) => {
        item.style.setProperty('--item-index', index);
      });
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll);
    });

    return {
      isMenuOpen,
      isHeaderHidden,
      toggleMenu,
      closeMenu
    };
  }
});
</script>

<style lang="scss" src="@/styles/components/layout/AppHeader.scss"></style>