
console.log('Script loaded');

document.getElementById('start-quiz').addEventListener('click', startQuiz);

let questions = [];
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    console.log('Start quiz button clicked');
    fetch('https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=10&difficulty=easy')
        .then(response => {
            console.log('Response received:', response);
            return response.json();
        })
        .then(data => {
            console.log('Parsed API data:', JSON.stringify(data, null, 2));
            questions = data;
            if (questions.length === 0) {
                console.error('No questions received from API.');
                alert('No questions available. Please try again later.');
                return;
            }
            currentQuestionIndex = 0;
            score = 0;
            document.getElementById('start-quiz').style.display = 'none';
            document.getElementById('quiz-container').style.display = 'block';
            document.getElementById('score-container').innerHTML = '';
            showQuestion();
        })
        .catch(error => {
            console.error('Error parsing JSON:', error);
            alert('Error fetching trivia questions. Please check your connection and try again.');
        });
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        console.log('Current question:', question);
        document.getElementById('question-container').innerHTML = question.question;


        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = ''; 
        const options = [...question.incorrectAnswers, question.correctAnswer];
        options.sort(() => Math.random() - 0.5); 
        options.forEach(option => {
            const button = document.createElement('button');
            button.innerHTML = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });

        optionsContainer.style.display = 'block';
    } else {
        endQuiz();
    }
}

function checkAnswer(answer) {
    const question = questions[currentQuestionIndex];
    console.log('Selected answer:', answer);
    console.log('Correct answer:', question.correctAnswer);
    if (question.correctAnswer.toLowerCase() === answer.toLowerCase()) {
        score++;
    }
    currentQuestionIndex++;
    document.getElementById('options-container').style.display = 'none';
    showQuestion();
}

function endQuiz() {
    console.log('Ending quiz...');
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('start-quiz').style.display = 'block';
    document.getElementById('score-container').innerHTML = `Quiz over! Your score: ${score}/${questions.length}`;
    console.log('Quiz ended. Final score:', score);
}
