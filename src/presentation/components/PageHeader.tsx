
import React from 'react';

interface PageHeaderProps {
  title: string;
  breadcrumbItem: string;
  onAddClick?: () => void;
  addButtonText?: string;
}

export function PageHeader({ title, breadcrumbItem, onAddClick, addButtonText }: PageHeaderProps) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 page-header">
      <div>
        <h4 className="mb-0">{title}</h4>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
            <li className="breadcrumb-item active">{breadcrumbItem}</li>
          </ol>
        </nav>
      </div>
      {onAddClick && (
        <button className="btn btn-primary" onClick={onAddClick}>
          <i className="bi bi-plus-lg me-2"></i>{addButtonText || 'Add'}
        </button>
      )}
    </div>
  );
}
