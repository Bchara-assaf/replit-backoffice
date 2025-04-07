
import { Service, Category, ServiceType } from '../entities/Service';

export interface ServiceRepository {
  getServices(): Promise<Service[]>;
  getCategories(): Promise<Category[]>;
  getTypes(): Promise<ServiceType[]>;
  deleteService(id: number): Promise<void>;
  updateService(service: Service): Promise<Service>;
}
