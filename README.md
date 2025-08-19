# SuperQuiz

Aplicación interactiva de quizzes educativos para Contabilidad, Análisis, Economía y Marketing.

## 🚀 Características
- Navegación jerárquica: Materia → Tema → Pregunta
- Validación por pregunta (verde/rojo)
- Ventanas "Saber más" con HTML y fórmulas (MathJax)
- Responsive y listo para GitHub Pages
- Basado en JSON (fácil de actualizar)

## 📥 Cómo usar

1. Clona o descarga este repositorio
2. Ejecuta: `npm install`
3. Desarrollo: `npm run dev`
4. Build: `npm run build`

Edita `src/data/codigo.json` para agregar tus propios contenidos.

## 🌐 Deploy en GitHub Pages

1. Asegúrate de que `base: './'` en `vite.config.js`
2. Ejecuta `npm run build`
3. Sube todo el contenido de la carpeta `dist` a tu repositorio
4. En GitHub, ve a Settings → Pages → selecciona la rama (main) y carpeta `/ (root)`
5. Tu app estará en: `https://tunombre.github.io/superquiz`
