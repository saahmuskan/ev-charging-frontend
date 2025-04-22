import { useState, useEffect } from 'react';
import { bookingsApi } from '../../api/bookings';
import BookingCard from './BookingCard';

const BookingsList = ({ userId }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingsApi.getUserBookings(userId);
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  const handleCancel = (bookingId) => {
    setBookings(bookings.filter(booking => booking.id !== bookingId));
  };

  const handleComplete = (bookingId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, status: 'completed' } : booking
    ));
  };

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="bookings-list">
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map(booking => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onCancel={handleCancel}
            onComplete={handleComplete}
          />
        ))
      )}
    </div>
  );
};

export default BookingsList;