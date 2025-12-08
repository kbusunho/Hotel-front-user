import React, { useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faCreditCard,
  faLock,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { reservationApi } from '../../api/reservationApi';
import '../../styles/pages/booking/BookingStepPayment.scss';

const BookingStepPayment = () => {
  const { hotelId } = useParams();
  const { bookingData, setBookingData, navigate } = useOutletContext();
  const [paymentMethod, setPaymentMethod] = useState('card');
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
      alert('필수 약관에 동의해주세요');
      return;
    }

    if (!bookingData.roomType) {
      alert('객실을 선택해주세요');
      return;
    }

    setLoading(true);
    try {
      const reservationPayload = {
        hotelId: hotelId,
        roomId: bookingData.roomType._id || bookingData.roomType.id,
        checkIn: bookingData.checkIn || bookingData.checkInDate?.toISOString().split('T')[0],
        checkOut: bookingData.checkOut || bookingData.checkOutDate?.toISOString().split('T')[0],
        guests: bookingData.guests || bookingData.guestCount || 1,
        paymentMethod: paymentMethod,
      };

      if (bookingData.extras && bookingData.extras.length > 0) {
        reservationPayload.extras = bookingData.extras;
      }

      const result = await reservationApi.createReservation(reservationPayload);
      
      setBookingData((prev) => ({
        ...prev,
        reservationId: result._id || result.id,
        paymentMethod,
        totalPrice: result.totalPrice || prev.totalPrice,
        hotel: result.hotel, // hotel 정보 추가
        checkIn: result.checkIn, // 서버에서 받은 정보 동기화
        checkOut: result.checkOut,
        guests: result.guests,
        nights: result.nights,
        email: formData.email,
        phone: formData.phone,
        payerName: formData.fullName,
      }));
      
      navigate('complete');
    } catch (error) {
      console.error('예약 실패:', error);
      alert(error.message || '예약에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const nights =
    bookingData.nights ||
    (bookingData.checkInDate && bookingData.checkOutDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(bookingData.checkOutDate) - new Date(bookingData.checkInDate)) /
              (1000 * 60 * 60 * 24)
          )
        )
      : 1);

  const pricePerNight =
    bookingData.pricePerNight || bookingData.roomType?.price || bookingData.hotel?.price || 0;
  const extrasTotal = bookingData.extrasTotal || 0;
  const roomTotal =
    pricePerNight > 0
      ? pricePerNight * nights
      : Math.max(0, (bookingData.totalPrice || 0) - extrasTotal);
  const calculatedTotal = roomTotal + extrasTotal;
  const totalPrice = bookingData.totalPrice || calculatedTotal;
  const extrasCount = bookingData.extras?.length || bookingData.extrasDetail?.length || 0;

  return (
    <div className="booking-step-payment">
      <div className="payment-grid">
        {/* 왼쪽: 주문 요약 */}
        <div className="order-summary-section">
          <div className="order-summary">
            <h3>요금 내역</h3>

            <div className="summary-items">
              <div className="summary-item">
                <span>객실 ({nights}박)</span>
                <span className="price">₩{roomTotal.toLocaleString()}</span>
              </div>
              {extrasTotal > 0 && (
                <div className="summary-item">
                  <span>추가 옵션 {extrasCount > 0 ? `(${extrasCount}개)` : ''}</span>
                  <span className="price">+₩{extrasTotal.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>결제 예정 금액</span>
              <span className="price">₩{totalPrice.toLocaleString()}</span>
            </div>

            <div className="security-badge">
              <FontAwesomeIcon icon={faLock} />
              <span>안전한 결제 환경</span>
            </div>
          </div>
        </div>

        {/* 오른쪽: 결제 폼 */}
        <div className="payment-form-section">
          <h2>결제 및 고객 정보</h2>

          <form onSubmit={handlePayment}>
            {/* 결제 방법 선택 */}
            <div className="payment-methods">
              <label className={`method-option ${paymentMethod === 'card' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FontAwesomeIcon icon={faCreditCard} />
                <span>신용/체크카드</span>
              </label>

              <label className={`method-option ${paymentMethod === 'naverpay' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="naverpay"
                  checked={paymentMethod === 'naverpay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <FontAwesomeIcon icon={faCreditCard} />
                <span>네이버페이</span>
              </label>

              <label className={`method-option ${paymentMethod === 'kakaopay' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="kakaopay"
                  checked={paymentMethod === 'kakaopay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <span style={{ fontSize: '1.4rem' }}>카카오페이</span>
              </label>
            </div>

            {/* 카드 정보 입력 */}
            {(paymentMethod === 'card') && (
              <div className="card-form">
                <div className="form-group">
                  <label>결제자 이름</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="홍길동"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>카드 번호</label>
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
                    placeholder="0000 0000 0000 0000"
                    maxLength="19"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>유효기간 (MM/YY)</label>
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
                    <label>CVC</label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      placeholder="***"
                      maxLength="3"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 간편 결제 안내 */}
            {(paymentMethod === 'naverpay' || paymentMethod === 'kakaopay') && (
              <div className="paypal-form">
                <p>선택한 간편결제 화면으로 이동하여 안전하게 결제하실 수 있습니다.</p>
              </div>
            )}

            {/* 연락처 정보 */}
            <div className="contact-form">
              <h4>예약자 연락처</h4>

              <div className="form-group">
                <label>이메일</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>휴대전화 번호</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="010-1234-5678"
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
                <a href="#terms">이용약관</a> 및 <a href="#privacy">개인정보 처리방침</a>에 동의합니다.
              </span>
            </label>

            {/* 네비게이션 버튼 */}
            <div className="navigation-buttons">
              <button type="button" className="btn-back" onClick={handleBack}>
                <FontAwesomeIcon icon={faChevronLeft} />
                이전 단계
              </button>
              <button
                type="submit"
                className="btn-pay"
                disabled={loading || !formData.agreeTerms}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    처리 중...
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faLock} />
                    결제하기 ₩{totalPrice?.toLocaleString()}
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