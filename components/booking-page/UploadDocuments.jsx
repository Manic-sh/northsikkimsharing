import Link from "next/link";
import BookingDetails from "./sidebar/BookingDetails";
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';

const UploadDocuments = ({ bookingInfo }) => {

    console.log(bookingInfo);
    const accordionItems = (count) => {
        let item = [];
        for (let i = 0; i < count; i++) {
            item.push(<Accordion.Item eventKey="0" key={i}>
                <Accordion.Header>Person #{i}</Accordion.Header>
                <Accordion.Body>
                    <Form.Group controlId="personName" className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Full Name" />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Passport Size Photo</Form.Label>
                        <Form.Control type="file" />
                    </Form.Group>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Voter ID/ Adhaar/ Passport</Form.Label>
                        <Form.Control type="file" multiple />
                    </Form.Group>
                </Accordion.Body>
            </Accordion.Item>);
        }
        return item;
    }
    return (
        <>
            <div className="col-xl-7 col-lg-8 mt-30">
                <div className="py-15 px-20 rounded-4 text-15 bg-blue-1-05">
                    <Link href="/others-pages/signup" className="text-blue-1 fw-500">
                        register
                    </Link>{" "}
                    to manage your bookings on the go!
                </div>
                {/* End register notify */}

                <h2 className="text-22 fw-500 mt-40 md:mt-24">
                    Upload your documents
                </h2>

                <div className="row x-gap-20 y-gap-20 pt-20">
                    <div className="col-12">
                        <div className="text-14 fw-500 mb-30">Adults</div>
                        <Accordion defaultActiveKey="0">
                            {accordionItems(bookingInfo?.adults)}
                        </Accordion>
                    </div>
                </div>
                <div className="row x-gap-20 y-gap-20 pt-20">
                    <div className="col-12">
                        <div className="text-14 fw-500 mb-30">Children</div>
                        <Accordion defaultActiveKey="1">
                            {accordionItems(bookingInfo?.noOfChildren)}
                        </Accordion>

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

            </div>
            {/* End .col-xl-7 */}

            <div className="col-xl-5 col-lg-4 mt-30">
                <div className="booking-sidebar">
                    <BookingDetails bookingInfo={bookingInfo} />
                </div>
            </div>
        </>
    );
};

export default UploadDocuments;
