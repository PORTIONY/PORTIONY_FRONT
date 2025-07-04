
import React,{useState} from 'react';
import HomeHeader from '../../components/Home/HomeHeader';
import HomeBody from '../../components/Home/HomeBody';
import LocationModal from '../../components/Home/LocationModal';

function Home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState('서울특별시 중랑구 망우본동');

    const handleSelectDong = (address) => {
        setSelectedAddress(address);
        setIsModalOpen(false);
    };

    return (
        <div>
            <HomeHeader
                onLocationClick={() => setIsModalOpen(true)}
                selectedAddress={selectedAddress}
            />
            <HomeBody/>
            <LocationModal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelectAddress={handleSelectDong}
            />
        </div>
    );
}

export default Home;
