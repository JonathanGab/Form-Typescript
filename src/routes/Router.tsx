import { Routes, Route } from 'react-router-dom';
import HomePage from '../screens/HomePage';
import WildersPage from '../screens/WildersPage';
import FormPage from '../screens/FormPage';

export default function Router(): JSX.Element {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wilders" element={<WildersPage />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </div>
  );
}
