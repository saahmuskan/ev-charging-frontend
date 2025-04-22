import { useState, useEffect } from 'react';
import { paymentsApi } from '../../api/payments';
import PaymentCard from './PaymentCard';

const PaymentsList = ({ userId }) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const data = await paymentsApi.getUserPayments(userId);
        setPayments(data);
      } catch (error) {
        console.error('Failed to fetch payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [userId]);

  const handleRefund = (paymentId) => {
    setPayments(payments.map(payment => 
      payment.id === paymentId ? { ...payment, status: 'refunded' } : payment
    ));
  };

  if (loading) return <div>Loading payments...</div>;

  return (
    <div className="payments-list">
      <h2>Your Payments</h2>
      {payments.length === 0 ? (
        <p>No payments found</p>
      ) : (
        payments.map(payment => (
          <PaymentCard
            key={payment.id}
            payment={payment}
            onRefund={handleRefund}
          />
        ))
      )}
    </div>
  );
};

export default PaymentsList;