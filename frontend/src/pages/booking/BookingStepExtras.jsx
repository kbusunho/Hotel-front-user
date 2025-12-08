import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faCheck,
  faParking,
  faWifi,
  faConciergeBell,
  faSpa,
} from '@fortawesome/free-solid-svg-icons';
import '../../styles/pages/booking/BookingStepExtras.scss';

const BookingStepExtras = () => {
  const { bookingData, setBookingData, navigate } = useOutletContext();
  const [selectedExtras, setSelectedExtras] = useState(bookingData.extras || []);

  const extras = [
    {
      id: 1,
      name: 'Airport Pickup',
      description: 'Convenient airport transfer service',
      icon: faConciergeBell,
      price: 45,
      selected: false,
    },
    {
      id: 2,
      name: 'Parking',
      description: 'Secure parking spot included',
      icon: faParking,
      price: 20,
      selected: false,
    },
    {
      id: 3,
      name: 'Breakfast',
      description: 'Buffet breakfast every morning',
      icon: faWifi,
      price: 30,
      selected: false,
    },
    {
      id: 4,
      name: 'Spa Package',
      description: 'Full spa treatment and massage',
      icon: faSpa,
      price: 80,
      selected: false,
    },
    {
      id: 5,
      name: 'Late Checkout',
      description: 'Check out until 4:00 PM',
      icon: faConciergeBell,
      price: 25,
      selected: false,
    },
    {
      id: 6,
      name: 'Room Upgrade',
      description: 'Complimentary room upgrade',
      icon: faWifi,
      price: 60,
      selected: false,
    },
  ];

  const toggleExtra = (extraId) => {
    setSelectedExtras((prev) => {
      if (prev.includes(extraId)) {
        return prev.filter((id) => id !== extraId);
      } else {
        return [...prev, extraId];
      }
    });
  };

  const totalExtrasPrice = extras
    .filter((extra) => selectedExtras.includes(extra.id))
    .reduce((sum, extra) => sum + extra.price, 0);

  const handleNext = () => {
    setBookingData((prev) => ({
      ...prev,
      extras: selectedExtras,
      totalPrice: prev.totalPrice + totalExtrasPrice,
    }));
    navigate('payment');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const skipExtras = () => {
    setBookingData((prev) => ({
      ...prev,
      extras: [],
    }));
    navigate('payment');
  };

  return (
    <div className="booking-step-extras">
      <h2>Add Extra Services</h2>
      <p className="subtitle">Make your stay more comfortable with these optional services</p>

      <div className="extras-grid">
        {extras.map((extra) => (
          <div
            key={extra.id}
            className={`extra-card ${selectedExtras.includes(extra.id) ? 'selected' : ''}`}
            onClick={() => toggleExtra(extra.id)}
          >
            <div className="extra-header">
              <div className="icon-box">
                <FontAwesomeIcon icon={extra.icon} />
              </div>
              <div className="extra-title">
                <h3>{extra.name}</h3>
                <p>{extra.description}</p>
              </div>
            </div>

            <div className="extra-footer">
              <span className="price">+${extra.price}</span>
              <div className={`checkbox ${selectedExtras.includes(extra.id) ? 'checked' : ''}`}>
                {selectedExtras.includes(extra.id) && <FontAwesomeIcon icon={faCheck} />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 비용 요약 */}
      {selectedExtras.length > 0 && (
        <div className="extras-summary">
          <h3>Selected Extras</h3>
          <div className="summary-list">
            {extras
              .filter((extra) => selectedExtras.includes(extra.id))
              .map((extra) => (
                <div key={extra.id} className="summary-item">
                  <span>{extra.name}</span>
                  <span className="price">+${extra.price}</span>
                </div>
              ))}
          </div>
          <div className="summary-divider"></div>
          <div className="summary-total">
            <span>Total Extras Cost</span>
            <span className="price">${totalExtrasPrice}</span>
          </div>
        </div>
      )}

      {/* 네비게이션 버튼 */}
      <div className="navigation-buttons">
        <button className="btn-back" onClick={handleBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
          Back
        </button>
        {selectedExtras.length > 0 && (
          <button className="btn-skip" onClick={skipExtras}>
            Skip Extras
          </button>
        )}
        <button className="btn-next" onClick={handleNext}>
          Continue to Payment
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default BookingStepExtras;