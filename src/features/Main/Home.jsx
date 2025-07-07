import React,{useState} from 'react';
import HomeHeader from '../../components/Home/HomeHeader';
import HomeBody from '../../components/Home/HomeBody';
import LocationModal from '../../components/Home/LocationModal';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('서울특별시 중랑구 망우본동');
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSelectDong = (address) => {
        setSelectedAddress(address);
        setIsModalOpen(false);
    };
    
    // 임시 로직 : 현재는 전체주소에서 동만 추출하여 데이터를 필터링 (평택시 중앙동인지 안산시 중앙동인지 구분하지 않음)
    // 추후 정확한 지역 매칭을 위해 필터 로직 개선 필요
    const selectedDong = selectedAddress.split(' ').pop().trim();

    return (
        <div>
            <HomeHeader
                onLocationClick={() => setIsModalOpen(true)}
                selectedAddress={selectedAddress}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                searchKeyword={searchKeyword}
                onSearchKeywordChange={setSearchKeyword}
            />
            <HomeBody
                selectedAddress={selectedDong}
                selectedCategory={selectedCategory}
                searchKeyword={searchKeyword}
            />
            <LocationModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelectAddress={handleSelectDong}
            />
        </div>
    );
}

export default Home;
