<!-- components/common/AdvantageCard.vue -->
<template>
  <div class="advantage-card" @click="$emit('click')">
    <div class="icon-wrapper">
      <font-awesome-icon :icon="icon" />
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
    <div class="more-info-icon">
      <font-awesome-icon icon="search" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdvantageCard',
  props: {
    icon: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.advantage-card {
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .icon-wrapper {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.9rem;
    color: #666;
  }

  .more-info-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: var(--primary-color);
    font-size: 1.2rem;
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>