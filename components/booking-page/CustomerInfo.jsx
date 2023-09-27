import React, { useState } from 'react';
import Link from "next/link";
import BookingDetails from "./sidebar/BookingDetails";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import { uploadFile } from '@/utils/fileUpload';
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

  const [isUploading, setIsUploading] = useState(false);



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
  const handleUploadFormInputChange = async (e) => {
    const { name, type, files, value } = e.target;
  
    if (type === 'file') {
      // Handle file inputs separately
      if (name === 'passportPhoto') {
        // Read the selected file and set binary data in state
        if (files[0]) {
          const reader = new FileReader();
  
          reader.onload = async (e) => {
            try {
              // Read the binary data from the file
              const binaryData = e.target.result;
  
              // Determine the content type based on the file extension
              const contentType = getFileContentType(files[0].name);
  
              // Check if the content type is valid (image or PDF)
              if (isValidContentType(contentType)) {
                // Disable the upload button
                setIsUploading(true);
                // Send a POST request to Builder Upload API
                const response = await fetch('https://builder.io/api/v1/upload?name=' + name, {
                  method: 'POST',
                  body: binaryData, // binary data of the file
                  headers: {
                    // Replace 'builder-private-key' with your actual private key
                    'Authorization': 'Bearer bpk-ce7a15edc38b471e8101a488e526dadd',
                    'Content-Type': contentType, // Use the determined content type
                  },
                });
  
                if (response.ok) {
                  const jsonResponse = await response.json();
                  console.log(jsonResponse);
  
                  // Set the URL from jsonResponse to the passportPhoto state
                  setUploadFormData({ ...uploadFormData, passportPhoto: jsonResponse.url });
                } else {
                  throw new Error('File upload failed.');
                }
              } else {
                setIsUploading(false);
                // Invalid content type, display an error message
                console.error('Invalid file type selected.');
              }
            } catch (error) {
              throw error;
            }
          };
  
          reader.readAsBinaryString(files[0]);
        } else {
          // Handle the case where no file is selected
          setFileData(null);
          setUploadFormData({ ...uploadFormData, [name]: null });
        }
      } else if (name === 'otherDoc') {
        // Handle multiple file uploads for 'otherDoc' field
        const uploadedFiles = Array.from(files || []);
  
        // Process each uploaded file and send POST requests
        const uploadedImages = await Promise.all(
          uploadedFiles.map(async (file) => {
            const reader = new FileReader();
  
            reader.onload = async (e) => {
              try {
                // Read the binary data from the file
                const binaryData = e.target.result;
  
                // Determine the content type based on the file extension
                const contentType = getFileContentType(file.name);
  
                // Check if the content type is valid (image or PDF)
                if (isValidContentType(contentType)) {
                    // Disable the upload button
                    setIsUploading(true);
                  // Send a POST request to Builder Upload API
                  const response = await fetch('https://builder.io/api/v1/upload?name=' + file.name, {
                    method: 'POST',
                    body: binaryData,
                    headers: {
                      'Authorization': 'Bearer bpk-ce7a15edc38b471e8101a488e526dadd',
                      'Content-Type': contentType,
                    },
                  });
  
                  if (response.ok) {
                    const jsonResponse = await response.json();
                    console.log(jsonResponse);
                    setIsUploading(false);
                    return jsonResponse.url;
                  } else {
                    throw new Error('File upload failed.');
                  }
                } else {
                  // Invalid content type, display an error message
                  console.error('Invalid file type selected.');
                }
              } catch (error) {
                throw error;
              }
            };
  
            reader.readAsBinaryString(file);
          })
        );
  
        // Set the uploaded file URLs in the otherDoc state
        setUploadFormData({ ...uploadFormData, otherDoc: uploadedImages });
      }
    } else {
      // Handle non-file inputs
      setUploadFormData({ ...uploadFormData, [name]: value });
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
    
    console.log("uploadFormData", uploadFormData);
    
    // Define the URL for the POST request
    const apiUrl = 'https://builder.io/api/v1/write/users';
  
    try {
      // Create an array to hold document objects for otherDoc
      const otherDocList = Array.isArray(uploadFormData.otherDoc)
        ? uploadFormData.otherDoc.map((url) => ({
            documentType: 'OtherDoc',
            documentUrl: url,
          }))
        : [
            {
              documentType: 'OtherDoc',
              documentUrl: uploadFormData.otherDoc,
            },
          ];
  
      // Create the formatted data structure
      const formattedData = {
        documentList: [
          ...otherDocList,
          {
            documentType: 'passportPhoto',
            documentUrl: uploadFormData.passportPhoto,
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
            <Button type="submit" disabled={isUploading}>{isUploading ? 'Uploading...' : 'Upload'}</Button>
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
            <Button type="submit" disabled={isUploading}>{isUploading ? 'Uploading...' : 'Upload'}</Button>
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
