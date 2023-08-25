import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Link from "next/link";

const Destinations = ({destinations}) => {
  console.log(destinations);
  
  return (
    <div className="pt-40 overflow-hidden js-section-slider">
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".js-places-next",
          prevEl: ".js-places-prev",
        }}
        pagination={{
          el: ".js-places-pag",
          clickable: true,
        }}
        breakpoints={{
          540: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 22,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 5,
          },
        }}
      >
        {destinations?.map((item, idx) => (
          <SwiperSlide key={idx}>
            <Link
              href="/tour/tour-list-v3"
              className="citiesCard -type-2"
              data-aos="fade"
              data-aos-delay={100 * idx}
            >
              <div className="citiesCard__image rounded-4 ratio ratio-3:4">
                <img
                  className="img-ratio rounded-4 js-lazy"
                  src={item?.data?.image}
                  alt={item?.data?.title}
                />
              </div>
              <div className="citiesCard__content mt-10">
                <h4 className="text-18 lh-13 fw-500 text-dark-1">
                  {item?.data?.title}
                </h4>
                <div className="text-14 text-light-1">
                  {item?.shortDescription}
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Destinations;
