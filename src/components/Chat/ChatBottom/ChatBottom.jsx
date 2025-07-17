import React, { useState, useRef } from 'react';
import styles from './ChatBottom.module.css';
import send from '../../../assets/send.svg';
import add from '../../../assets/add.svg';

// 예시 아이콘 (네 프로젝트 경로에 맞게 수정 필요)
import photoIcon from '../../../assets/sendphoto.svg';
import promiseIcon from '../../../assets/promise.svg';
import payIcon from '../../../assets/requestpay.svg';
import addressIcon from '../../../assets/sendinfo.svg';
import doneIcon from '../../../assets/complete.svg';
import DeliveryModal from '../Modal/DeliveryModal';
import PromiseModal from '../Modal/Promise';
import PayRequestModal from '../Modal/PayRequest';
import DeliveryInfoModal from '../Modal/DeliveryInfo';
import GroupBuyModal from '../../GroupBuy/GroupBuyModal';
import CompleteModal from '../Modal/Complete';
import Complete2Modal from '../Modal/Complete2';

function ChatBottom({ onSendMessage, isSeller }) {
  const [message, setMessage] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showPromiseModal, setShowPromiseModal] = useState(false);
  const [showPayRequestModal, setShowPayRequestModal] = useState(false);
  const [showDeliveryInfoModal, setShowDeliveryInfoModal] = useState(false);
  const [showGroupBuyModal, setShowGroupBuyModal] = useState(false);
  const [lastOpenedModal, setLastOpenedModal] = useState(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showComplete2Modal, setShowComplete2Modal] = useState(false);


  const [promiseData, setPromiseData] = useState({
    date: '',
    time: '',
    location: '',
  });

const [payData, setPayData] = useState({
  accountHolder: '',
  phoneNumber: '',
  accountNumber: '',
  amount: '',
});

const [addressData, setAddressData] = useState({
  name: '',
  phone: '',
  address: '',
});

const [deliveryData, setDeliveryData] = useState({
  courier: '',
  tracking: '',
});


  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <>
    <div className={styles.chatBottom}>
      {showOptions && (
        // 아이콘 div
        <div className={styles.optionButtons}
          style={{ gap: isSeller ? '30px' : '50px' }}
        >
          {/* 공통: 사진전송 */}
          <button className={styles.optionBtn}>
            <img src={photoIcon} alt="사진 전송" />
            <span>사진 전송</span>
          </button>

          {/* 판매자 전용 옵션 */}
          {isSeller && (
            <>
              <button className={styles.optionBtn} onClick={() => setShowPromiseModal(true)}>
                <img src={promiseIcon} alt="약속 잡기" />
                <span>약속 잡기</span>
              </button>
              <button className={styles.optionBtn} onClick={() => setShowPayRequestModal(true)}>
                <img src={payIcon} alt="송금 요청" />
                <span>송금 요청</span>
              </button>
            </>
          )}

          {/* 배송지/배송정보 버튼 */}
          <button
            className={styles.optionBtn}
            onClick={() => {
              if (!isSeller) setShowAddressModal(true); // 구매자인 경우만 모달 띄움
              else {
                setShowDeliveryInfoModal(true);
              }
            }}
          >
            <img src={addressIcon} alt="배송" />
            <span>{isSeller ? '배송 정보 전송' : '배송지 전송'}</span>
          </button>


          {/* 공통: 거래완료 */}
          <button className={styles.optionBtn} onClick={() => setShowCompleteModal(true)}>
            <img src={doneIcon} alt="거래완료" />
            <span>거래 완료</span>
          </button>
        </div>
      )}

      <div className={styles.inputWrapper}>
        {/* + 아이콘 */}
        <button className={styles.plusButton} onClick={toggleOptions}>
          <img src={add} alt="plus" />
        </button>

        {/* 인풋창 */}
        <textarea
          className={styles.chatInput}
          placeholder="메시지를 입력하세요."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            e.target.style.height = 'auto'; // 높이 초기화
            e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 따라 높이 조절
          }}
          rows={1}
        />

        {/* 전송 버튼 */}
        <button className={styles.sendButton} onClick={handleSend}>
          <img src={send} alt="send" />
        </button>
      </div>
    </div>


    {showAddressModal && (
          <DeliveryModal
            onClose={() => setShowAddressModal(false)}
            onNext={() => {
              setShowAddressModal(false);
              setLastOpenedModal('address');
              setShowGroupBuyModal(true);
            }}
            data={addressData}
            setData={setAddressData}
          />
        )}

    {showPromiseModal && (
      <PromiseModal
        onClose={() => setShowPromiseModal(false)}
        onSubmit={() => {
          // 약속 정보 전송 처리 로직 여기에 작성
          setShowPromiseModal(false);
          setLastOpenedModal('promise');
          setShowGroupBuyModal(true);
        }}
        data={promiseData}
        setData={setPromiseData}
      />
    )}

    {showPayRequestModal && (
      <PayRequestModal
        onClose={() => setShowPayRequestModal(false)}
        onSubmit={(data) => {
          // 송금 요청 처리 로직 작성 (예: 메시지로 전송하거나 서버로 보냄)
          setShowPayRequestModal(false);
          setLastOpenedModal('pay');
          setShowGroupBuyModal(true);
        }}
        data={payData}
        setData={setPayData}
      />
    )}

    {showDeliveryInfoModal && (
      <DeliveryInfoModal
        onClose={() => setShowDeliveryInfoModal(false)}
        onNext={() => {
          setShowDeliveryInfoModal(false);
          setLastOpenedModal('delivery');
          setShowGroupBuyModal(true);
        }}
        data={deliveryData}
        setData={setDeliveryData}
      />
    )}

    {showGroupBuyModal && (
      <GroupBuyModal
        message="작성 내용을 전송하시겠어요?"
        confirmText="보내기"
        cancelText="취소"
        onConfirm={() => {
          setShowGroupBuyModal(false);
          // 실제 처리 로직 예: 메시지 전송 or 서버 요청 등
        }}
        onCancel={() => {
          setShowGroupBuyModal(false)
            if (lastOpenedModal === 'promise') setShowPromiseModal(true);
            else if (lastOpenedModal === 'pay') setShowPayRequestModal(true);
            else if (lastOpenedModal === 'address') setShowAddressModal(true);
            else if (lastOpenedModal === 'delivery') setShowDeliveryInfoModal(true);
        }}
      />
    )}

    {showCompleteModal && (
      <CompleteModal
        onCancel={() => setShowCompleteModal(false)}
        onConfirm={() => {
          setShowCompleteModal(false);
          setShowComplete2Modal(true);
          // 거래 완료 처리 로직 여기에 작성 (ex: 메시지 전송 등)
        }}
      />
    )}

    {showComplete2Modal && (
      <Complete2Modal
        onClose={() => setShowComplete2Modal(false)}
        onReview={() => {
          setShowComplete2Modal(false);
        }}
        onHome={() => {
          setShowComplete2Modal(false);
        }}
      />
    )}




    </>
  );
}

export default ChatBottom;
