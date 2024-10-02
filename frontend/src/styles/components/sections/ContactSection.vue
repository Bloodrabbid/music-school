<!-- components/ContactSection.vue -->
<template>
  <section id="contact" class="section contact" aria-labelledby="contact-title">
    <div class="container">
      <h2 id="contact-title" class="section-title">Записаться на пробное занятие</h2>
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Имя</label>
          <input 
            type="text" 
            id="name" 
            v-model="form.name" 
            required 
            aria-required="true"
            :class="{ 'is-invalid': v$.form.name.$error }"
            :aria-invalid="v$.form.name.$error"
            :aria-describedby="v$.form.name.$error ? 'name-error' : null"
          >
          <div v-if="v$.form.name.$error" id="name-error" class="invalid-feedback">
            {{ v$.form.name.$errors[0].$message }}
          </div>
        </div>
        <div class="form-group">
          <label for="phone">Телефон</label>
          <input 
            type="tel" 
            id="phone" 
            v-model="form.phone" 
            required 
            aria-required="true" 
            :class="{ 'is-invalid': v$.form.phone.$error }"
            :aria-invalid="v$.form.phone.$error"
            :aria-describedby="v$.form.phone.$error ? 'phone-error' : null"
          >
          <div v-if="v$.form.phone.$error" id="phone-error" class="invalid-feedback">
            {{ v$.form.phone.$errors[0].$message }}
          </div>
        </div>
        <div class="form-group">
          <label for="instrument">Инструмент</label>
          <select 
            id="instrument" 
            v-model="form.instrument" 
            required 
            aria-required="true"
            :class="{ 'is-invalid': v$.form.instrument.$error }"
            :aria-invalid="v$.form.instrument.$error"
            :aria-describedby="v$.form.instrument.$error ? 'instrument-error' : null"
          >
            <option value="">Выберите инструмент</option>
            <option value="guitar">Гитара</option>
            <option value="drums">Барабаны</option>
            <option value="piano">Фортепиано</option>
          </select>
          <div v-if="v$.form.instrument.$error" id="instrument-error" class="invalid-feedback">
            {{ v$.form.instrument.$errors[0].$message }}
          </div>
        </div>
        <button type="submit" class="btn" :disabled="v$.$invalid">Отправить заявку</button>
      </form>
    </div>
  </section>
</template>

<script>
import { defineComponent, reactive } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';
import axios from 'axios';

export default defineComponent({
  name: 'ContactSection',
  setup() {
    const form = reactive({
      name: '',
      phone: '',
      instrument: '',
    });

    const rules = {
      form: {
        name: { required: helpers.withMessage('Имя обязательно для заполнения', required) },
        phone: { 
          required: helpers.withMessage('Телефон обязателен для заполнения', required),
          validPhone: helpers.withMessage('Введите корректный номер телефона', helpers.regex(/^(\+7|8)\d{10}$/))
        },
        instrument: { required: helpers.withMessage('Выберите инструмент', required) },
      }
    };

    const v$ = useVuelidate(rules, { form });

    const submitForm = async () => {
      const isFormCorrect = await v$.value.$validate();
      if (!isFormCorrect) return;

      try {
        const response = await axios.post('http://localhost:8000/submit_quiz/', {
          ...form,
          goals: 'Пробное занятие',
          music_genres: [],
          is_for_child: false,
        });
        console.log(response.data);
        alert('Заявка успешно отправлена!');
        // Очистка формы
        form.name = '';
        form.phone = '';
        form.instrument = '';
        v$.value.$reset();
      } catch (error) {
        console.error('Ошибка при отправке формы:', error);
        alert('Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз.');
      }
    };

    return {
      form,
      submitForm,
      v$,
    };
  },
});
</script>

<style lang="scss" src="@/styles/components/sections/ContactSection.scss"></style>