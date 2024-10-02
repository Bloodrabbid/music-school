import logging

# Настройка логирования
logging.basicConfig(filename='quiz_analytics.log', level=logging.INFO)

def log_quiz_submission(response):
    logging.info(f"Quiz completed: {response.instrument}, for child: {response.is_for_child}")