
import { Service, Category, ServiceType } from './types';

export const mockTypes: ServiceType[] = [
  { id: 1, name: 'Basic' },
  { id: 2, name: 'Premium' },
  { id: 3, name: 'Enterprise' },
];

export const mockCategories: Category[] = [
  { id: 1, name: 'Consulting' },
  { id: 2, name: 'Development' },
  { id: 3, name: 'Design' },
];

export const mockServices: Service[] = [
  { id: 1, name: 'Web Development', description: 'Full stack web development', price: 1000, categoryId: 2, typeId: 1 },
  { id: 2, name: 'UI Design', description: 'User interface design', price: 800, categoryId: 3, typeId: 2 },
  { id: 3, name: 'Business Strategy', description: 'Business consulting', price: 1500, categoryId: 1, typeId: 3 },
];
