
import { useState, useEffect } from 'react';
import { ServiceService } from '../../application/services/ServiceService';
import { MockServiceRepository } from '../../infrastructure/repositories/MockServiceRepository';

const serviceService = new ServiceService(new MockServiceRepository());

export function TypesPage() {
  const [types, setTypes] = useState<any[]>([]);

  useEffect(() => {
    loadTypes();
  }, []);

  const loadTypes = async () => {
    const data = await serviceService.getAllTypes();
    setTypes(data);
  };

  return (
    <div className="page">
      <h1>Service Types</h1>
      <ul>
        {types.map(type => (
          <li key={type.id}>{type.name}</li>
        ))}
      </ul>
    </div>
  );
}
