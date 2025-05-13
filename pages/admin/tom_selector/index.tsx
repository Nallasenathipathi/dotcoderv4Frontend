import React, { useEffect, useRef } from 'react';
import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.bootstrap5.css';

const TomSelectInput = () => {
  const selectRef = useRef<HTMLSelectElement | null>(null);

  useEffect(() => {
    if (selectRef.current) {
      new TomSelect(selectRef.current, {
        plugins: ['remove_button'],
        create: true,
        persist: false
      });
    }
  }, []);

  return (
    <div className="mb-3">
      <label htmlFor="college">Select or Add Colleges</label>
      <select
        id="college"
        ref={selectRef}
        className="form-select"
        multiple
      >
        <option value="1">SKCT</option>
        <option value="2">PSG</option>
        <option value="3">KCT</option>
      </select>
    </div>
  );
};

export default TomSelectInput;
