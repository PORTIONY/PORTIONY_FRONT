import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MyPageHeader from '../../components/MyPage/MyPageHeader';
import MyPageTabs from '../../components/MyPage/MyPageTabs';
import BuyHistory from './BuyHistory/BuyHistory';
import SellHistory from './SellHistory/SellHistory';
import Reviews from './Reviews/Reviews';
import Likes from './Likes/Likes';
import Inquiries from './Inquiries/Inquiries';

function MyPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initialTab = params.get('tab') || 'buy';

  const [selectedTab, setSelectedTab] = useState(initialTab);

  useEffect(() => {
    const tabParam = new URLSearchParams(location.search).get('tab');
    if (tabParam && tabParam !== selectedTab) {
      setSelectedTab(tabParam);
    }
  }, [location.search]);

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
      <div>
        {renderContent()}
      </div>
    </div>
  );
}

export default MyPage;
