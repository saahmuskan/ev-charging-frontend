import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { stationsApi } from '../api/stations';

const Home = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularStations = async () => {
      try {
        const data = await stationsApi.getAllStations();
        // Get top 3 stations with most available slots
        const popular = data
          .sort((a, b) => b.availableSlots - a.availableSlots)
          .slice(0, 3);
        setStations(popular);
      } catch (error) {
        console.error('Failed to fetch stations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularStations();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home">
      <section className="hero">
        <h1>EV Charging Made Easy</h1>
        <p>Find and book charging stations near you</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn-primary">Get Started</Link>
          <Link to="/stations" className="btn-secondary">Browse Stations</Link>
        </div>
      </section>

      <section className="featured-stations">
        <h2>Popular Charging Stations</h2>
        <div className="stations-grid">
          {stations.map(station => (
            <div key={station.id} className="station-card">
              <h3>{station.name}</h3>
              <p>{station.location}</p>
              <p>Available Slots: {station.availableSlots}</p>
              <Link to={`/stations/${station.id}`} className="btn-small">View</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;