<template>
    <div class="advantage-modal" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <h2>{{ advantage.title }}</h2>
        <div class="fullscreen-carousel" @click="handleOutsideClick">
          <swiper
            :pagination="pagination"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide class="text-slide">
              <p v-if="advantage.details && advantage.details.text">{{ advantage.details.text }}</p>
              <p v-else>Описание отсутствует</p>
            </swiper-slide>
            
            <swiper-slide v-for="(image, index) in advantage.details.images" :key="'img-' + index">
              <img :src="image" :alt="advantage.title + ' ' + (index + 1)" />
            </swiper-slide>
            
            <swiper-slide v-for="(video, index) in advantage.details.videos" :key="'vid-' + index">
              <iframe :src="video" frameborder="0" allowfullscreen></iframe>
            </swiper-slide>
            
            <div class="swiper-pagination"></div>
          </swiper>
        </div>
      </div>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    advantage: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const closeModal = () => {
      emit('close');
      document.body.style.overflow = 'auto'; // Включаем прокрутку при закрытии модального окна
    };

    const handleOutsideClick = (event) => {
      if (event.target === event.currentTarget) {
        closeModal();
      }
    };

    return {
      pagination: {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
      modules: [Pagination],
      closeModal,
      handleOutsideClick,
    };
  },
  mounted() {
    document.body.style.overflow = 'hidden'; // Отключаем прокрутку при открытии модального окна
  },
  beforeUnmount() {
    document.body.style.overflow = 'auto'; // Включаем прокрутку при уничтожении компонента
  }
};
</script>

<style lang="scss" scoped>
.advantage-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  

  .swiper {
    width: 100%;
    height: 100%;
    max-width: 98%; // Убираем рамки по бокам, чтобы заняло всю ширину
    max-height: 80%;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    line-height: 3;
    
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
  }

  .swiper-pagination-bullet {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 14px;
    color: #000;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    display: inline-block;
    margin: 0 10px;
  }

  .swiper-pagination-bullet-active {
    background-color: #007aff;
    color: #fff;
  }

  .close-button {
    position: absolute;
    right: 1rem;
    font-size: 2rem; // Увеличиваем кнопку закрытия
    background: none;
    border: none;
    cursor: pointer;
    color: #ffffff;
    z-index: 1001;
  }

  .modal-content {
    position: relative;
    max-width: 100%;
    max-height: 100%;
  }

  .fullscreen-carousel {
    width: 100%;
    height: 70vh;
    overflow: hidden;
    position: relative;
  }

  .text-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
    background-color: rgba(0, 0, 0, 0.1);
    color: #000000;
    line-height: 1.6;
  }
}
</style>
