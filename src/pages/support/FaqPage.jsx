import React from 'react';
import '../../styles/pages/support/Support.scss';

const FaqPage = () => {
  return (
    <div className="support-page container">
      <div className="inner">
        <h2 className="page-heading">자주 묻는 질문 (FAQ)</h2>
        <div className="faq-list">
          <details className="faq-item">
            <summary>예약 취소는 어떻게 하나요?</summary>
            <div className="faq-answer">마이페이지 &gt; 예약 내역에서 취소 가능합니다.</div>
          </details>
          <details className="faq-item">
            <summary>체크인 시간은 언제인가요?</summary>
            <div className="faq-answer">호텔마다 다르며 상세 페이지에서 확인 가능합니다.</div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;