import React, { useState } from 'react';
import styles from './DropDownForm.module.css';
import arrow from '../../assets/chevron-down-outline.svg';

function DropDownForm({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectWrapper}>
      <div
        className={styles.selectBox}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{value}</span>
        <img src={arrow} className={styles.arrowIcon} alt="화살표" />
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

export default DropDownForm;
