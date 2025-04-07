
import { Service } from '../../domain/entities/Service';
import { ServiceRepository } from '../../domain/repositories/ServiceRepository';

export class ServiceService {
  constructor(private repository: ServiceRepository) {}

  async getAllServices() {
    return this.repository.getServices();
  }

  async getAllCategories() {
    return this.repository.getCategories();
  }

  async getAllTypes() {
    return this.repository.getTypes();
  }

  async deleteService(id: number) {
    return this.repository.deleteService(id);
  }

  async updateService(service: Service) {
    return this.repository.updateService(service);
  }
}
