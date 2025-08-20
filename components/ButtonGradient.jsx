// src/components/ButtonGradient.jsx
const ButtonGradient = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonGradient;
