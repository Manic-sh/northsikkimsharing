import React from "react";
import { Card, Form } from "react-bootstrap";


const StepUploadDoc = ({ nextStep, handleFormData, prevStep, values }) => {

    //destructuring the object from values
    const { firstName, lastName, age, email } = values;
    const submitFormData = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <>
            <h3 className="mt-20 mb-10">Upload Documents</h3>
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                           Person #1
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
                        <div class="accordion-body">
                            <p>
                                <strong>First Name :</strong> {firstName}{" "}
                            </p>
                            <p>
                                <strong>Last Name :</strong> {lastName}{" "}
                            </p>
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Passport Size Photo</label>
                                <input class="form-control form-control-sm" type="file" id="formFile" />
                            </div>
                            <div class="mb-3">
                                <label for="formFileMultiple" class="form-label">Identification</label>
                                <input class="form-control form-control-sm" type="file" id="formFileMultiple" multiple />
                            </div>
                            <div class="mb-3">
                                <label for="formFileSm" class="form-label">Passport</label>
                                <input class="form-control form-control-sm" id="formFileSm" type="file" />
                            </div>
                            <div>
                                <label for="formFileLg" class="form-label">Visa</label>
                                <input class="form-control form-control-sm" id="formFileLg" type="file" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                           Person #2
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingTwo">
                        <div class="accordion-body">
                        <p>
                                <strong>First Name :</strong> {firstName}{" "}
                            </p>
                            <p>
                                <strong>Last Name :</strong> {lastName}{" "}
                            </p>
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Passport Size Photo</label>
                                <input class="form-control form-control-sm" type="file" id="formFile" />
                            </div>
                            <div class="mb-3">
                                <label for="formFileMultiple" class="form-label">Identification</label>
                                <input class="form-control form-control-sm" type="file" id="formFileMultiple" multiple />
                            </div>
                            <div class="mb-3">
                                <label for="formFileSm" class="form-label">Passport</label>
                                <input class="form-control form-control-sm" id="formFileSm" type="file" />
                            </div>
                            <div>
                                <label for="formFileLg" class="form-label">Visa</label>
                                <input class="form-control form-control-sm" id="formFileLg" type="file" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingThree">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Person #3
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-headingThree">
                        <div class="accordion-body">
                        <p>
                                <strong>First Name :</strong> {firstName}{" "}
                            </p>
                            <p>
                                <strong>Last Name :</strong> {lastName}{" "}
                            </p>
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Passport Size Photo</label>
                                <input class="form-control form-control-sm" type="file" id="formFile" />
                            </div>
                            <div class="mb-3">
                                <label for="formFileMultiple" class="form-label">Identification</label>
                                <input class="form-control form-control-sm" type="file" id="formFileMultiple" multiple />
                            </div>
                            <div class="mb-3">
                                <label for="formFileSm" class="form-label">Passport</label>
                                <input class="form-control form-control-sm" id="formFileSm" type="file" />
                            </div>
                            <div>
                                <label for="formFileLg" class="form-label">Visa</label>
                                <input class="form-control form-control-sm" id="formFileLg" type="file" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Card style={{ marginTop: 100, textAlign: "left" }}>
                <Card.Body>
                    <div
                        style={{ display: "flex", justifyContent: "space-around", flexDirection: "column", gap: '1rem' }}
                    >
                        <button
                            className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
                            onClick={prevStep}
                        >
                            <i className="icon-arrow-left text-20 mr-10" />
                            Previous
                        </button>
                        <button
                            className="mainSearch__submit button -dark-1 py-15 px-35 h-60 col-12 rounded-4 bg-yellow-1 text-dark-1"
                            onClick={submitFormData}
                        >
                            Next
                            <i className="icon-arrow-right text-20 ml-10" />
                        </button>
                    </div>
                </Card.Body>

            </Card>
        </>
    );
};

export default StepUploadDoc;