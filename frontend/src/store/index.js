import { createStore } from 'vuex';
import questionsData from '@/data/questions.yaml';

export default createStore({
  state: {
    instruments: [],
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswers: [],
    instrument: null,
    progress: 0,
    showResult: false,
    answers: {}, // Хранение ответов с ключами
  },
  mutations: {
    SET_INSTRUMENTS(state, instruments) {
      state.instruments = instruments;
    },
    SET_INSTRUMENT(state, instrument) {
      state.instrument = instrument;
      state.questions = questionsData.questions[instrument];
    },
    SET_ANSWER(state, { key, value }) {
      state.answers[key] = value;
      state.selectedAnswers.push({ key, value });
    },
    NEXT_QUESTION(state) {
      state.currentQuestionIndex++;
      // Проверка условий для следующих вопросов
      while (state.currentQuestionIndex < state.questions.length) {
        const question = state.questions[state.currentQuestionIndex];
        if (question.condition) {
          const { key, value } = question.condition;
          if (state.answers[key] !== value) {
            state.currentQuestionIndex++;
            continue;
          }
        }
        break;
      }
      state.progress = (state.currentQuestionIndex / state.questions.length) * 100;
    },
    RESET_QUIZ(state) {
      state.currentQuestionIndex = 0;
      state.selectedAnswers = [];
      state.progress = 0;
      state.showResult = false;
      state.instrument = null;
      state.answers = {};
    },
    SHOW_RESULT(state) {
      state.showResult = true;
    },
  },
  actions: {
    initializeQuiz({ commit }) {
      commit('SET_INSTRUMENTS', questionsData.instruments);
    },
    selectInstrument({ commit }, instrument) {
      commit('SET_INSTRUMENT', instrument);
    },
    selectAnswer({ commit, state }, { answer, key }) {
      commit('SET_ANSWER', { key, value: answer });
      if (state.currentQuestionIndex < state.questions.length - 1) {
        commit('NEXT_QUESTION');
      } else {
        commit('SHOW_RESULT');
      }
    },
    resetQuiz({ commit }) {
      commit('RESET_QUIZ');
    },
  },
  getters: {
    currentQuestion(state) {
      return state.questions[state.currentQuestionIndex];
    },
  },
});