import React,{useState} from 'react';
import HomeHeader from '../../components/Home/HomeHeader';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  return (
    <div>
      <HomeHeader/>
    </div>
  );
}

export default Home;
