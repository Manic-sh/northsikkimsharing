import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import ShowMoreText from "@/components/common/ShowMoreText";

const Sights = ({ sights }) => {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },

      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  var itemSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // custom navigation
  function Arrow(props) {
    let className =
      props.type === "next"
        ? "slick_arrow-between slick_arrow -next arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-next"
        : "slick_arrow-between slick_arrow -prev arrow-md flex-center button -blue-1 bg-white shadow-1 size-30 rounded-full sm:d-none js-prev";
    className += " arrow";
    const char =
      props.type === "next" ? (
        <>
          <i className="icon icon-chevron-right text-12"></i>
        </>
      ) : (
        <>
          <span className="icon icon-chevron-left text-12"></span>
        </>
      );
    return (
      <button className={className} onClick={props.onClick}>
        {char}
      </button>
    );
  }

  return (
    <div id="Sights">
      <Slider {...settings}>
        {sights?.slice(0, 5)?.map((item, idx) => (
          <div
            key={idx}
            data-aos="fade"
            data-aos-delay={100 * idx}
          >
            <Link
              href={`#Sights`}
              className="activityCard -type-1 rounded-4 hover-inside-slider"
            >
              <div className="activityCard__image position-relative">
                <div className="inside-slider">
                  <Slider
                    {...itemSettings}
                    arrows={true}
                    nextArrow={<Arrow type="next" />}
                    prevArrow={<Arrow type="prev" />}
                  >
                    {item?.data?.images?.map((slide, i) => (
                      <div className="cardImage ratio ratio-1:1" key={i}>
                        <div className="cardImage__content ">
                          <Image
                            width={300}
                            height={300}
                            className="col-12 js-lazy"
                            src={slide.image}
                            alt={slide.alt}
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>

                  <div className="cardImage__wishlist">
                    <button className="button -blue-1 bg-white size-30 rounded-full shadow-2">
                      <i className="icon-heart text-12" />
                    </button>
                  </div>
                </div>
              </div>
              {/* End .tourCard__image */}

              <div className="activityCard__content mt-10">
                <div className="text-14 lh-14 text-light-1 mb-5">
                  10+ hours
                </div>
                <h4 className="activityCard__title lh-16 fw-500 text-dark-1 text-18">
                  <span>{item?.data?.sightsName}</span>
                </h4>
                <p className="text-light-1 text-14 lh-14 mt-5">
                  <ShowMoreText
                    initialContent={item?.data?.description?.slice(0, 100)}
                    additionalContent={item?.data?.description?.slice(100)}
                  />
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Sights;
