
const PropertyHighlights2 = ({highlights}) => {


  return (
    <div className="px-30 py-30 border-light rounded-0 mt-30 mb-30">
      <div className="text-18 fw-500 pb-30">Package highlights</div>

      {highlights?.map((item, index) => (
        <div className="row x-gap-20 y-gap-20" key={index}>
          <div className="col-auto">
            <i className={`${item?.highlightIcon} text-24 text-blue-1`} />
          </div>
          <div className="col-auto">
            <div className="text-15 ">{item?.highlightTitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PropertyHighlights2;
