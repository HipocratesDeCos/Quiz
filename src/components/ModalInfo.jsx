// src/components/ModalInfo.jsx
import { createPortal } from 'react-dom';

const ModalInfo = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4 border-b pb-3">
          <h3 className="text-2xl font-bold text-gray-800">Saber más</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-3xl leading-none focus:outline-none"
            aria-label="Cerrar"
          >
            &times;
          </button>
        </div>
        <div className="text-gray-700 leading-relaxed">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalInfo;
