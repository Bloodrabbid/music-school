<template>
    <section id="quiz" class="quiz-section">
      <div class="quiz-container">
        <!-- Прогресс-бар с мотивирующим текстом -->
        <div v-if="instrumentSelected && !showResult" class="progress-container">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <p class="progress-text">Чтобы стать героем, осталось заполнить {{ remainingPercentage }}%!</p>
        </div>
  
        <!-- Выбор инструмента -->
        <div v-if="!instrumentSelected" class="instrument-selection">
          <h2>Выберите ваш инструмент</h2>
          <div class="answers-container" ref="answersContainer">
            <div class="scroll-indicator top" v-show="showTopIndicator"></div>
            <div class="answers">
              <button
                v-for="instr in instruments"
                :key="instr"
                @click="selectInstrument(instr)"
                class="answer-btn"
                ref="answerButtons"
              >
                {{ instr }}
              </button>
            </div>
            <div class="scroll-indicator bottom" v-show="showBottomIndicator"></div>
          </div>
        </div>
  
        <!-- Вопросы -->
        <div v-else-if="!showResult" class="question-section">
          <h2>{{ currentQuestion.question }}</h2>
          <div class="answers-container" ref="answersContainer">
            <div class="scroll-indicator top" v-show="showTopIndicator"></div>
            <div class="answers">
              <button
                v-for="(answer, index) in currentQuestion.answers"
                :key="index"
                @click="(event) => selectAnswer(answer, currentQuestion.key, event)"
                class="answer-btn"
                ref="answerButtons"
              >
                {{ answer }}
              </button>
            </div>
            <div class="scroll-indicator bottom" v-show="showBottomIndicator"></div>
          </div>
        </div>
  
        <!-- Результат -->
        <div v-else class="result-section">
          <h2>Спасибо за прохождение квиза!</h2>
          <p>{{ resultMessage }}</p>
          <button @click="restartQuiz" class="answer-btn restart-btn">Пройти снова</button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, watch, onMounted, nextTick } from 'vue';
  import { useStore } from 'vuex';
  import gsap from 'gsap';
  
  const store = useStore();
  
  const instruments = computed(() => store.state.instruments);
  const instrument = computed(() => store.state.instrument);
  const questions = computed(() => store.state.questions);
  const currentQuestionIndex = computed(() => store.state.currentQuestionIndex);
  const selectedAnswers = computed(() => store.state.selectedAnswers);
  const progress = computed(() => store.state.progress);
  const showResult = computed(() => store.state.showResult);
  
  const resultMessage = ref('');
  
  const instrumentSelected = computed(() => instrument.value !== null);
  const currentQuestion = computed(() => store.getters.currentQuestion);
  
  const remainingPercentage = computed(() => {
    return 100 - Math.round(progress.value);
  });
  
  const answersContainer = ref(null);
  const answerButtons = ref([]);
  const showTopIndicator = ref(false);
  const showBottomIndicator = ref(false);
  
  const selectInstrument = (instr) => {
    store.dispatch('selectInstrument', instr);
  };
  
  const selectAnswer = (answer, key, event) => {
    gsap.to(event.target, { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 });
    animateQuestionOut(() => {
      store.dispatch('selectAnswer', { answer, key });
      if (showResult.value) {
        generateResultMessage();
        animateResultIn();
      } else {
        nextTick(() => {
          scrollToSelectedButton(event.target);
        });
      }
    });
  };
  
  const scrollToSelectedButton = (button) => {
    const container = answersContainer.value;
    if (!container) return;
  
    const buttonRect = button.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
  
    if (buttonRect.bottom > containerRect.bottom) {
      container.scrollTop += buttonRect.bottom - containerRect.bottom;
    } else if (buttonRect.top < containerRect.top) {
      container.scrollTop -= containerRect.top - buttonRect.top;
    }
  };
  
  const restartQuiz = () => {
    store.dispatch('resetQuiz');
  };
  
  const generateResultMessage = () => {
    const learner = store.state.answers['learner'];
    const goal = store.state.answers['goal'];
    const instrumentName = instrument.value.toLowerCase();
  
    let learnerText = '';
    if (learner === 'Себе') {
      learnerText = 'Вы сделали первый шаг';
    } else if (learner === 'Ребенку') {
      learnerText = 'Ваш ребенок сделал первый шаг';
    }
  
    resultMessage.value = `${learnerText} к тому, чтобы стать настоящим героем музыки на ${instrumentName}. ${goal ? `Ваша цель – ${goal.toLowerCase()}, и мы поможем ее достичь.` : ''} Наша студия готова сопровождать вас на этом пути!`;
  };
  
  const animateQuestionIn = () => {
  nextTick(() => {
    gsap.set('.question-section', { x: 300, opacity: 0 }); // Сброс стилей перед анимацией
    gsap.to('.question-section', { x: 0, opacity: 1, duration: 0.5 });
  });
};

