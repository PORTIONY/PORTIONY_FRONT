import React, { useState, useRef, useEffect } from 'react';
import styles from './DropDown.module.css';
import arrowIcon from '../../assets/chevron-down-outline.svg';
import clearIcon from '../../assets/x.svg';

export default function Dropdown({ options, selected, setSelected, placeholder, variant = 'default', // 추가된 부분: 기본값 'default'

}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);

  // 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = e => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 너비 자동 조정 - 제목과 옵션 모두 고려
  useEffect(() => {
    if (!containerRef.current || !buttonRef.current) return;
    
    const measurer = document.createElement('div');
    measurer.style.position = 'absolute';
    measurer.style.visibility = 'hidden';
    measurer.style.whiteSpace = 'nowrap';
    measurer.style.font = window.getComputedStyle(buttonRef.current).font;
    
    // 옵션들 측정
    options.forEach(text => {
      const span = document.createElement('span');
      span.textContent = text;
      measurer.appendChild(span);
    });
    
    // 현재 선택된 값(제목)도 측정
    const titleSpan = document.createElement('span');
    titleSpan.textContent = selected || placeholder;
    measurer.appendChild(titleSpan);
    
    document.body.appendChild(measurer);
    const maxTextWidth = Array.from(measurer.children)
      .reduce((max, el) => Math.max(max, el.getBoundingClientRect().width), 0);
    document.body.removeChild(measurer);

    const style = window.getComputedStyle(buttonRef.current);
    const padding = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
    const border  = parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth);
    const gap     = 8;
    const iconW   = 18;
    
    containerRef.current.style.width =
      Math.ceil(maxTextWidth + padding + border + gap + iconW) + 'px';
  }, [options, selected, placeholder]); // selected와 placeholder도 의존성에 추가

  const handleSelect = option => {
    setSelected(option);
    setOpen(false);
  };

  const handleClear = e => {
    e.stopPropagation();
    setSelected(placeholder);
    setOpen(false);
  };

  const display = selected === placeholder ? placeholder : selected;

  return (
    <div ref={containerRef} className={`${styles.dropdownContainer} ${variant === 'minimal' ? styles.minimalContainer : ''}`}>
      <button
        ref={buttonRef}
        type="button"
        className={`${styles.dropdownButton} ${variant === 'minimal' ? styles.minimal : ''} ${open ? styles.open : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className={display === placeholder ? styles.placeholder : ''}>
          {display}
        </span>
        {display !== placeholder ? (
          <img
            src={clearIcon}
            alt="선택 해제"
            className={styles.clearIcon}
            onClick={handleClear}
          />
        ) : (
          <img
            src={arrowIcon}
            alt="화살표"
            className={`${styles.arrow} ${open ? styles.rotated : ''}`}
          />
        )}
      </button>
      {open && (
        <ul className={styles.dropdownMenu}>
          {options.map((opt, i) => (
            <li
              key={i}
              className={styles.menuItem}
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