import React, { useState } from 'react';
import boxImage from '../../assets/chat_logo.png';
import styles from './Chats.module.css';
import Dropdown from '../../components/DropDown/DropDown';
import ChatListItem from '../../components/Chat/ChatListItem/ChatListItem';
import ChatHeader from '../../components/Chat/ChatHeader/ChatHeader';
import ChatBottom from '../../components/Chat/ChatBottom/ChatBottom';
import ChatMessage from '../../components/Chat/ChatMessage/ChatMessage';

import profileImg from '../../assets/profile.png';
import postImage from '../../assets/product.png'; //상품 이미지

function Chat() {
  const [dateSort, setDateSort] = useState('전체');

  const [chatRooms, setChatRooms] = useState([
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개a입 참여...할게요요요요 12432455253aaaaa',
    price: '100,000000000000',
    ddayText: '공구마감',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    isSeller: true,
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜요! 내일 오후 6시 괜요'+'! 내일 오후 6시 괜요! 내일 오후 6시 괜요! 내일 오후 6시 괜요! 내일 오후 6시 괜요! 내일 오후 6시 괜요! 내일 오후 6시 괜요! 내일 오후 6시 괜요! 내일 오후 6시 괜요! 내일 오후 6시 괜요! 내일 오후 6시 괜찮으세요?',
        time: '2025-06-13T11:32:00',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '2025-06-13T11:32:00',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '2025-06-14T11:32:00',
        isMine: true,
      },
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '2025-06-13T11:32:00',
        isMine: true,
      },
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    isSeller: false,
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    isSeller: true,
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: true,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },

    ],
  },
  {
    id: 1,
    partnerName: '이현승',
    lastMessage: '언제쯤 WWWWWWWWWWASAWWWSASWWWWWWWWWASASAWWWWWWWWWWWWWWWAAASAASASWW받을 수 있나요?',
    time: '오전 11:34',
    title: '치약 10개입 공동구매선착순 참여...',
    price: '6,000',
    ddayText: '마감 D-2',
    postImage: postImage, // 게시글 이미지 테스트용
    profileImg: profileImg, // 프로필 이미지 테스트용
    messages: [
      {
        content: '안녕하세요! 내일 오후 6시 괜찮으세요?',
        time: '오전 11:32',
        isMine: false,
      },
      {
        content: '스타벅스 잠실점 앞에서 뵈어요!',
        time: '오전 11:33',
        isMine: false,
      },
      {
        content: '넵 확인했습니다. 감사합니다!',
        time: '오전 11:35',
        isMine: true,
      },
    ],
  },
  
]);


  const [selectedRoom, setSelectedRoom] = useState(null);

  const isEmpty = chatRooms.length === 0;

  return (
    <div className={styles.container}>
      {/* 왼쪽: 채팅 목록 */}
      <div className={styles.leftWrapper}>
        <div className={styles.leftTop}>
          <h2 className={styles.chatTitle}>채팅 목록</h2>
          <Dropdown
            options={['구매', '판매']}
            selected={dateSort}
            setSelected={setDateSort}
            placeholder="날짜"
          />
        </div>

        <div className={styles.left}>
          {isEmpty ? (
            <>
              <p className={styles.chatEmptyText}>
                💬 아직 시작된 채팅이 없습니다.<br /><br />
                이웃과 함께 나누는 첫 거래를 시작해보세요!
              </p>
              <p className={styles.chatEmptyText1}>
                공동구매 상품을 골라 시작할 수 있어요.
              </p>
              <button className={styles.button}>상품 둘러보기</button>
            </>
          ) : (
            chatRooms.map((room) => (
              <ChatListItem
                key={room.id}
                partnerName={room.partnerName}
                lastMessage={room.lastMessage}
                lastMessageTime={room.time}
                postImage={room.postImage}
                profileImg={room.profileImg}
                hasUnread={true}
                onClick={() => setSelectedRoom(room)}
              />
            ))
          )}
        </div>
      </div>

      {/* 오른쪽: 채팅 상세 or 기본 박스 이미지 */}
      <div className={styles.right}>
        {selectedRoom ? (
          <div className={styles.chatDetail}>
      
          {/* ✅ 헤더 컴포넌트 추가 */}
          <ChatHeader
            partnerName={selectedRoom.partnerName}
            postImage={selectedRoom.postImage}
            title={selectedRoom.title}
            price={selectedRoom.price}
            ddayText={selectedRoom.ddayText}
          />

          <div className={styles.chatMessages}>
            {Object.entries(groupMessagesByDate(selectedRoom.messages)).map(
              ([date, msgs]) => (
                <div key={date} className={styles.messageGroup}>
                  <div className={styles.dateLine}>{date}</div> {/* 스타일명 맞춤 */}
                  {msgs.map((msg, idx) => (
                    <ChatMessage
                      key={idx}
                      content={msg.content}
                      time={new Date(msg.time).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                      isMine={msg.isMine}
                      isSeller={selectedRoom.isSeller}
                    />
                  ))}
                </div>
              )
            )}
          </div>


      <ChatBottom
        isSeller={selectedRoom.isSeller} // TODO: 실제 로그인 유저 role로 바꿔줘!
        chatStatus={'active'} // TODO: 상태값에 따라 변경 가능
        onSendMessage={(msg) => {
          console.log('보낸 메시지:', msg);
          // 원하는 로직으로 메시지 리스트에 push해도 됨
        }}
      />
    </div>
  ) : (
    <img src={boxImage} alt="박스" className={styles.image} />
  )}
</div>

    </div>
  );
}

export default Chat;


function getFormattedDate(isoString) {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}년 ${month}월 ${day}일`;
}

function groupMessagesByDate(messages) {
  const grouped = {};
  messages.forEach((msg) => {
    const dateKey = getFormattedDate(msg.time);
    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(msg);
  });
  return grouped;
}