const animateQuestionOut = (onComplete) => {
  gsap.to('.question-section', { 
    x: -300, 
    opacity: 0, 
    duration: 0.5, 
    onComplete: () => {
      onComplete();
      nextTick(() => {
        animateQuestionIn();
      });
    }
  });
};
  
  const animateResultIn = () => {
    gsap.from('.result-section', { x: 300, opacity: 0, duration: 0.5 });
  };
  
  const checkScroll = () => {
    const container = answersContainer.value;
    if (!container) return;
  
    showTopIndicator.value = container.scrollTop > 0;
    showBottomIndicator.value = container.scrollTop < container.scrollHeight - container.clientHeight;
  };
  
  watch(currentQuestionIndex, () => {
    nextTick(() => {
      checkScroll();
    });
  });
  
  onMounted(() => {
    store.dispatch('initializeQuiz');
    if (answersContainer.value) {
      answersContainer.value.addEventListener('scroll', checkScroll);
      checkScroll();
    }
  });
  </script>
  
  <style scoped>
  .quiz-section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    padding: 20px;
    color: #000000;
  }
  
  .quiz-container {
    width: 100%;
    max-width: 500px;
    background-color: #f5f5f5;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    padding: 30px;
    position: relative;
  }
  
  .progress-container {
    margin-bottom: 20px;
  }
  
  .progress-bar {
    background-color: #ddd;
    border-radius: 10px;
    overflow: hidden;
    height: 10px;
    width: 100%;
  }
  
  .progress-fill {
    background-color: #6a5acd;
    height: 100%;
    transition: width 0.5s ease-in-out;
  }
  
  .progress-text {
    margin-top: 10px;
    font-size: 16px;
    text-align: center;
  }
  
  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: center;
    word-wrap: break-word;
    hyphens: auto;
  }
  
  .answers-container {
    position: relative;
    max-height: 300px;
    overflow-y: auto;
    margin-top: 20px;
  }
  
  .answers {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .answer-btn {
    padding: 12px 24px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 8px;
    color: #fff;
    background-color: #48d1cc;
    transition: transform 0.2s, background-color 0.2s;
    word-wrap: break-word;
    text-align: center;
  }
  
  .answer-btn:hover {
    transform: scale(1.05);
  }
  
  .answer-btn:active {
    transform: scale(0.95);
  }
  
  .scroll-indicator {
    position: absolute;
    left: 0;
    right: 0;
    height: 20px;
    pointer-events: none;
  }
  
  .scroll-indicator.top {
    top: 0;
    background: linear-gradient(to bottom, rgba(245, 245, 245, 1), rgba(245, 245, 245, 0));
  }
  
  .scroll-indicator.bottom {
    bottom: 0;
    background: linear-gradient(to top, rgba(245, 245, 245, 1), rgba(245, 245, 245, 0));
  }
  
  .restart-btn {
    margin-top: 20px;

  }
  
  .result-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}
  </style>