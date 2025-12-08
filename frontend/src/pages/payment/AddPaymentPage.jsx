import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/pages/payment/AddPaymentPage.scss';

const AddPaymentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-page container">
      <div className="inner">
        <h2 className="page-title">결제 수단 추가</h2>
        <div className="card-form-container">
          <div className="card-preview">
            <div className="card-chip"></div>
            <div className="card-number">0000 0000 0000 0000</div>
            <div className="card-info">
              <div className="card-name">YOUR NAME</div>
              <div className="card-expiry">MM/YY</div>
            </div>
          </div>

          <form className="payment-form">
            <div className="form-group">
              <label>카드 번호</label>
              <input type="text" placeholder="0000-0000-0000-0000" className="input--lg" />
            </div>
            
            <div className="input-row">
              <div className="form-group">
                <label>만료일</label>
                <input type="text" placeholder="MM/YY" className="input--lg" />
              </div>
              <div className="form-group">
                <label>CVC</label>
                <input type="password" placeholder="123" className="input--lg" maxLength="3" />
              </div>
            </div>

            <div className="form-group">
              <label>카드 소유자 이름</label>
              <input type="text" placeholder="카드에 적힌 이름" className="input--lg" />
            </div>

            <div className="form-group">
              <label className="control">
                <input type="checkbox" />
                <span>이 카드를 기본 결제 수단으로 저장</span>
              </label>
            </div>

            <div className="btn-group">
              <button type="button" className="btn btn--ghost btn--lg" onClick={() => navigate(-1)}>
                취소
              </button>
              <button type="submit" className="btn btn--primary btn--lg">
                등록 완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentPage;