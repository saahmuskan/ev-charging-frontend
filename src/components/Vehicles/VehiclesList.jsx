import { useState, useEffect } from 'react';
import { vehiclesApi } from '../../api/vehicles';
import VehicleCard from './VehicleCard';
import VehicleForm from './VehicleForm';

const VehiclesList = ({ userId }) => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehiclesApi.getUserVehicles(userId);
        setVehicles(data);
      } catch (error) {
        console.error('Failed to fetch vehicles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [userId]);

  const handleAddVehicle = (newVehicle) => {
    setVehicles([...vehicles, newVehicle]);
    setShowForm(false);
  };

  const handleUpdateVehicle = (updatedVehicle) => {
    setVehicles(vehicles.map(vehicle => 
      vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
    ));
  };

  const handleDeleteVehicle = (vehicleId) => {
    setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
  };

  if (loading) return <div>Loading vehicles...</div>;

  return (
    <div className="vehicles-list">
      <div className="vehicles-header">
        <h2>Your Vehicles</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Vehicle'}
        </button>
      </div>

      {showForm && <VehicleForm userId={userId} onSubmit={handleAddVehicle} />}

      <div className="vehicles-grid">
        {vehicles.length === 0 ? (
          <p>No vehicles found</p>
        ) : (
          vehicles.map(vehicle => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onUpdate={handleUpdateVehicle}
              onDelete={handleDeleteVehicle}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default VehiclesList;