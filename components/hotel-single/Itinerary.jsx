import React, { useState } from 'react';

const Itinerary = ({ itinenary }) => {

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <>
            <div className="row">
                <div className="col-4">
                    <div id="list-example" className="list-group">
                        {itinenary?.itinerary?.map((item, index) => (
                            <a
                                key={index}
                                className={`list-group-item list-group-item-action ${index === activeTab ? 'active' : ''}`}
                                onClick={() => handleTabClick(index)}
                                href={`#list-item-${index + 1}`}
                            >
                                {item?.day}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="col-8">
                    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example" tabindex="0">
                        {itinenary?.itinerary?.map((item, index) => (
                            <div className='mb-20' key={index} id={`list-item-${index + 1}`}>
                                <h4 className='text-16'>{item?.day}</h4>
                                <h6 className='text-13'>{item?.title}</h6>
                                <p>{item?.itinenaryDescription}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Itinerary;
