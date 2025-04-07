
import { useState, useEffect } from 'react';
import { Service } from '../../domain/entities/Service';
import { ServiceService } from '../../application/services/ServiceService';
import { MockServiceRepository } from '../../infrastructure/repositories/MockServiceRepository';

const serviceService = new ServiceService(new MockServiceRepository());

export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [servicesData, categoriesData, typesData] = await Promise.all([
      serviceService.getAllServices(),
      serviceService.getAllCategories(),
      serviceService.getAllTypes(),
    ]);
    setServices(servicesData);
    setCategories(categoriesData);
    setTypes(typesData);
  };

  const getCategory = (categoryId: number) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Unknown';
  };

  const getType = (typeId: number) => {
    return types.find(type => type.id === typeId)?.name || 'Unknown';
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Services</h1>
        <button className="btn btn-primary">Add Service</button>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>TYPE</th>
                <th>PRICE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id}>
                  <td>
                    <div>
                      <strong>{service.name}</strong>
                      <div className="text-muted small">{service.description}</div>
                    </div>
                  </td>
                  <td>{getCategory(service.categoryId)}</td>
                  <td>{getType(service.typeId)}</td>
                  <td>${service.price}</td>
                  <td>
                    <button className="btn btn-sm btn-outline-primary me-2">Edit</button>
                    <button className="btn btn-sm btn-outline-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
