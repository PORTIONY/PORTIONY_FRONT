import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GroupBuyNew from './GroupBuyNew';
import dummyProducts from '../../data/dummyProduct';

function GroupBuyEdit() {
  const { id } = useParams();
  const productId = parseInt(id);

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const product = dummyProducts.find(p => p.id === productId);
    if (product) {
      setInitialData(product);
    }
    setLoading(false);
  }, [productId]);

  if (loading) return <div>로딩중...</div>;
  if (!initialData) return <div>데이터를 불러올 수 없습니다.</div>;

  return (
    <GroupBuyNew
      mode="edit"
      productId={productId}
      initialData={initialData}
    />
  );
}

export default GroupBuyEdit;
