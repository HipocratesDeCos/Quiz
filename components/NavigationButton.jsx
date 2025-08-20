// src/components/NavigationButtons.jsx
import ButtonGradient from './ButtonGradient';

const NavigationButtons = ({ onBackToTopics, onBackToHome }) => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
      <ButtonGradient
        onClick={onBackToTopics}
        className="flex-1 py-3 text-lg"
      >
        Volver a temas
      </ButtonGradient>
      <ButtonGradient
        onClick={onBackToHome}
        className="flex-1 py-3 text-lg bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
      >
        Menú principal
      </ButtonGradient>
    </div>
  );
};

export default NavigationButtons;
