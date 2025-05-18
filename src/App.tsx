import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import SubscribePage from 'pages/ConfirmPage';
import UnsubscribePage from 'pages/UnsubscribePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/confirm/:token" element={<SubscribePage />} />
        <Route path="/unsubscribe/:token" element={<UnsubscribePage />} />
      </Routes>
    </Router>
  );
}

export default App;
