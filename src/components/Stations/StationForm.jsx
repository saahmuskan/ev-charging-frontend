import { useState } from 'react';
import { stationsApi } from '../../api/stations';

const StationForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: 0,
    availableSlots: 0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const station = await stationsApi.createStation(formData);
      onSubmit(station);
      setFormData({
        name: '',
        location: '',
        capacity: 0,
        availableSlots: 0
      });
    } catch (error) {
      console.error('Failed to create station:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="station-form">
      <h3>Add New Station</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Capacity:</label>
        <input
          type="number"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
          required
          min="1"
        />
      </div>
      <div>
        <label>Available Slots:</label>
        <input
          type="number"
          name="availableSlots"
          value={formData.availableSlots}
          onChange={handleChange}
          required
          min="0"
          max={formData.capacity}
        />
      </div>
      <button type="submit">Add Station</button>
    </form>
  );
};

export default StationForm;