
import { useState } from 'react'
import { Service, Category, ServiceType } from './types'
import { mockServices, mockCategories, mockTypes } from './mockData'
import './App.css'

export default function App() {
  const [services, setServices] = useState<Service[]>(mockServices)
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const getCategory = (categoryId: number) => {
    return mockCategories.find(cat => cat.id === categoryId)?.name || 'Unknown'
  }

  const getType = (typeId: number) => {
    return mockTypes.find(type => type.id === typeId)?.name || 'Unknown'
  }

  const deleteService = (id: number) => {
    setServices(services.filter(service => service.id !== id))
  }

  return (
    <main className="container">
      <h1>Service Management</h1>
      
      <div className="services">
        <h2>Services</h2>
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
                  <button onClick={() => setSelectedService(service)}>Edit</button>
                  <button onClick={() => deleteService(service.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="categories">
        <h2>Categories</h2>
        <ul>
          {mockCategories.map(category => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>

      <div className="types">
        <h2>Service Types</h2>
        <ul>
          {mockTypes.map(type => (
            <li key={type.id}>{type.name}</li>
          ))}
        </ul>
      </div>
    </main>
  )
}
