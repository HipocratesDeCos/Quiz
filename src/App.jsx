// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SubjectList from './pages/SubjectList';
import QuizPage from './pages/QuizPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/materia/:id" element={<SubjectList />} />
        <Route path="/quiz/:materiaId/:temaId" element={<QuizPage />} />
      </Routes>
    </Router>
  );
}

export default App;
