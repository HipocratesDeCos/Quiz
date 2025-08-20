// src/components/ResultSummary.jsx
const ResultSummary = ({ correctas, incorrectas, total }) => {
  const porcentaje = (correctas / total) * 100;
  let mensaje = '';

  if (porcentaje === 100) {
    mensaje = "¡Excelente! Has dominado este tema por completo.";
  } else if (porcentaje >= 80) {
    mensaje = "¡Muy bien! Tienes un gran dominio del contenido.";
  } else if (porcentaje >= 60) {
    mensaje = "Buen trabajo, pero hay espacio para mejorar.";
  } else if (porcentaje >= 40) {
    mensaje = "Bien, sigue repasando. Vas por buen camino.";
  } else {
    mensaje = "No te rindas. Repasa los conceptos y vuelve a intentarlo.";
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Resultado Final</h3>
      
      <div className="text-3xl font-bold mb-4">
        <span className="text-green-600">{correctas}</span>
        <span className="text-gray-500 mx-2">/</span>
        <span className="text-gray-700">{total}</span>
      </div>

      <div className="space-y-2 text-sm text-gray-600">
        <p><span className="font-semibold text-green-600">✓ {correctas} aciertos</span></p>
        <p><span className="font-semibold text-red-600">✗ {incorrectas} fallos</span></p>
      </div>

      <p className="text-gray-700 italic mt-4 text-lg">{mensaje}</p>
    </div>
  );
};

export default ResultSummary;
