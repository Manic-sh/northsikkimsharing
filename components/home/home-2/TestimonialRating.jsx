const TestimonialRating = () => {
  return (
    <>
      <h2 className="text-30 text-white">
        What our customers are
        <br /> saying us?
      </h2>
      <p className="text-white mt-20">
      Sunflower is professional service provider. Service is very good and to the point.
      </p>

      <div className="row y-gap-30 text-white pt-60 lg:pt-40">
        <div className="col-sm-5 col-6">
          <div className="text-30 lh-15 fw-600">10k+</div>
          <div className="lh-15">Happy People</div>
        </div>
        {/* End .col */}

        <div className="col-sm-5 col-6">
          <div className="text-30 lh-15 fw-600">4.4</div>
          <div className="lh-15">Overall rating</div>
          <div className="d-flex x-gap-5 items-center pt-10">
            <div className="icon-star text-white text-10" />
            <div className="icon-star text-white text-10" />
            <div className="icon-star text-white text-10" />
            <div className="icon-star text-white text-10" />
            <div className="icon-star text-white text-10" />
          </div>
        </div>
        {/* End .col */}
      </div>
    </>
  );
};

export default TestimonialRating;
