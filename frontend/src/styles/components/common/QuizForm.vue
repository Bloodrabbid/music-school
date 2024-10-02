<template>
  <div class="quiz-form">
    <form @submit.prevent="submitQuiz">
      <div>
        <label for="instrument">Какой инструмент вас интересует?</label>
        <select v-model="quiz.instrument" id="instrument">
          <option value="drums">Барабаны</option>
          <option value="guitar">Гитара</option>
          <option value="piano">Фортепиано</option>
        </select>
      </div>

      <div>
        <label for="goals">Какие ваши цели?</label>
        <input v-model="quiz.goals" type="text" id="goals" />
      </div>

      <div>
        <label for="genres">Какие музыкальные жанры вам интересны?</label>
        <input v-model="quiz.genres" type="text" id="genres" />
      </div>

      <div>
        <label>Для кого занятие?</label>
        <label><input type="radio" v-model="quiz.is_for_child" :value="false" /> Для себя</label>
        <label><input type="radio" v-model="quiz.is_for_child" :value="true" /> Для ребенка</label>
      </div>

      <button type="submit">Отправить</button>
    </form>
    <div v-if="result">{{ result.message }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quiz: {
        instrument: 'guitar',
        goals: '',
        genres: '',
        is_for_child: false,
      },
      result: null,
    };
  },
  methods: {
    async submitQuiz() {
      const response = await fetch('http://localhost:8000/submit_quiz/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instrument: this.quiz.instrument,
          goals: this.quiz.goals,
          music_genres: this.quiz.genres.split(','),
          is_for_child: this.quiz.is_for_child,
        }),
      });
      this.result = await response.json();
    },
  },
};
</script>

<style lang="scss" src="@/styles/components/common/QuizForm.scss"></style>