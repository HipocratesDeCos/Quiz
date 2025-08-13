let currentQuizData = null;

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    const quizList = document.querySelectorAll('[data-quiz]');
    quizList.forEach(btn => {
        btn.addEventListener('click', () => {
            const quizId = btn.getAttribute('data-quiz');
            loadQuiz(quizId);
        });
    });
});

async function loadQuiz(quizId) {
    try {
        const response = await fetch(`js/quizzes/${quizId}.json`);
        if (!response.ok) throw new Error('No se pudo cargar el quiz');
        currentQuizData = await response.json();
        document.getElementById('quiz-title').textContent = currentQuizData.title;
        const content = document.getElementById('quiz-content');
        content.innerHTML = '';

        currentQuizData.questions.forEach((q, index) => {
            content.innerHTML += `
                <div class="question">
                    ${q.intro ? `<div class="question-intro"><p>${q.intro}</p></div>` : ''}
                    <div class="question-text">${q.question}</div>
                    <div class="options" id="options-${index}">
                        ${q.options.map((opt, i) => `
                            <div class="option" onclick="toggleSelect(this, ${index}, ${i})">${opt}</div>
                        `).join('')}
                    </div>
                    <div class="feedback" id="feedback-${index}" style="display:none;"></div>
                    <div class="question-actions">
                        <button class="btn btn-validate" onclick="validateAnswer(${index}, ${JSON.stringify(q.correct)})">Validar respuesta</button>
                        <button class="btn-saber-mas" onclick="openModal(${index})">Saber más</button>
                    </div>
                </div>
            `;
        });

        showPage('quiz-page');
    } catch (error) {
        alert('Error al cargar el quiz: ' + error.message);
    }
}

function toggleSelect(option, qIndex, oIndex) {
    option.classList.toggle('selected');
}

function validateAnswer(qIndex, correct) {
    const options = document.querySelectorAll(`#options-${qIndex} .option`);
    const feedback = document.getElementById(`feedback-${qIndex}`);
    let selected = [];

    options.forEach((opt, i) => {
        if (opt.classList.contains('selected')) selected.push(i);
    });

    if (selected.length === 0) {
        feedback.textContent = 'Selecciona al menos una opción.';
        feedback.className = 'feedback incorrect';
        feedback.style.display = 'block';
        return;
    }

    const isCorrect = selected.length === correct.length && 
                      selected.every(i => correct.includes(i)) && 
                      correct.every(i => selected.includes(i));

    feedback.textContent = isCorrect ? '¡Correcto!' : 'Incorrecto. Revisa tus selecciones.';
    feedback.className = 'feedback ' + (isCorrect ? 'correct' : 'incorrect');
    feedback.style.display = 'block';

    options.forEach((opt, i) => {
        if (correct.includes(i)) opt.classList.add('correct');
        else if (selected.includes(i) && !correct.includes(i)) opt.classList.add('incorrect');
        opt.style.pointerEvents = 'none';
    });

    document.querySelector(`#options-${qIndex}`).previousElementSibling.querySelector('.btn-validate').disabled = true;
}

function openModal(qIndex) {
    const modal = document.getElementById('saberMasModal');
    const content = document.getElementById('saberMasContent');
    const question = currentQuizData.questions[qIndex];
    content.innerHTML = question.saber_mas;
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('saberMasModal').style.display = 'none';
}

window.onclick = function(event) {
    const modal = document.getElementById('saberMasModal');
    if (event.target === modal) closeModal();
};
