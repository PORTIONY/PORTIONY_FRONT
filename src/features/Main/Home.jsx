
import React,{useState} from 'react';
import HomeHeader from '../../components/Home/HomeHeader';
import HomeBody from '../../components/Home/HomeBody';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  return (
    <div>
      <HomeHeader/>
      <HomeBody/>
    </div>
  );
}

export default Home;
