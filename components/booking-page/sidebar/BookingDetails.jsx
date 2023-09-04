import { useState, useEffect } from "react";
import Image from "next/image";
import { calculateTotalPrice } from '@/utils/roomPriceCalculator';
import { useRoomContext } from '@/context/RoomContext';


const BookingDetails = ({ bookingInfo, packageDetail }) => {
  const [basePrice, setBasePrice] = useState(packageDetail?.data?.basePricePerPerson);
  const [luxuryBasePrice, setLuxuryBasePrice] = useState(0);
  const { state } = useRoomContext();
  const room = state;

  useEffect(() => {
    setBasePrice(packageDetail?.data?.basePricePerPerson);
    if (bookingInfo?.ptype == 'Luxury') {
      const luxury = packageDetail?.data?.availablePackageType.find((ptype) => ptype?.typeName?.value?.name == 'Luxury');
      setLuxuryBasePrice(luxury?.typeName?.value?.data?.basePrice);
    }
  }, [packageDetail?.data?.basePricePerPerson, bookingInfo?.ptype]);

  const getTotalGuests = () => {
    let noGuests = room.reduce((accumulator, item) => {
      return accumulator + item?.adults + item?.children ;
    }, 0);
    return noGuests;
  }

  //Function to calculate the total price
  const getTotalPrice = () => {
    // Using forEach to calculate total Adults and Children
    let noOfAdults = 0;
    let noOfChildren = 0

    room?.forEach(room => {
      noOfAdults += room?.adults;
      noOfChildren += room?.children;
    });

    let basePricePerAdult = 0;

    if (bookingInfo?.ptype == 'Luxury') {
      basePricePerAdult = calculateTotalPrice(luxuryBasePrice || 0, room.length, noOfAdults);
    } else {
      basePricePerAdult = basePrice ? calculateTotalPrice(basePrice, room.length, noOfAdults) : 0;
    }
    return basePricePerAdult;
  }

  if (packageDetail === null || bookingInfo === null) {
    return <div>Loading...</div>; // Handle the initial undefined state
  }

  return (
    <div className="px-30 py-30 border-light rounded-4">
      <div className="text-20 fw-500 mb-30">Your booking details</div>
      <div className="row x-gap-15 y-gap-20">
        <div className="col-auto">
          <Image
            width={140}
            height={140}
            src={packageDetail?.data?.images[0]?.image}
            alt="image"
            className="size-140 rounded-4 object-cover"
          />
        </div>
        {/* End .col */}
        <div className="col">
          <div className="d-flex x-gap-5 pb-10">
            <i className="icon-star text-yellow-1 text-10" />
            <i className="icon-star text-yellow-1 text-10" />
            <i className="icon-star text-yellow-1 text-10" />
            <i className="icon-star text-yellow-1 text-10" />
            <i className="icon-star text-yellow-1 text-10" />
          </div>
          {/* End ratings */}
          <div className="lh-17 fw-500">
            {packageDetail?.data?.pakageName}
          </div>
          <div className="text-14 lh-15 mt-5">{packageDetail?.data?.places}</div>
          <div className="row x-gap-10 y-gap-10 items-center pt-10">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="size-30 flex-center bg-blue-1 rounded-4">
                  <div className="text-12 fw-600 text-white">4.8</div>
                </div>
                <div className="text-14 fw-500 ml-10">Exceptional</div>
              </div>
            </div>
            <div className="col-auto">
              <div className="text-14">3,014 reviews</div>
            </div>
          </div>
        </div>
        {/* End .col */}
      </div>
      {/* End .row */}

      <div className="border-top-light mt-30 mb-20" />
      <div className="row y-gap-20 justify-between">
        <div className="col-auto">
          <div className="text-15">Booking Date</div>
          <div className="fw-500">{bookingInfo?.jdate}</div>
        </div>
      </div>
      {/* End row */}

      <div className="border-top-light mt-30 mb-20" />
      <div className="row y-gap-20 justify-between items-center">
        <div className="col-auto">
          <div className="text-15">You selected:</div>
          <div className="fw-500">{bookingInfo?.ptype} Package</div>
          <a href="#" className="text-15 text-blue-1 underline">
            Change your selection
          </a>
        </div>
        <div className="col-auto">
          <div className="text-15">{room.length} room, {getTotalGuests()} adult</div>
        </div>
      </div>
      {/* End row */}
      <div className="border-top-light mt-30 mb-20" />
      <div>
        <div className="text-15">Total Amount:</div>
        <div className="fw-500">Rs {getTotalPrice()} /-</div>
      </div>
    </div>
    // End px-30
  );
};

export default BookingDetails;
