import React, { useRef, useState } from 'react';
import { format, isValid, parse } from 'date-fns';
import FocusTrap from 'focus-trap-react';
import { DayPicker } from 'react-day-picker';
import { usePopper } from 'react-popper';
import 'react-day-picker/dist/style.css';

const css = `
  .dialog-sheet{
    z-index: 3;
    background: #fff;
    border-radius: 0px;
    box-shadow: 0 1px 10px rgba(0,0,0,.04), 0 4px 5px rgba(0,0,0,.06), 0 2px 4px -1px rgba(0,0,0,.09);
  }
  .my-selected:not([disabled]) { 
    font-weight: bold; 
    border: 2px solid currentColor;
  }
  .my-selected:hover:not([disabled]) { 
    border-color: var(--color-yellow-1) !important;
    color: var(--color-yellow-1) !important;
  }
  .my-today { 
    font-weight: bold;
    font-size: 140%; 
    color: red;
  }
  .rdp-day_selected{
    background-color: var(--color-yellow-1) !important;
  }
`;

export default function DatePickerDialog() {
  const [selected, setSelected] = useState();
  const [inputValue, setInputValue] = useState('');
  const [isPopperOpen, setIsPopperOpen] = useState(false);

  const popperRef = useRef(null);
  const buttonRef = useRef(null);
  const [popperElement, setPopperElement] = useState(null);

  const popper = usePopper(popperRef.current, popperElement, {
    placement: 'bottom-start',
  });

  const closePopper = () => {
    setIsPopperOpen(false);
    buttonRef?.current?.focus();
  };

  const handleInputChange = (e) => {
    setInputValue(e.currentTarget.value);
    const date = parse(e.currentTarget.value, 'y-MM-dd', new Date());
    if (isValid(date)) {
      setSelected(date);
    } else {
      setSelected(undefined);
    }
  };

  const handleButtonClick = () => {
    setIsPopperOpen(true);
  };

  const handleDaySelect = (date) => {
    setSelected(date);
    if (date) {
      setInputValue(format(date, 'y-MM-dd'));
      closePopper();
    } else {
      setInputValue('');
    }
  };

  return (
    <div>
      <style>{css}</style>
      <div ref={popperRef}>
        <input
          size={12}
          type="text"
          placeholder={format(new Date(), 'y-MM-dd')}
          value={inputValue}
          onChange={handleInputChange}
          onClick={handleButtonClick}
          ref={buttonRef}
        />
      </div>
      {isPopperOpen && (
        <FocusTrap
          active
          focusTrapOptions={{
            initialFocus: false,
            allowOutsideClick: true,
            clickOutsideDeactivates: true,
            onDeactivate: closePopper,
            fallbackFocus: buttonRef.current || undefined,
          }}
        >
          <div
            tabIndex={-1}
            style={popper.styles.popper}
            className="dialog-sheet"
            {...popper.attributes.popper}
            ref={setPopperElement}
            role="dialog"
            aria-label="DayPicker calendar"
          >
            <DayPicker
              captionLayout="dropdown-buttons"
              fromDate={new Date()}
              toYear={2025}
              required
              initialFocus={isPopperOpen}
              mode="single"
              defaultMonth={selected}
              selected={selected}
              onSelect={handleDaySelect}
            />
          </div>
        </FocusTrap>
      )}
    </div>
  );
}
