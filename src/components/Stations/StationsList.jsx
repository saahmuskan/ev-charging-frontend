import { useState, useEffect } from 'react';
import { stationsApi } from '../../api/stations';
import StationCard from './StationCard';
import StationForm from './StationForm';

const StationsList = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const data = await stationsApi.getAllStations();
        setStations(data);
      } catch (error) {
        console.error('Failed to fetch stations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handleAddStation = (newStation) => {
    setStations([...stations, newStation]);
    setShowForm(false);
  };

  const handleUpdateStation = (updatedStation) => {
    setStations(stations.map(station => 
      station.id === updatedStation.id ? updatedStation : station
    ));
  };

  const handleDeleteStation = (stationId) => {
    setStations(stations.filter(station => station.id !== stationId));
  };

  if (loading) return <div>Loading stations...</div>;

  return (
    <div className="stations-list">
      <div className="stations-header">
        <h2>Charging Stations</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Station'}
        </button>
      </div>

      {showForm && <StationForm onSubmit={handleAddStation} />}

      <div className="stations-grid">
        {stations.length === 0 ? (
          <p>No stations found</p>
        ) : (
          stations.map(station => (
            <StationCard
              key={station.id}
              station={station}
              onUpdate={handleUpdateStation}
              onDelete={handleDeleteStation}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default StationsList;