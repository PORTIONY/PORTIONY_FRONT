import React, { useState, useEffect } from 'react';
import styles from './HomeBody.module.css';
import banner1 from '../../assets/banner1.png';
import banner2 from '../../assets/banner2.png';
import banner3 from '../../assets/banner3.png';

const images = [
    banner1,
    banner2,
    banner3
];

function HomeBody() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 6000); // 6초 간격

    return () => clearInterval(timer);
    }, [currentIndex]);

  
    return(
        <div className={styles.container}>
            <div className={styles.bannerWrapper}>
                <div
                    className={styles.slider}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((src, i) => (
                        <img key={i} src={src} alt={`slide-${i}`} className={styles.slideImage} />
                    ))}
            </div>

                
                <div className={styles.dots}>
                    {images.map((_, i) => (
                        <button
                            key={i}
                            className={`${styles.dot} ${i === currentIndex ? styles.active : ''}`}
                            onClick={() => setCurrentIndex(i)}
                        />
                    ))}
                </div>
            </div>

            <div className={styles.content}>
                
            </div>
        </div>
    );
}

export default HomeBody;