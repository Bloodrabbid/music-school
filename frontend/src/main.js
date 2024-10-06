import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { scrollAnimation } from './directives/scrollAnimation';
import './styles/main.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faUser, faMusic, faStar, faSearch, faGuitar, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import store from './store'; // Импортируем Vuex store
import gsap from 'gsap'; // Импортируем GSAP

// Добавление иконок в библиотеку
library.add(faClock, faUser, faMusic, faStar, faSearch, faGuitar, faGraduationCap);

const app = createApp(App);

// Регистрация глобальных директив и компонентов
app.directive('scroll-animation', scrollAnimation);
app.component('font-awesome-icon', FontAwesomeIcon);

// Использование маршрутизатора и Vuex store
app.use(router);
app.use(store);

app.mount('#app');