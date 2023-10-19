import React, { useState } from 'react';

const Overview = ({ description }) => {

  // Use regular expression to split the text into paragraphs based on "Day X:"
  const regex = /Day \d+:/g;
  const paragraphs = description?.split(regex);

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <h3 className="text-22 fw-500">Overview</h3>
      <div class="row">
        <div class="col-4">
          <div id="list-example" class="list-group">
            {paragraphs?.map((paragraph, index) => (
              <a
                key={index}
                className={`list-group-item list-group-item-action ${index === activeTab ? 'active' : ''}`}
                onClick={() => handleTabClick(index)}
                href={`#list-item-${index + 1}`}
              >
                {`Day ${index + 1}`}
              </a>
            ))}
          </div>
        </div>
        <div class="col-8">
          <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabindex="0">
            {paragraphs?.map((paragraph, index) => (
              <div key={index} id={`list-item-${index + 1}`}>
                <h4>{`Day ${index + 1}`}</h4>
                <p>{paragraph.trim()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
