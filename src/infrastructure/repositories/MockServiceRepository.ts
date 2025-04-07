
import { ServiceRepository } from '../../domain/repositories/ServiceRepository';
import { Service, Category, ServiceType } from '../../domain/entities/Service';
import { mockServices, mockCategories, mockTypes } from '../../mockData';

export class MockServiceRepository implements ServiceRepository {
  private services: Service[] = [...mockServices];
  
  async getServices(): Promise<Service[]> {
    return this.services;
  }

  async getCategories(): Promise<Category[]> {
    return mockCategories;
  }

  async getTypes(): Promise<ServiceType[]> {
    return mockTypes;
  }

  async deleteService(id: number): Promise<void> {
    this.services = this.services.filter(service => service.id !== id);
  }

  async updateService(service: Service): Promise<Service> {
    const index = this.services.findIndex(s => s.id === service.id);
    if (index !== -1) {
      this.services[index] = service;
      return service;
    }
    throw new Error('Service not found');
  }
}
