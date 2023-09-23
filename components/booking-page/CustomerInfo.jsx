import React, { useState } from 'react';
import Link from "next/link";
import BookingDetails from "./sidebar/BookingDetails";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const CustomerInfo = ({ bookingInfo, packageDetail }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    specialRequests: '',
  });

  const [uploadFormData, setUploadFormData] = useState({
    fullName: '',
    passportPhoto: null, // Initialize with null
    otherDoc: [], // Initialize as an empty array for multiple files
  });

  const handleCustomerDetailChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const title = formData.fullName || '';
      const name = formData.fullName || "";
      const published = "draft";
      const fullName = formData.fullName || '';
      const email = formData.email || '';
      const phoneNumber = formData.phoneNumber || '';
      const specialRequests = formData.specialRequests || '';

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the appropriate content type
          Authorization: 'Bearer bpk-ce7a15edc38b471e8101a488e526dadd',
          // Add other headers here if needed
        },
        body: JSON.stringify({
          title,
          name,
          published,
          data: {
            userName: fullName,
            email,
            phoneNumber,
            specialRequests,
          },
        }),
      };
      const url = `https://builder.io/api/v1/write/users`;

      const response = await fetch(url, requestOptions);

      if (response.ok) {
        const result = await response.text();
        console.log(result);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleUploadFormInputChange = (e) => {
    const { name, value, type, files } = e.target;

    console.log("🚀 ~ file: CustomerInfo.jsx:79 ~ handleUploadFormInputChange ~ value:", value);


    console.log("🚀 ~ file: CustomerInfo.jsx:79 ~ handleUploadFormInputChange ~ name:", name);

    if (type === 'file') {
      // Handle file inputs separately
      if (name === 'passportPhoto') {
        setUploadFormData({ ...uploadFormData, [name]: files[0] || null });
      } else {
        setUploadFormData({ ...uploadFormData, [name]: files });
      }
    } else {
      // Handle other inputs
      setUploadFormData({ ...uploadFormData, [name]: value });
    }
  };

  const handleUploadFormSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData instance
    const formDataToSend = new FormData();

    // Append form fields to the formDataToSend
    formDataToSend.append('fullName', uploadFormData.fullName);
    
    // Append uploaded files to formDataToSend
    if (formData.passportPhoto) {
      formDataToSend.append('passportPhoto', uplaodFormData.passportPhoto[0]);
    }

    if (formData.otherDoc) {
      for (let i = 0; i < uplaodFormData.otherDoc.length; i++) {
        formDataToSend.append(`otherDoc${i + 1}`, uploadFormData.otherDoc[i]);
      }
    }

    console.log("🚀 ~ file: CustomerInfo.jsx:97 ~ handleUploadFormSubmit ~ formDataToSend:", formDataToSend);

    // Now, you can send formDataToSend to your server using fetch or another method
    // Example:
    // const response = await fetch('/api/upload', {
    //   method: 'POST',
    //   body: formDataToSend,
    // });

    // Handle the response from the server as needed
  };


  const accordionItemsIndian = (count) => {
    let item = [];
    for (let i = 1; i <= count; i++) {
      item.push(<Accordion.Item eventKey={i} key={i}>
        <Accordion.Header>Person #{i}</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleUploadFormSubmit}>
            <Form.Group controlId="personName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Full Name" name="fullName" onChange={handleUploadFormInputChange} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Passport Size Photo</Form.Label>
              <Form.Control type="file" name="passportPhoto" onChange={handleUploadFormInputChange} />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Voter ID/ Adhaar/ Passport</Form.Label>
              <Form.Control type="file" name="otherDoc" multiple onChange={handleUploadFormInputChange} />
            </Form.Group>
            <Button type="submit">Upload</Button>
          </Form>

        </Accordion.Body>
      </Accordion.Item>);
    }
    return item;
  }
  const accordionItemsForeigner = (count) => {
    let item = [];
    for (let i = 1; i <= count; i++) {
      item.push(<Accordion.Item eventKey={i} key={i}>
        <Accordion.Header>Person #{i}</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleUploadFormSubmit}>
            <Form.Group controlId="personName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="fullName" placeholder="Full Name" onChange={handleUploadFormInputChange} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Passport Size Photo</Form.Label>
              <Form.Control type="file" onChange={handleUploadFormInputChange} />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label> Passport</Form.Label>
              <Form.Control type="file" multiple onChange={handleUploadFormInputChange} />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label> Visa</Form.Label>
              <Form.Control type="file" multiple onChange={handleUploadFormInputChange} />
            </Form.Group>
            <Button type="submit">Upload</Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>);
    }
    return item;
  }

  const forForeigeners = packageDetail?.data?.forForeigeners[0].isAvailable ? true : false;
  return (
    <>
      <div className="col-xl-7 col-lg-8 mt-30">
        <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05">
          Sign in to book with your saved details or{" "}
          <Link href="/others-pages/signup" className="text-blue-1 fw-500">
            register
          </Link>{" "}
          to manage your bookings on the go!
        </div>
        {/* End register notify */}

        <h2 className="text-22 fw-500 mt-40 md:mt-24">
          Let us know who you are
        </h2>

        <div className="row x-gap-20 y-gap-20 pt-20">
          <div className='col-12'>
            <form onSubmit={handleSubmit}>
              <div className='row x-gap-20 y-gap-20 pt-20'>
                <div className="col-12">
                  <div className="form-input ">
                    <input type="text" name='fullName' onChange={handleCustomerDetailChange} required />
                    <label className="lh-1 text-16 text-light-1">Full Name</label>
                  </div>
                </div>
                {/* End col-12 */}

                <div className="col-md-6">
                  <div className="form-input ">
                    <input type="text" name="email" onChange={handleCustomerDetailChange} required />
                    <label className="lh-1 text-16 text-light-1">Email</label>
                  </div>
                </div>
                {/* End col-12 */}

                <div className="col-md-6">
                  <div className="form-input ">
                    <input type="text" name="phoneNumber" onChange={handleCustomerDetailChange} required />
                    <label className="lh-1 text-16 text-light-1">Phone Number</label>
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-input ">
                    <textarea name="specialRequests" onChange={handleCustomerDetailChange} required rows={6} defaultValue={""} />
                    <label className="lh-1 text-16 text-light-1">
                      Special Requests
                    </label>
                  </div>
                </div>
                <div className="col-12">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </div>
              {/* End col-12 */}
            </form>
          </div>
          {/* End col-12 */}
          <div className="col-xl-12 col-lg-12 mt-30">
            {/* End register notify */}

            <h2 className="text-22 fw-500 mt-40 md:mt-24">
              Upload your documents
            </h2>

            <div className="row x-gap-20 y-gap-20 pt-20">
              <div className="col-12">
                <div className="text-14 fw-500 mb-30">Adults</div>
                <Accordion defaultActiveKey="0">
                  {forForeigeners ? accordionItemsForeigner(bookingInfo?.adults) : accordionItemsIndian(bookingInfo?.adults)}
                </Accordion>
              </div>
            </div>
            <div className="row x-gap-20 y-gap-20 pt-20">
              <div className="col-12">
                <div className="text-14 fw-500 mb-30">Children</div>
                <Accordion defaultActiveKey="0">
                  {forForeigeners ? accordionItemsForeigner(bookingInfo?.children) : accordionItemsIndian(bookingInfo?.children)}
                </Accordion>

              </div>
            </div>
          </div>

          <div className="col-12">
            <div className="row y-gap-20 items-center justify-between">
              <div className="col-auto">
                <div className="text-14 text-light-1">
                  <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05">
                    <Link href="/others-pages/signup" className="text-blue-1 fw-500">
                      register
                    </Link>
                    to manage your bookings on the go!
                  </div>

                </div>
              </div>
              <div className="col-12">
                <div className="row y-gap-20 items-center justify-between">
                  <div className="col-auto">
                    <div className="text-14 text-light-1">
                      By proceeding with this booking, I agree to North Sikkim Sharing Terms of
                      Use and Privacy Policy.
                    </div>
                  </div>
                  {/* End col-12 */}
                </div>
              </div>
              {/* End col-12 */}
            </div>
          </div>
          {/* End col-12 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .col-xl-7 */}

      <div className="col-xl-5 col-lg-4 mt-30">
        <div className="booking-sidebar">
          <BookingDetails bookingInfo={bookingInfo} packageDetail={packageDetail} />
        </div>
      </div>
    </>
  );
};

export default CustomerInfo;
