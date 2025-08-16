# SuperQuiz - Sistema Modular de Autoevaluación

## ¿Qué es?
Una herramienta web para crear quizzes educativos basados en archivos JSON. Ideal para profesores de contabilidad, economía y finanzas.

## ¿Cómo usarlo?
1. Descarga este archivo ZIP.
2. Descomprímelo en una carpeta.
3. Abre `index.html` en tu navegador.

## ¿Cómo añadir un nuevo quiz?

1. Crea un archivo `nombre-del-tema.json` en la carpeta `/quizzes` con esta estructura:
```json
{
  "title": "Título del Tema",
  "questions": [
    {
      "intro": "Texto introductorio (150-200 palabras)",
      "question": "Pregunta",
      "options": ["Opción 1", "Opción 2", "Opción 3"],
      "correct": [0, 2],
      "saber_mas": "<p>Explicación detallada con <u>palabras clave</u>.</p>"
    }
  ]
}
