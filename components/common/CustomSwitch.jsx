import { useState } from 'react';

const CustomSwitch = ({ label1, label2, onChange, defaultChecked }) => {
  const [isChecked, setIsChecked] = useState(defaultChecked || false);

  const handleToggle = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    if (onChange) {
      onChange(newState);
    }
  };

  return (
	<div className="btn-container">
			<label className="switch btn-color-mode-switch">
		        <input onChange={handleToggle} type="checkbox" name="color_mode" id="color_mode" value="1" checked={isChecked} />
		        <label for="color_mode" data-on={label1} data-off={label2} className="btn-color-mode-switch-inner"></label>
		    </label>
	</div>
    
  );
};

export default CustomSwitch;
