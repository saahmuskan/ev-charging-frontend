import { useState } from 'react';
import { paymentsApi } from '../../api/payments';

const PaymentForm = ({ bookingId, amount, onSubmit }) => {
  const [formData, setFormData] = useState({
    bookingId,
    amount,
    paymentMethod: 'credit_card'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payment = await paymentsApi.processPayment(formData);
      onSubmit(payment);
    } catch (error) {
      console.error('Payment failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <h3>Payment Details</h3>
      <p>Amount: ${amount}</p>
      
      <div>
        <label>Payment Method:</label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="credit_card">Credit Card</option>
          <option value="debit_card">Debit Card</option>
          <option value="paypal">PayPal</option>
          <option value="crypto">Cryptocurrency</option>
        </select>
      </div>
      
      <div>
        <label>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          placeholder="1234 5678 9012 3456"
          required
        />
      </div>
      
      <div className="card-details">
        <div>
          <label>Expiry Date:</label>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            required
          />
        </div>
        <div>
          <label>CVV:</label>
          <input
            type="text"
            name="cvv"
            placeholder="123"
            required
          />
        </div>
      </div>
      
      <button type="submit">Pay Now</button>
    </form>
  );
};

export default PaymentForm;