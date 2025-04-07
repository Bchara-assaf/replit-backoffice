
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

  const deleteService = async (id: number) => {
    await serviceService.deleteService(id);
    setServices(services.filter(service => service.id !== id));
  };

  return (
    <div className="page">
      <h1>Services</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Type</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map(service => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{getCategory(service.categoryId)}</td>
              <td>{getType(service.typeId)}</td>
              <td>${service.price}</td>
              <td>
                <button>Edit</button>
                <button onClick={() => deleteService(service.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
