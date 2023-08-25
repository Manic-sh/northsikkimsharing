import React, { useState } from 'react';

const ShowMoreText = ({ initialContent, additionalContent }) => {
  const [showAdditional, setShowAdditional] = useState(false);

  const toggleShowAdditional = (event) => {
    event.preventDefault();
    setShowAdditional(!showAdditional);
  };

  return (
    <div>
      <div>{initialContent}</div>
      {showAdditional ? <div>{additionalContent}</div> : null}
      <button type="button" onClick={toggleShowAdditional}>
        {showAdditional ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default ShowMoreText;
