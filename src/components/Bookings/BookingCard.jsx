import { bookingsApi } from '../../api/bookings';

const BookingCard = ({ booking, onCancel, onComplete }) => {
  const handleCancel = async () => {
    try {
      await bookingsApi.cancelBooking(booking.id);
      onCancel(booking.id);
    } catch (error) {
      console.error('Failed to cancel booking:', error);
    }
  };

  const handleComplete = async () => {
    try {
      await bookingsApi.completeBooking(booking.id);
      onComplete(booking.id);
    } catch (error) {
      console.error('Failed to complete booking:', error);
    }
  };

  return (
    <div className="booking-card">
      <h3>Booking #{booking.id}</h3>
      <p>Status: {booking.status}</p>
      <p>Station: {booking.stationId}</p>
      <p>Vehicle: {booking.vehicleId}</p>
      <p>Start Time: {new Date(booking.startTime).toLocaleString()}</p>
      <p>End Time: {new Date(booking.endTime).toLocaleString()}</p>
      
      {booking.status === 'active' && (
        <div className="booking-actions">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleComplete}>Complete</button>
        </div>
      )}
    </div>
  );
};

export default BookingCard;