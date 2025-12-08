import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCheck, faBed, faUsers } from '@fortawesome/free-solid-svg-icons';
import '../../styles/pages/booking/BookingStepRoom.scss';

const BookingStepRoom = () => {
  const { bookingData, setBookingData, navigate } = useOutletContext();
  const [selectedRoomType, setSelectedRoomType] = useState(null);

  const roomTypes = [
    {
      id: 1,
      name: 'Superior Room',
      description: '1 Double Bed or 2 Twin Beds',
      size: '28 m²',
      guests: 2,
      amenities: ['WiFi', 'Air Conditioning', 'TV', 'Bathroom'],
      price: 240,
      image: '/images/room1.jpg',
      available: 5,
    },
    {
      id: 2,
      name: 'Superior Room - City View',
      description: '1 Double Bed or 2 Twin Beds',
      size: '30 m²',
      guests: 2,
      amenities: ['WiFi', 'Air Conditioning', 'TV', 'Bathroom', 'City View'],
      price: 280,
      image: '/images/room2.jpg',
      available: 3,
    },
    {
      id: 3,
      name: 'Deluxe Room - Sea View',
      description: '1 King Bed or Twin Beds',
      size: '38 m²',
      guests: 3,
      amenities: ['WiFi', 'AC', 'TV', 'Bathroom', 'Sea View', 'Balcony', 'Mini Bar'],
      price: 340,
      image: '/images/room3.jpg',
      available: 2,
    },
    {
      id: 4,
      name: 'Family Suite',
      description: '2 Bedrooms, Living Area',
      size: '55 m²',
      guests: 4,
      amenities: ['WiFi', 'AC', 'TV', 'Bathroom x2', 'Living Area', 'Kitchen', 'Balcony', 'Sea View'],
      price: 450,
      image: '/images/room4.jpg',
      available: 1,
    },
  ];

  const handleRoomSelect = (roomId) => {
    setSelectedRoomType(roomId);
  };

  const handleNext = () => {
    if (!selectedRoomType) {
      alert('Please select a room');
      return;
    }
    const selectedRoom = roomTypes.find((r) => r.id === selectedRoomType);
    setBookingData((prev) => ({
      ...prev,
      roomType: selectedRoom,
    }));
    navigate('extras');
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="booking-step-room">
      <h2>Select Your Room</h2>

      <div className="room-grid">
        {roomTypes.map((room) => (
          <div
            key={room.id}
            className={`room-card ${selectedRoomType === room.id ? 'selected' : ''}`}
            onClick={() => handleRoomSelect(room.id)}
          >
            {selectedRoomType === room.id && (
              <div className="selected-badge">
                <FontAwesomeIcon icon={faCheck} />
              </div>
            )}

            <div className="room-image">
              <img src={room.image} alt={room.name} />
              <span className="available-badge">{room.available} Left</span>
            </div>

            <div className="room-details">
              <h3>{room.name}</h3>
              <p className="description">{room.description}</p>

              <div className="room-specs">
                <span className="spec">
                  <strong>{room.size}</strong>
                </span>
                <span className="spec">
                  <FontAwesomeIcon icon={faUsers} /> {room.guests} Guest{room.guests > 1 ? 's' : ''}
                </span>
              </div>

              <div className="amenities-list">
                {room.amenities.map((amenity, index) => (
                  <span key={index} className="amenity-tag">
                    {amenity}
                  </span>
                ))}
              </div>

              <div className="room-footer">
                <div className="price">
                  <span className="label">Price per night</span>
                  <span className="value">${room.price}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 네비게이션 버튼 */}
      <div className="navigation-buttons">
        <button className="btn-back" onClick={handleBack}>
          <FontAwesomeIcon icon={faChevronLeft} />
          Back
        </button>
        <button
          className="btn-next"
          onClick={handleNext}
          disabled={!selectedRoomType}
        >
          Continue to Extras
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default BookingStepRoom;