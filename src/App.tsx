
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ServicesPage } from './presentation/pages/ServicesPage';
import { CategoriesPage } from './presentation/pages/CategoriesPage';
import { TypesPage } from './presentation/pages/TypesPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <aside className="sidebar">
          <div className="sidebar-title">Admin Panel</div>
          <nav>
            <Link to="/" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 7h-4V4c0-1.103-.897-2-2-2h-4c-1.103 0-2 .897-2 2v3H4c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V9c0-1.103-.897-2-2-2zM4 19V9h16l.001 10H4z"/>
              </svg>
              Products
            </Link>
            <Link to="/" className="sidebar-link active">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.103 0-2 .897-2 2v18l4-4h14c1.103 0 2-.897 2-2V4c0-1.103-.897-2-2-2z"/>
              </svg>
              Services
            </Link>
            <Link to="/billing" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zm0 14H4V6h16v12z"/>
              </svg>
              Billing
            </Link>
            <Link to="/data" className="sidebar-link">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6c0-2.168-3.663-4-8-4S4 3.832 4 6v12c0 2.168 3.663 4 8 4s8-1.832 8-4V6z"/>
              </svg>
              Data
            </Link>
          </nav>
        </aside>

        <Routes>
          <Route path="/" element={<ServicesPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/types" element={<TypesPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
