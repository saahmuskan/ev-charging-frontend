import { useState } from 'react';
import { vehiclesApi } from '../../api/vehicles';

const VehicleForm = ({ userId, onSubmit }) => {
  const [formData, setFormData] = useState({
    userId,
    licensePlate: '',
    type: 'electric',
    model: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const vehicle = await vehiclesApi.createVehicle(formData);
      onSubmit(vehicle);
      setFormData({
        userId,
        licensePlate: '',
        type: 'electric',
        model: ''
      });
    } catch (error) {
      console.error('Failed to create vehicle:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="vehicle-form">
      <h3>Add New Vehicle</h3>
      <div>
        <label>License Plate:</label>
        <input
          type="text"
          name="licensePlate"
          value={formData.licensePlate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Type:</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option value="electric">Electric</option>
          <option value="hybrid">Hybrid</option>
          <option value="plug_in_hybrid">Plug-in Hybrid</option>
        </select>
      </div>
      <div>
        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Add Vehicle</button>
    </form>
  );
};

export default VehicleForm;