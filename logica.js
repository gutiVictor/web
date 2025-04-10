import { questions } from './questions.js';

let currentQuestion = 0;
let currentPrize = 0;
const prizes = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100];
const totalQuestions = 12; // Número total de preguntas

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export function startGame() {
    currentQuestion = 0;
    currentPrize = 0;
    shuffleArray(questions);
    updatePrizeLadder();
    showQuestion();
}

function showQuestion() {
    const questionData = questions[currentQuestion];
    document.getElementById('question').textContent = questionData.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(optionDiv);
    });
}

const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/pierde.mp3');

function checkAnswer(selectedIndex) {
    const questionData = questions[currentQuestion];
    if (selectedIndex === questionData.correct) {
        correctSound.play();
        currentPrize = prizes[currentQuestion];
        currentQuestion++;

        // Verifica si ha respondido las 12 preguntas correctamente
        if (currentQuestion === totalQuestions) {
            setTimeout(() => {
                alert(`¡Felicidades! Has ganado el juego!  Eres Un Gran Alumno  dedicado . Premio final: $${currentPrize}`);
            }, 500);
            return; // No sigue mostrando más preguntas
        }

        updatePrizeLadder();
        showQuestion();
    } else {
        wrongSound.play();
        setTimeout(() => {
            alert(`Juego terminado. Te llevas $${currentPrize}`);
            startGame();
        }, 500);
    }
}

function updatePrizeLadder() {
    const prizeLevels = document.querySelectorAll('.prize-level');
    prizeLevels.forEach((level, index) => {
        level.classList.remove('current');
        if (prizes[index] === prizes[currentQuestion]) {
            level.classList.add('current');
        }
    });
}

export function useFiftyFifty() {
    const lifeline = document.getElementById('fifty-fifty');
    if (lifeline.classList.contains('used')) return;
    
    const questionData = questions[currentQuestion];
    const options = document.querySelectorAll('.option');
    let eliminated = 0;
    
    options.forEach((option, index) => {
        if (index !== questionData.correct && eliminated < 2) {
            option.style.display = 'none';
            eliminated++;
        }
    });
    
    lifeline.classList.add('used');
}

export function usePhoneFriend() {
    const lifeline = document.getElementById('phone-friend');
    if (lifeline.classList.contains('used')) return;
    
    const questionData = questions[currentQuestion];
    alert(`Tu amigo piensa que la respuesta correcta es: ${questionData.options[questionData.correct]}`);
    lifeline.classList.add('used');
}

export function useAudience() {
    const lifeline = document.getElementById('audience');
    if (lifeline.classList.contains('used')) return;
    
    const questionData = questions[currentQuestion];
    const correctOption = questionData.options[questionData.correct];
    alert(`El público vota mayoritariamente por: ${correctOption}`);
    lifeline.classList.add('used');
}
