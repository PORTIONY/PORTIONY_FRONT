import React, { useState } from 'react';
import MyPageHeader from '../../components/MyPage/MyPageHeader';
import MyPageTabs from '../../components/MyPage/MyPageTabs';
import BuyHistory from './BuyHistory';
import SellHistory from './SellHistory';
import Reviews from './Reviews';
import Likes from './Likes';
import Inquiries from './Inquiries';

function MyPage() {
  const [selectedTab, setSelectedTab] = useState('buy');

  const renderContent = () => {
    switch (selectedTab) {
      case 'buy': return <BuyHistory />;
      case 'sell': return <SellHistory />;
      case 'review': return <Reviews />;
      case 'like': return <Likes />;
      case 'inquiry': return <Inquiries />;
      default: return null;
    }
  };

  return (
    <div>
      <MyPageHeader />
      <MyPageTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div style={{ padding: '35px 65px 0 65px' }}>
        {renderContent()}
      </div>
    </div>
  );
}

export default MyPage;
