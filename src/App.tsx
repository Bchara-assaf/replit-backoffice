
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ServicesPage } from './presentation/pages/ServicesPage';
import { CategoriesPage } from './presentation/pages/CategoriesPage';
import { TypesPage } from './presentation/pages/TypesPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav>
          <Link to="/">Services</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/types">Types</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<ServicesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/types" element={<TypesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
