import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faPlus, faTrash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import "../../styles/pages/mypage/MyPaymentPage.scss";

const MyPaymentPage = () => {
  const navigate = useNavigate();
  const [cards, setCards] = useState([
    {
      id: 1,
      name: "신한카드",
      number: "**** **** **** 1234",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: 2,
      name: "현대카드",
      number: "**** **** **** 5678",
      expiry: "08/27",
      isDefault: false,
    },
  ]);

  const handleDeleteCard = (id) => {
    if (window.confirm("카드를 삭제하시겠습니까?")) {
      setCards(cards.filter((card) => card.id !== id));
    }
  };

  const handleSetDefault = (id) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  };

  return (
    <div className="my-payment-page">
      <div className="payment-header">
        <div>
          <h1>결제 수단 관리</h1>
          <p>저장된 카드를 관리하고 새로운 카드를 추가하세요</p>
        </div>
        <button className="btn-add-card" onClick={() => navigate("/payment/add")}>
          <FontAwesomeIcon icon={faPlus} />
          새 카드 추가
        </button>
      </div>

      <div className="cards-list">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div key={card.id} className="card-item">
              <div className="card-left">
                <div className="card-icon">
                  <FontAwesomeIcon icon={faCreditCard} />
                </div>
                <div className="card-info">
                  <h3>{card.name}</h3>
                  <p className="card-number">{card.number}</p>
                  <p className="card-expiry">유효기간: {card.expiry}</p>
                </div>
              </div>

              <div className="card-right">
                <div className="card-actions">
                  {!card.isDefault && (
                    <button
                      className="btn-default"
                      onClick={() => handleSetDefault(card.id)}
                    >
                      기본으로 설정
                    </button>
                  )}
                  {card.isDefault && (
                    <span className="badge-default">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      기본 카드
                    </span>
                  )}
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteCard(card.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FontAwesomeIcon icon={faCreditCard} />
            <h3>저장된 카드가 없습니다</h3>
            <p>결제를 위해 카드를 추가하세요</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/payment/add")}
            >
              카드 추가
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPaymentPage;