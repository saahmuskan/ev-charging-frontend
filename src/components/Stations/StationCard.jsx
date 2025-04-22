import { stationsApi } from '../../api/stations';

const StationCard = ({ station, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...station });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const updatedStation = await stationsApi.updateStation(station.id, formData);
      onUpdate(updatedStation);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update station:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await stationsApi.deleteStation(station.id);
      onDelete(station.id);
    } catch (error) {
      console.error('Failed to delete station:', error);
    }
  };

  return (
    <div className="station-card">
      {isEditing ? (
        <div className="edit-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <>
          <h3>{station.name}</h3>
          <p>Location: {station.location}</p>
          <p>Capacity: {station.capacity}</p>
          <p>Available Slots: {station.availableSlots}</p>
          <div className="station-actions">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </div>
  );
};

export default StationCard;