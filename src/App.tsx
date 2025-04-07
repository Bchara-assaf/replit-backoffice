
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ServicesPage } from './presentation/pages/ServicesPage';
import { CategoriesPage } from './presentation/pages/CategoriesPage';
import { TypesPage } from './presentation/pages/TypesPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Services</Link>
          <Link to="/categories" className={location.pathname === '/categories' ? 'active' : ''}>Categories</Link>
          <Link to="/types" className={location.pathname === '/types' ? 'active' : ''}>Types</Link>
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
