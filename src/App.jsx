import { Routes, Route } from 'react-router-dom';
import MainView from './views/MainView';
import DetailView from './views/DetailView';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainView />} />
      <Route path="/:id" element={<DetailView />} />
    </Routes>
  );
}

export default App;
