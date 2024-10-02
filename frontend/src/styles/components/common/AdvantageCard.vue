<!-- components/common/AdvantageCard.vue -->
<template>
  <div class="advantage-card">
    <div class="icon-wrapper">
      <font-awesome-icon :icon="icon" />
    </div>
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: 'AdvantageCard',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    icon: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" src="@/styles/components/common/AdvantageCard.scss"></style>