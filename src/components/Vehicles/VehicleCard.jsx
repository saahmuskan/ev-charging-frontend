import { vehiclesApi } from '../../api/vehicles';

const VehicleCard = ({ vehicle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...vehicle });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const updatedVehicle = await vehiclesApi.updateVehicle(vehicle.id, formData);
      onUpdate(updatedVehicle);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update vehicle:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await vehiclesApi.deleteVehicle(vehicle.id);
      onDelete(vehicle.id);
    } catch (error) {
      console.error('Failed to delete vehicle:', error);
    }
  };

  return (
    <div className="vehicle-card">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
          />
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{vehicle.model}</h3>
          <p>Type: {vehicle.type}</p>
          <p>License Plate: {vehicle.licensePlate}</p>
          <div className="vehicle-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default VehicleCard;