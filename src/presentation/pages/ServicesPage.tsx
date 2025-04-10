import { useState, useEffect } from 'react';
import { Service } from '../../domain/entities/Service';
import { ServiceService } from '../../application/services/ServiceService';
import { MockServiceRepository } from '../../infrastructure/repositories/MockServiceRepository';
import { Modal, Button, Form } from 'react-bootstrap';

const serviceService = new ServiceService(new MockServiceRepository());

//New Component for Page Header
const PageHeader = ({title, breadcrumbItem, onAddClick, addButtonText}: {title: string, breadcrumbItem: string, onAddClick: () => void, addButtonText: string}) => (
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
    <button className="btn btn-primary" onClick={onAddClick}>
      <i className="bi bi-plus-lg me-2"></i>{addButtonText}
    </button>
  </div>
);


export function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    priceMin: '',
    priceMax: '',
    search: ''
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [formData, setFormData] = useState<Partial<Service>>({});

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let result = [...services];

    if (filters.category) {
      result = result.filter(service => service.categoryId === Number(filters.category));
    }

    if (filters.type) {
      result = result.filter(service => service.typeId === Number(filters.type));
    }

    if (filters.priceMin) {
      result = result.filter(service => service.price >= Number(filters.priceMin));
    }

    if (filters.priceMax) {
      result = result.filter(service => service.price <= Number(filters.priceMax));
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(service => 
        service.name.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower)
      );
    }

    setFilteredServices(result);
  }, [services, filters]);

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

  const handleShowModal = (service?: Service) => {
    if (service) {
      setFormData(service);
      setSelectedService(service);
    } else {
      setFormData({});
      setSelectedService(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
    setSelectedService(null);
  };

  const handleSubmit = async () => {
    if (selectedService) {
      await serviceService.updateService({ ...selectedService, ...formData });
    } else {
      // In a real app, you would handle creating a new service here
      const newService = {
        ...formData,
        id: services.length + 1,
      } as Service;
      services.push(newService);
    }
    await loadData();
    handleCloseModal();
  };

  const handleDelete = async (service: Service) => {
    setSelectedService(service);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (selectedService) {
      await serviceService.deleteService(selectedService.id);
      await loadData();
      setShowDeleteModal(false);
      setSelectedService(null);
    }
  };

  const getCategory = (categoryId: number) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Unknown';
  };

  const getType = (typeId: number) => {
    return types.find(type => type.id === typeId)?.name || 'Unknown';
  };

  return (
    <div className="flex-grow-1 bg-light">
      <div className="container-fluid py-4">
        <PageHeader 
          title="Services"
          breadcrumbItem="Services"
          onAddClick={() => handleShowModal()}
          addButtonText="Add Service"
        />

        <div className="card shadow-sm mb-4 p-3">
          <div className="row g-3 filter-row">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Search services..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <select
                className="form-select"
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min Price"
                value={filters.priceMin}
                onChange={(e) => setFilters(prev => ({ ...prev, priceMin: e.target.value }))}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Max Price"
                value={filters.priceMax}
                onChange={(e) => setFilters(prev => ({ ...prev, priceMax: e.target.value }))}
              />
            </div>
            <div className="col-md-1">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => setFilters({
                  category: '',
                  type: '',
                  priceMin: '',
                  priceMax: '',
                  search: ''
                })}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="table-wrapper">
            <table className="table table-hover align-middle mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0">SERVICE</th>
                  <th className="border-0">CATEGORY</th>
                  <th className="border-0">TYPE</th>
                  <th className="border-0">PRICE</th>
                  <th className="border-0">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map(service => (
                  <tr key={service.id}>
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
                    <td>{getCategory(service.categoryId)}</td>
                    <td>{getType(service.typeId)}</td>
                    <td>
                      <span className="badge bg-success-subtle text-success">
                        ${service.price}
                      </span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button 
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => handleShowModal(service)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(service)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit/Add Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedService ? 'Edit Service' : 'Add Service'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={formData.categoryId || ''}
                onChange={(e) => setFormData({ ...formData, categoryId: Number(e.target.value) })}
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Select
                value={formData.typeId || ''}
                onChange={(e) => setFormData({ ...formData, typeId: Number(e.target.value) })}
              >
                <option value="">Select Type</option>
                {types.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {selectedService ? 'Update' : 'Create'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the service "{selectedService?.name}"? This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}