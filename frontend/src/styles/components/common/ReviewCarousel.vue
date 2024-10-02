<template>
  <div class="review-carousel">
    <div class="review" v-for="review in reviews" :key="review.name">
      <div class="stars">
        {{ '★'.repeat(review.rating) }}{{ '☆'.repeat(5 - review.rating) }}
      </div>
      <p class="review-text">"{{ review.text }}"</p>
      <p class="review-author">- {{ review.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewCarousel',
  props: {
    reviews: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" src="@/styles/components/common/ReviewCarousel.scss"></style>
