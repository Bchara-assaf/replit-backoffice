
import React from 'react';
import { Service } from '../../domain/entities/Service';

interface ServiceTableRowProps {
  service: Service;
  categoryName: string;
  typeName: string;
  onEdit: (service: Service) => void;
  onDelete: (service: Service) => void;
}

export function ServiceTableRow({ service, categoryName, typeName, onEdit, onDelete }: ServiceTableRowProps) {
  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <div className="bg-light rounded p-2 me-3">
            <i className="bi bi-box fs-5"></i>
          </div>
          <div>
            <h6 className="mb-0">{service.name}</h6>
            <small className="text-muted">{service.description}</small>
          </div>
        </div>
      </td>
      <td>{categoryName}</td>
      <td>{typeName}</td>
      <td>
        <span className="badge bg-success-subtle text-success">
          ${service.price}
        </span>
      </td>
      <td>
        <div className="btn-group">
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => onEdit(service)}
          >
            <i className="bi bi-pencil"></i>
          </button>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(service)}
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
}
