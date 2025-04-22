import { paymentsApi } from '../../api/payments';

const PaymentCard = ({ payment, onRefund }) => {
  const handleRefund = async () => {
    try {
      await paymentsApi.refundPayment(payment.id);
      onRefund(payment.id);
    } catch (error) {
      console.error('Failed to process refund:', error);
    }
  };

  return (
    <div className="payment-card">
      <h3>Payment #{payment.id}</h3>
      <p>Amount: ${payment.amount}</p>
      <p>Status: {payment.status}</p>
      <p>Method: {payment.paymentMethod}</p>
      <p>Date: {new Date(payment.createdAt).toLocaleString()}</p>
      
      {payment.status === 'completed' && (
        <button onClick={handleRefund}>Request Refund</button>
      )}
    </div>
  );
};

export default PaymentCard;