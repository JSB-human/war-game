import React from 'react';
import dynamic from 'next/dynamic';

// 동적 import를 사용하여 LeafletMap 컴포넌트를 클라이언트 사이드에서만 로드
const LeafletMap = dynamic(() => import('../component/map/LeafletMap'), {
     ssr: false 
    ,loading: () => <p>Loading map...</p>, // 로딩 중 메시지 표시    
});

const LeafletMapPage: React.FC = () => {
  return (
    <div>
      <LeafletMap />
    </div>
  );
};

export default LeafletMapPage;
