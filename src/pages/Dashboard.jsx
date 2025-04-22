import { useEffect, useState } from 'react';
import { stationsApi, bookingsApi } from '../api';
import BookingsList from '../components/Bookings/BookingsList';
import StationsList from '../components/Stations/StationsList';

const Dashboard = () => {
  const [user] = useState(JSON.parse(localStorage.getItem('user')));
  const [stats, setStats] = useState({
    stations: 0,
    bookings: 0,
    availableSlots: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [stations, bookings] = await Promise.all([
          stationsApi.getAllStations(),
          bookingsApi.getUserBookings(user.id)
        ]);
        
        const availableSlots = stations.reduce(
          (sum, station) => sum + station.availableSlots, 0
        );
        
        setStats({
          stations: stations.length,
          bookings: bookings.length,
          availableSlots
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user.id]);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Available Stations</h3>
          <p>{stats.stations}</p>
        </div>
        <div className="stat-card">
          <h3>Available Slots</h3>
          <p>{stats.availableSlots}</p>
        </div>
        <div className="stat-card">
          <h3>Your Bookings</h3>
          <p>{stats.bookings}</p>
        </div>
      </div>

      <div className="dashboard-sections">
        <section>
          <h2>Nearby Stations</h2>
          <StationsList />
        </section>
        
        <section>
          <h2>Recent Bookings</h2>
          <BookingsList userId={user.id} />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;