
import { useState, useEffect } from 'react';
import { ServiceService } from '../../application/services/ServiceService';
import { MockServiceRepository } from '../../infrastructure/repositories/MockServiceRepository';

const serviceService = new ServiceService(new MockServiceRepository());

export function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [activeLanguage, setActiveLanguage] = useState('English');

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    const data = await serviceService.getAllServices();
    setServices(data);
  };

  return (
    <div className="main-content">
      <div className="page-header">
        <h1>Services</h1>
        <button className="add-button">Add Service</button>
      </div>

      <div className="language-tabs">
        <button 
          className={`language-tab ${activeLanguage === 'English' ? 'active' : ''}`}
          onClick={() => setActiveLanguage('English')}
        >
          English
        </button>
        <button 
          className={`language-tab ${activeLanguage === 'Français' ? 'active' : ''}`}
          onClick={() => setActiveLanguage('Français')}
        >
          Français
        </button>
        <button 
          className={`language-tab ${activeLanguage === 'العربية' ? 'active' : ''}`}
          onClick={() => setActiveLanguage('العربية')}
        >
          العربية
        </button>
      </div>

      <div className="content-card">
        <table className="services-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>TYPE</th>
              <th>PRICE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={service.image} alt={service.name} className="service-image" />
                    <div>
                      <div>{service.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--foreground-dimmer)' }}>{service.description}</div>
                    </div>
                  </div>
                </td>
                <td>{service.category}</td>
                <td>{service.type}</td>
                <td>${service.price}</td>
                <td><div className="status-badge"></div></td>
                <td>
                  <button className="action-button">Edit</button>
                  <button className="action-button">View Images</button>
                  <button className="action-button delete-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
