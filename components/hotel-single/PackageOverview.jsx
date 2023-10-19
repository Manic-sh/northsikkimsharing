import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Overview from "@/components/hotel-single/Overview";
import PopularFacilities from "@/components/hotel-single/PopularFacilities";

const PackageOverview = (packageDetail) => {
    
    return (
        <>

            <Tabs
                defaultActiveKey="itenary"
                id="fill-tab-example"
                className="mb-3"
                fill

            >
                <Tab eventKey="itenary" title="Itenary">
                    Enjoy the cool breeze with intermittent rain showers in Goa. Explore secluded beaches with lush greens, visit architectural gems and grab off-season discounts!
                </Tab>
                <Tab eventKey="policy" title="Policy">
                    These are non-refundable amounts as per the current components attached. In the case of component change/modifications, the policy will change accordingly.
                    Please check the exact cancellation and date change policy on the review page before proceeding further.
                    Please note, TCS once collected cannot be refunded in case of any cancellation / modification. You can claim the TCS amount as adjustment against Income Tax payable at the time of filing the return of income.
                    Cancellation charges shown is exclusive of all taxes and taxes will be added as per applicable.
                </Tab>
                <Tab eventKey="overview" title="Overview">
                    <div id="overview" className="row pt-40 ">
                        <div className="col-12">
                            <PackageOverview />
                            <Overview description={packageDetail?.data?.description} />

                        </div>
                        {/* End col-12 */}

                        <div className="col-12">
                            <h3 className="text-22 fw-500 pt-40 border-top-light">
                                Package Facilities
                            </h3>
                            <div className="row y-gap-10 pt-20">
                                <PopularFacilities />
                            </div>
                        </div>
                        {/* End .col-12  */}
                    </div>
                </Tab>
            </Tabs>
        </>
    );
};

export default PackageOverview;
