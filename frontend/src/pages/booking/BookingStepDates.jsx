import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUsers, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'react-datepicker/dist/react-datepicker.css';
import '../../styles/pages/booking/BookingStepDates.scss';

const BookingStepDates = () => {
  const { bookingData, setBookingData, navigate } = useOutletContext();
  const [checkInDate, setCheckInDate] = useState(bookingData.checkInDate || new Date());
  const [checkOutDate, setCheckOutDate] = useState(
    bookingData.checkOutDate || new Date(new Date().getTime() + 86400000)
  );
  const [guestCount, setGuestCount] = useState(bookingData.guestCount || 1);
  const [roomCount, setRoomCount] = useState(1);

  const calculateNights = () => {
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays || 1;
  };

  const nights = calculateNights();
  const pricePerNight = 240; // 임시 가격
  const totalPrice = nights * pricePerNight;

  const handleNext = () => {
    setBookingData((prev) => ({
      ...prev,
      checkInDate,
      checkOutDate,
      guestCount,
      totalPrice,
    }));
    navigate('room');
  };

  const hotelInfo = {
    name: 'CVK Park Bosphorus Hotel Istanbul',
    image: '/images/hotel1.jpg',
    location: 'Istanbul, Turkey',
  };

  return (
    <div className="booking-step-dates">
      <div className="dates-grid">
        {/* 왼쪽: 호텔 정보 카드 */}
        <div className="hotel-card-section">
          <div className="hotel-card">
            <img src={hotelInfo.image} alt={hotelInfo.name} className="hotel-image" />
            <div className="hotel-info">
              <h3>{hotelInfo.name}</h3>
              <p>{hotelInfo.location}</p>
              <div className="price-info">
                <span className="price">${pricePerNight}</span>
                <span className="unit">/night</span>
              </div>
            </div>
          </div>
        </div>

        {/* 오른쪽: 날짜 선택 폼 */}
        <div className="date-form-section">
          <h2>Select Your Dates</h2>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faCalendarAlt} />
              Check-in Date
            </label>
            <DatePicker
              selected={checkInDate}
              onChange={setCheckInDate}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              className="date-input"
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faCalendarAlt} />
              Check-out Date
            </label>
            <DatePicker
              selected={checkOutDate}
              onChange={setCheckOutDate}
              dateFormat="yyyy-MM-dd"
              minDate={new Date(checkInDate.getTime() + 86400000)}
              className="date-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <FontAwesomeIcon icon={faUsers} />
                Guests
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="number-input"
              />
            </div>
            <div className="form-group">
              <label>Rooms</label>
              <input
                type="number"
                min="1"
                max="5"
                value={roomCount}
                onChange={(e) => setRoomCount(Number(e.target.value))}
                className="number-input"
              />
            </div>
          </div>

          {/* 예약 요약 */}
          <div className="booking-summary">
            <h3>Booking Summary</h3>
            <div className="summary-row">
              <span>Stay duration</span>
              <span className="value">{nights} night{nights !== 1 ? 's' : ''}</span>
            </div>
            <div className="summary-row">
              <span>Price per night</span>
              <span className="value">${pricePerNight}</span>
            </div>
            <div className="summary-row">
              <span>Number of guests</span>
              <span className="value">{guestCount}</span>
            </div>
            <div className="summary-row">
              <span>Number of rooms</span>
              <span className="value">{roomCount}</span>
            </div>
            <div className="summary-divider"></div>
            <div className="summary-row total">
              <span>Total Price</span>
              <span className="value">${totalPrice}</span>
            </div>
          </div>

          {/* 다음 버튼 */}
          <button className="btn-next" onClick={handleNext}>
            Continue to Room Selection
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingStepDates;