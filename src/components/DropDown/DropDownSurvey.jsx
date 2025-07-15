import React, { useState } from 'react';
import styles from './DropDownSurvey.module.css';
import arrow from '../../assets/chevron-down-outline.svg';

function DropDownSurvey({ value, setValue, placeholder, options }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setValue(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectWrapper}>
      <div
        className={styles.dropdownBox}
        onClick={() => setIsOpen((prev) => !prev)}
        tabIndex={0}
      >
        {value || <span style={{ color: '#949494' }}>{placeholder}</span>}
        <img src={arrow} alt="화살표" className={styles.arrowIcon} />
      </div>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((opt, idx) => (
            <li
              key={idx}
              className={styles.dropdownItem}
              onClick={() => handleSelect(opt)}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DropDownSurvey;
