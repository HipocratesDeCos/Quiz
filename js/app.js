let datos;
let aciertos = 0;
let fallos = 0;

async function cargarMateria(nombreMateria) {
  document.getElementById('menu-principal').style.display = 'none';
  const response = await fetch(`json/${nombreMateria}.json`);
  datos = await response.json();
  mostrarTemas(datos.temas, nombreMateria);
}

function mostrarTemas(temas, materia) {
  const cont = document.getElementById('contenido');
  cont.innerHTML = `<h2>${materia}</h2>`;
  temas.forEach((tema, index) => {
    cont.innerHTML += `<button class='btn' onclick=\"mostrarQuiz(${index})\">${tema.nombre}</button>`;
  });
  cont.innerHTML += `<button class='btn' onclick=\"volverMenu()\">🏠 Volver al menú principal</button>`;
}

function mostrarQuiz(indexTema) {
  const tema = datos.temas[indexTema];
  const cont = document.getElementById('contenido');
  aciertos = 0;
  fallos = 0;
  let html = `<h2>${tema.nombre}</h2><p>${tema.introduccion}</p>`;
  tema.preguntas.forEach((pregunta, i) => {
    html += `<div class='question'>${pregunta.texto}</div>`;
    html += `<div class='options'>`;
    pregunta.opciones.forEach((op, j) => {
      html += `<label><input type='checkbox' name='p${i}' value='${j}'> ${op}</label>`;
    });
    html += `</div>`;
    html += `<button class='btn' onclick='validar(${i}, ${JSON.stringify(pregunta.correctas)})'>Validar</button>`;
    html += `<span class='saber-mas' onclick=\"toggleExtra('extra${i}')\">Saber más</span>`;
    html += `<div class='extra' id='extra${i}'>${pregunta.explicacion}</div>`;
  });
  html += `<div class='score' id='resultado'></div>`;
  html += `<button class='btn' onclick=\"mostrarTemas(datos.temas, '${datos.nombre}')\">🔙 Volver a temas</button>`;
  html += `<button class='btn' onclick=\"volverMenu()\">🏠 Volver al menú principal</button>`;
  cont.innerHTML = html;
}

function validar(numPregunta, correctas) {
  const opciones = document.getElementsByName(`p${numPregunta}`);
  let seleccionadas = [];
  opciones.forEach((op, i) => {
    if (op.checked) seleccionadas.push(i);
  });
  let esCorrecta = JSON.stringify(seleccionadas.sort()) === JSON.stringify(correctas.sort());
  if (esCorrecta) {
    aciertos++;
    opciones.forEach(op => op.parentElement.classList.add('correct'));
  } else {
    fallos++;
    opciones.forEach(op => op.parentElement.classList.add('incorrect'));
  }
  document.getElementById('resultado').innerHTML = `✅ Aciertos: ${aciertos} | ❌ Fallos: ${fallos}`;
}

function toggleExtra(id) {
  const el = document.getElementById(id);
  el.style.display = (el.style.display === 'block') ? 'none' : 'block';
}

function volverMenu() {
  document.getElementById('contenido').innerHTML = '';
  document.getElementById('menu-principal').style.display = 'block';
}
