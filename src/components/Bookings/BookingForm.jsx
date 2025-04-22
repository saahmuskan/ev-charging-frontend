import { useState } from 'react';
import { bookingsApi } from '../../api/bookings';

const BookingForm = ({ stations, vehicles, onSubmit }) => {
  const [formData, setFormData] = useState({
    stationId: '',
    vehicleId: '',
    startTime: '',
    endTime: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const booking = await bookingsApi.createBooking(formData);
      onSubmit(booking);
    } catch (error) {
      console.error('Booking failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div>
        <label>Station:</label>
        <select
          name="stationId"
          value={formData.stationId}
          onChange={handleChange}
          required
        >
          <option value="">Select a station</option>
          {stations.map(station => (
            <option key={station.id} value={station.id}>
              {station.name} - {station.location}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Vehicle:</label>
        <select
          name="vehicleId"
          value={formData.vehicleId}
          onChange={handleChange}
          required
        >
          <option value="">Select a vehicle</option>
          {vehicles.map(vehicle => (
            <option key={vehicle.id} value={vehicle.id}>
              {vehicle.model} - {vehicle.licensePlate}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Book Now</button>
    </form>
  );
};

export default BookingForm;