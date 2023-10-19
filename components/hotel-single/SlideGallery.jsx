import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Gallery, Item } from "react-photoswipe-gallery";

const SlideGallery = ({sliderImg}) => {


  return (
    <>
      <div className="relative">
        <Swiper
          loop={true}
          spaceBetween={10}
          modules={[Navigation]}
          className="overflow-hidden"
          navigation={{
            nextEl: ".js-activity-next-active",
            prevEl: ".js-activity-prev-active",
          }}
          breakpoints={{
            540: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 1,
              spaceBetween: 22,
            },
            1024: {
              slidesPerView: 1,
            },
            1200: {
              slidesPerView: 1,
            },
          }}
        >
          {sliderImg?.map((img, i) => (
            <SwiperSlide key={i}>
              <div className="ratio ratio-64:45">
                <img src={img.image} alt="image" className="img-ratio" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <Gallery>
          {sliderImg?.map((slide, i) => (
            <div
              className="absolute px-10 py-10 col-12  d-flex justify-end items-end z-2 bottom-0 end-0"
              key={i}
            >
              <Item width={451} height={450} original={slide?.image} thumbnail={slide?.image}>
                {({ ref, open }) => (
                  <div
                    className="button px-24 py-15 bg-yellow-1 text-white js-gallery rounded-0"
                    ref={ref}
                    onClick={open}
                    role="button"
                  >
                    See All Photos
                  </div>
                )}
              </Item>
            </div>
          ))}
        </Gallery>

        <button className="section-slider-nav -prev flex-center button -blue-1 bg-white shadow-1 size-40 rounded-full sm:d-none js-activity-prev-active">
          <i className="icon icon-chevron-left text-12" />
        </button>
        <button className="section-slider-nav -next flex-center button -blue-1 bg-white shadow-1 size-40 rounded-full sm:d-none js-activity-next-active">
          <i className="icon icon-chevron-right text-12" />
        </button>

        {/* End prev nav button wrapper */}
      </div>
      {/* slider relative */}
    </>
  );
};

export default SlideGallery;
