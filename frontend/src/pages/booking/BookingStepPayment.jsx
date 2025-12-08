import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faCreditCard,
  faLock,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/pages/booking/BookingStepPayment.scss';

const BookingStepPayment = () => {
  const { bookingData, setBookingData, navigate } = useOutletContext();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [formData, setFormData] = useState({
    fullName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    email: '',
    phone: '',
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const formatCardNumber = (value) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value) => {
    return value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      alert('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);
    // 결제 시뮬레이션
    setTimeout(() => {
      setBookingData((prev) => ({
        ...prev,
        paymentMethod,
        totalPrice: prev.totalPrice,
      }));
      navigate('complete');
      setLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const basePrice = 240; // 기본 호텔 가격
  const totalPrice = bookingData.totalPrice || basePrice;

  return (
    <div className="booking-step-payment">
      <div className="payment-grid">
        {/* 왼쪽: 주문 요약 */}
        <div className="order-summary-section">
          <div className="order-summary">
            <h3>Order Summary</h3>

            <div className="summary-items">
              <div className="summary-item">
                <span>Hotel (5 nights)</span>
                <span className="price">${basePrice * 5}</span>
              </div>
              {bookingData.extras && bookingData.extras.length > 0 && (
                <div className="summary-item">
                  <span>Extras ({bookingData.extras.length})</span>
                  <span className="price">+${totalPrice - basePrice * 5}</span>
                </div>
              )}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total Amount</span>
              <span className="price">${totalPrice}</span>
            </div>

            <div className="security-badge">
              <FontAwesomeIcon icon={faLock} />
              <span>Secure payment</span>
            </div>
          </div>
        </div>

        {/* 오른쪽: 결제 폼 */}
        <div className="payment-form-section">
          <h2>Payment Details</h2>

          <form onSubmit={handlePayment}>
            {/* 결제 방법 선택 */}
            <div className="payment-methods">
              <label className={`method-option ${paymentMethod === 'credit-card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit-card"
                  checked={paymentMethod === 'credit-card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FontAwesomeIcon icon={faCreditCard} />
                <span>Credit Card</span>
              </label>

              <label className={`method-option ${paymentMethod === 'debit-card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="debit-card"
                  checked={paymentMethod === 'debit-card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FontAwesomeIcon icon={faCreditCard} />
                <span>Debit Card</span>
              </label>

              <label className={`method-option ${paymentMethod === 'paypal' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span style={{ fontSize: '1.4rem' }}>PayPal</span>
              </label>
            </div>

            {/* 카드 정보 입력 */}
            {(paymentMethod === 'credit-card' || paymentMethod === 'debit-card') && (
              <div className="card-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formatCardNumber(formData.cardNumber)}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        cardNumber: e.target.value.replace(/\s/g, ''),
                      }))
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formatExpiryDate(formData.expiryDate)}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          expiryDate: e.target.value,
                        }))
                      }
                      placeholder="MM/YY"
                      maxLength="5"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="123"
                      maxLength="3"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PayPal 정보 */}
            {paymentMethod === 'paypal' && (
              <div className="paypal-form">
                <p>You will be redirected to PayPal to complete your payment securely.</p>
              </div>
            )}

            {/* 연락처 정보 */}
            <div className="contact-form">
              <h4>Contact Information</h4>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>

            {/* 약관 동의 */}
            <label className="terms-checkbox">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleInputChange}
              />
              <span>
                I agree to the <a href="#terms">terms and conditions</a> and{' '}
                <a href="#privacy">privacy policy</a>
              </span>
            </label>

            {/* 네비게이션 버튼 */}
            <div className="navigation-buttons">
              <button type="button" className="btn-back" onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
                Back
              </button>
              <button
                type="submit"
                className="btn-pay"
                disabled={loading || !formData.agreeTerms}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faLock} />
                    Pay ${totalPrice}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingStepPayment;