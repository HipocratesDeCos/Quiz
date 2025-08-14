let currentQuizData = null;

/**
 * Cambia entre páginas del sistema (menú principal, menú de contabilidad, quiz)
 * @param {string} pageId - ID de la página a mostrar
 */
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

/**
 * Se ejecuta al cargar la página. Asocia eventos a los botones del menú.
 */
document.addEventListener('DOMContentLoaded', () => {
    const quizButtons = document.querySelectorAll('[data-quiz]');
    quizButtons.forEach(button => {
        button.addEventListener('click', () => {
            const quizId = button.getAttribute('data-quiz');
            loadQuiz(quizId);
        });
    });
});

/**
 * Carga dinámicamente un quiz desde su archivo .json
 * @param {string} quizId - Identificador del quiz (nombre del archivo sin .json)
 */
async function loadQuiz(quizId) {
    try {
        const response = await fetch(`js/quizzes/${quizId}.json`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: No se encontró el archivo ${quizId}.json`);
        }
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
        console.error('Error al cargar el quiz:', error);
        alert('No se pudo cargar el quiz. Verifica que el archivo JSON exista y tenga formato correcto.');
    }
}

/**
 * Permite seleccionar/deseleccionar una opción de respuesta
 * @param {HTMLElement} option - El elemento de la opción
 * @param {number} qIndex - Índice de la pregunta
 * @param {number} oIndex - Índice de la opción
 */
function toggleSelect(option, qIndex, oIndex) {
    option.classList.toggle('selected');
}

/**
 * Valida la respuesta seleccionada por el usuario
 * @param {number} qIndex - Índice de la pregunta
 * @param {number[]} correct - Array con los índices de las opciones correctas
 */
function validateAnswer(qIndex, correct) {
    const options = document.querySelectorAll(`#options-${qIndex} .option`);
    const feedback = document.getElementById(`feedback-${qIndex}`);
    let selected = [];

    options.forEach((opt, i) => {
        if (opt.classList.contains('selected')) {
            selected.push(i);
        }
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
        if (correct.includes(i)) {
            opt.classList.add('correct');
        } else if (selected.includes(i) && !correct.includes(i)) {
            opt.classList.add('incorrect');
        }
        opt.style.pointerEvents = 'none';
    });

    // Deshabilitar botón de validación
    document.querySelector(`#options-${qIndex}`).previousElementSibling.querySelector('.btn-validate').disabled = true;
}

/**
 * Abre el modal con información adicional ("Saber más")
 * @param {number} qIndex - Índice de la pregunta
 */
function openModal(qIndex) {
    const modal = document.getElementById('saberMasModal');
    const content = document.getElementById('saberMasContent');
    const question = currentQuizData.questions[qIndex];
    content.innerHTML = question.saber_mas;
    modal.style.display = 'flex';
}

/**
 * Cierra el modal de "Saber más"
 */
function closeModal() {
    document.getElementById('saberMasModal').style.display = 'none';
}

/**
 * Cierra el modal si se hace clic fuera del contenido
 */
window.onclick = function(event) {
    const modal = document.getElementById('saberMasModal');
    if (event.target === modal) {
        closeModal();
    }
};
