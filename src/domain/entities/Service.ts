
export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  typeId: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface ServiceType {
  id: number;
  name: string;
}
