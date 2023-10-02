import React, { useState } from 'react';
import Link from "next/link";
import BookingDetails from "./sidebar/BookingDetails";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';
import axios from 'axios';
//import { uploadFile } from '@/utils/fileUpload';
const CustomerInfo = ({ bookingInfo, packageDetail }) => {
  // Define the initial form state
  const [formData, setFormData] = useState({
    guestDetails: [],
    customerName: '',
    email: '',
    phoneNumber: '',
    alternateNumber: '',
    nationality: '',
    specialRequests: '',
  });
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Function to handle changes in the form fields
  const handleCustomerDetailChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle changes in guest details (inside guestDetails array)
  const handleGuestDetailChange = (e, guestIndex) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedGuestDetails = [...prevData.guestDetails];

      // Ensure the array has enough elements for the guestIndex
      while (updatedGuestDetails.length <= guestIndex) {
        updatedGuestDetails.push({
          guestName: '',
          age: 0,
          documentList: [], // Initialize as an empty array
        });
      }

      updatedGuestDetails[guestIndex] = {
        ...updatedGuestDetails[guestIndex],
        [name]: value,
      };

      return {
        ...prevData,
        guestDetails: updatedGuestDetails,
      };
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const customerData = {
        "name": formData.customerName,
        "published": 'draft',   
        data: {
          guestDetails: formData.guestDetails.map((guest) => ({
            documentList: guest.documentList,
            guestName: guest.guestName,
            age: guest.age,
          })),
          customerName: formData.customerName,
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          alternateNumber: formData.alternateNumber,
          nationality: formData.nationality,
          specialRequests: formData.specialRequests,
        },
      };
  
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer bpk-ce7a15edc38b471e8101a488e526dadd',
        },
        body: JSON.stringify(customerData),
      };
  
      const url = `https://builder.io/api/v1/write/customer-details`;
  
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
  

  // Function to determine content type based on file extension
  const getFileContentType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();

    switch (extension) {
      case 'pdf':
        return 'application/pdf';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return 'image/jpeg';
      default:
        return 'application/octet-stream';
    }
  };

  // Function to check if the content type is valid (image or PDF)
  const isValidContentType = (contentType) => {
    return contentType.startsWith('image/') || contentType === 'application/pdf';
  };

  const handleUploadFormSubmit = async (e) => {
    e.preventDefault();

    console.log("uploadFormData", formData);

    // Define the URL for the POST request
    const apiUrl = 'https://builder.io/api/v1/write/customer-details';

    try {
      // Create an array to hold document objects for otherDoc
      const otherDocList = Array.isArray(formData.otherDoc)
        ? formData.otherDoc.map((url) => ({
          documentType: 'OtherDoc',
          documentUrl: url,
        }))
        : [
          {
            documentType: 'OtherDoc',
            documentUrl: formData.otherDoc,
          },
        ];

      // Create the formatted data structure
      const formattedData = {
        documentList: [
          ...otherDocList,
          {
            documentType: 'passportPhoto',
            documentUrl: formData.passportPhoto,
          },
        ],
        fullName: uploadFormData.fullName,
      };

      console.log("🚀 ~ file: CustomerInfo.jsx:254 ~ handleUploadFormSubmit ~ formattedData:", formattedData);


      // Send a POST request to the specified URL
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type of the request
          // Add any other headers as needed
        },
        body: JSON.stringify(
          {
            data: {
              "uploadedDocuments": formattedData
            },
          }
        ), // Convert the formatted data to JSON
      });

      if (response.ok) {
        // Request was successful, handle the response as needed
        const jsonResponse = await response.json();
        console.log('Success:', jsonResponse);

        // Clear the form or perform any other actions upon successful submission
        // For example, you can reset the form by setting the form data to its initial state
        setUploadFormData({
          fullName: '',
          passportPhoto: null,
          otherDoc: [],
        });
      } else {
        // Request failed, handle the error
        console.error('Request failed:', response.statusText);
        // You can display an error message to the user or take other appropriate actions
      }
    } catch (error) {
      // Handle any network or other errors
      console.error('Error:', error.message);
      // You can display an error message to the user or take other appropriate actions
    }
  };

  const handleFileUpload = async (name, files, guestIndex) => {
    const fileArray = name === "otherDoc" ? Array.from(files) : [files].flat(); // Ensure files is an array
  
    if (!fileArray || fileArray.length === 0) {
      // Handle the case where no files are selected
      console.error('No files selected.');
      return;
    }
  
    try {
      setIsUploading(true);
  
      const uploadedFiles = await Promise.all(
        fileArray?.map(async (file, index) => { // Added an index parameter
          try {
            const formDataCopy = { ...formData };
  
            const binaryData = await new Promise((resolve, reject) => {
              const reader = new FileReader();
  
              reader.onload = () => {
                // Resolve with ArrayBuffer
                resolve(reader.result);
              };
  
              reader.onerror = (error) => {
                reject(error);
              };
  
              reader.readAsArrayBuffer(file);
            });
  
            let contentType = getFileContentType(file.name);
  
            if (isValidContentType(contentType)) {
              const response = await axios.post('https://builder.io/api/v1/upload?name=' + name, binaryData, {
                headers: {
                  'Authorization': 'Bearer bpk-ce7a15edc38b471e8101a488e526dadd',
                  'Content-Type': contentType,
                },
                // Add this option to track upload progress
                onUploadProgress: (progressEvent) => {
                  const progress = (progressEvent.loaded / progressEvent.total) * 100;
                  setUploadProgress(progress); // Update the progress state
                },
              });
  
              if (response.status === 200) {
                // Assuming the response contains the URL
                const jsonResponse = response.data;
                console.log(jsonResponse);
  
                // Ensure that guestDetails array exists for the specific guest
                if (!formDataCopy.guestDetails[guestIndex]) {
                  formDataCopy.guestDetails[guestIndex] = {
                    guestName: '', // Initialize other properties as needed
                    age: 0,
                    documentList: [],
                  };
                }
                // Ensure that documentList is initialized as an array for the specific guest
                if (!formDataCopy?.guestDetails[guestIndex]?.documentList) {
                  formDataCopy.guestDetails[guestIndex].documentList = [];
                }
  
                if (name === 'passportPhoto') {
                  // Update the passportPhoto for the specific guest
                  formDataCopy?.guestDetails[guestIndex]?.documentList.push({
                    documentType: name,
                    documentUrl: jsonResponse.url,
                  });
                } else if (name === 'otherDoc') {
                  // Update the otherDoc for the specific guest
                  formDataCopy?.guestDetails[guestIndex]?.documentList.push({
                    documentType: name,
                    documentUrl: jsonResponse.url,
                  });
                }
  
                // Update the state with the modified formData
                setFormData(formDataCopy);
              } else {
                throw new Error('File upload failed.');
              }
            } else {
              console.error('Invalid file type selected.');
            }
          } catch (error) {
            console.error('Error:', error);
          }
        })
      );
  
      setIsUploading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsUploading(false);
    }
  };
  
  const accordionItemsIndian = (count) => {
    let item = [];
    for (let i = 0; i < count; i++) {
      item.push(<Accordion.Item eventKey={i} key={i}>
        <Accordion.Header>Person #{i + 1}</Accordion.Header>
        <Accordion.Body>
          <Form>
            <Form.Group controlId="guestName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Full Name" name="guestName" onChange={(e) => handleGuestDetailChange(e, i)} />
            </Form.Group>
            <Form.Group controlId="age" className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" placeholder="Age" name="age" onChange={(e) => handleGuestDetailChange(e, i)} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Passport Size Photo</Form.Label>
              <Form.Control type="file" name="passportPhoto" onChange={(e) => handleFileUpload('passportPhoto', e.target.files[0], i)} />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label>Voter ID/ Adhaar/ Passport</Form.Label>
              <Form.Control type="file" name="otherDoc" multiple onChange={(e) => handleFileUpload('otherDoc', e.target.files, i)} />
            </Form.Group>
            <ProgressBar className={isUploading? 'd-block': 'd-none'} now={uploadProgress} label={`${uploadProgress}%`} />
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
            <Form.Group controlId="guestName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="guestName" placeholder="Full Name" onChange={(e) => handleGuestDetailChange(e, i)} />
            </Form.Group>
            <Form.Group controlId="age" className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control type="text" placeholder="Age" name="age" onChange={(e) => handleGuestDetailChange(e, i)} />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Passport Size Photo</Form.Label>
              <Form.Control type="file" name="passportPhoto" onChange={(e) => handleFileUpload('passportPhoto', e.target.files[0], i)} />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label> Passport</Form.Label>
              <Form.Control type="file" name="otherDoc" multiple onChange={(e) => handleFileUpload('otherDoc', e.target.files, i)} />
            </Form.Group>
            <Form.Group controlId="formFileMultiple" className="mb-3">
              <Form.Label> Visa</Form.Label>
              <Form.Control type="file" name="otherDoc" multiple onChange={(e) => handleFileUpload('otherDoc', e.target.files, i)} />
            </Form.Group>
            <ProgressBar className={isUploading? 'd-block': 'd-none'} now={uploadProgress} label={`${uploadProgress}%`} />
          </Form>
        </Accordion.Body>
      </Accordion.Item>);
    }
    return item;
  }

  const forForeigeners = packageDetail?.data?.forForeigeners[0].isAvailable ? true : false;


  console.log("🚀 ~ file: CustomerInfo.jsx:494 ~ CustomerInfo ~ formData:", formData);

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
        <div className="row x-gap-20 y-gap-20 pt-20">
          <div className="col-xl-12 col-lg-12 mt-20">
            <h2 className="text-22 fw-500 mt-0 md:mt-24">
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
            {bookingInfo?.children > 0 &&
              <div className="row x-gap-20 y-gap-20 pt-20">
                <div className="col-12">
                  <div className="text-14 fw-500 mb-30">Children</div>
                  <Accordion defaultActiveKey="0">
                    {forForeigeners ? accordionItemsForeigner(bookingInfo?.children) : accordionItemsIndian(bookingInfo?.children)}
                  </Accordion>

                </div>
              </div>
            }
          </div>
          <div className='col-12'>
            <h2 className="text-22 fw-500 mt-40 md:mt-24">
              Enter contact details
            </h2>

            <form onSubmit={handleSubmit}>
              <div className='row x-gap-20 y-gap-20 pt-20'>
                <div className="col-12">
                  <div className="form-input ">
                    <input type="text" name='customerName' onChange={handleCustomerDetailChange} required />
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
          <div className="col-12">
            <div className="row y-gap-20 items-center justify-between">
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
