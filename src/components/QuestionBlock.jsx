// src/components/QuestionBlock.jsx
import { useState } from 'react';
import ModalInfo from './ModalInfo';

const QuestionBlock = ({ question, onValidate, hasAnswered, result }) => {
  const [selected, setSelected] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const toggleOption = (index) => {
    if (hasAnswered) return;
    setSelected((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const handleValidate = () => {
    onValidate(selected);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6 border border-gray-100 transition-all duration-200">
      {/* Pregunta */}
      <p
        className="text-gray-800 text-lg mb-4 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: question.texto }}
      />

      {/* Opciones */}
      <div className="space-y-3 mb-6">
        {question.opciones.map((opcion, i) => {
          const isCorrect = result?.correctAnswers?.[i];
          const isSelected = selected.includes(i);
          const showResult = hasAnswered && result;

          return (
            <label
              key={i}
              className={`flex items-start p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                showResult
                  ? isCorrect
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : isSelected && !isCorrect
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : 'border-gray-200 text-gray-600'
                  : isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
              }`}
            >
              <input
                type="checkbox"
                checked={selected.includes(i)}
                onChange={() => toggleOption(i)}
                disabled={hasAnswered}
                className="mt-1 mr-3"
                aria-label={`Opción ${i + 1}`}
              />
              <span
                className="flex-1"
                dangerouslySetInnerHTML={{ __html: opcion }}
              />
            </label>
          );
        })}
      </div>

      {/* Botones: Saber más + Validar */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowModal(true)}
          className="text-purple-600 hover:underline font-medium hover:text-purple-800 transition-colors"
        >
          Saber más
        </button>

        <button
          onClick={handleValidate}
          disabled={hasAnswered}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 px-5 rounded-lg shadow-sm hover:from-blue-700 hover:to-purple-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
        >
          Validar
        </button>
      </div>

      {/* Modal "Saber más" */}
      <ModalInfo isOpen={showModal} onClose={() => setShowModal(false)}>
        <div dangerouslySetInnerHTML={{ __html: question.explicacion }} />
      </ModalInfo>
    </div>
  );
};

export default QuestionBlock;
