import Seo from "../../../components/common/Seo";
import Sidebar from "../common/Sidebar";
import Header from "../../../components/header/dashboard-header";
import Footer from "../common/Footer";
import RatesTable from "./components/RatesTable";
import Button from 'react-bootstrap/Button';

const index = () => {
  return (
    <>
      <Seo pageTitle="Dashboard" />
      {/* End Page Title */}

      <div className="header-margin"></div>

      <Header />
      {/* End dashboard-header */}

      <div className="dashboard">
        <div className="dashboard__sidebar bg-white scroll-bar-1">
          <Sidebar />
          {/* End sidebar */}
        </div>
        {/* End dashboard__sidebar */}

        <div className="dashboard__main">
          <div className="dashboard__content bg-light-2">
            <div className="row y-gap-10 justify-between items-end pb-10 lg:pb-10 md:pb-32">
              <div className="col-8">
                <h1 className="text-30 lh-14 fw-600">Inventory and Price</h1>
                <div className="text-15 text-light-1">
                  Lorem ipsum dolor sit amet, consectetur.
                </div>
              </div>
              <div className="col-4">
              <Button variant="primary">
                Bulk Update
              </Button>

              </div>
              {/* End .col-8 */}
            </div>
            {/* End .row */}

            <div className="row y-gap-10 pt-10 chart_responsive">
              {/* End .col */}
              <div className="col-xl-5 col-md-6">
                <RatesTable />
              </div>
              {/* End .col */}
            </div>
            {/* End .row */}
            <Footer />
          </div>
          {/* End .dashboard__content */}
        </div>
        {/* End dashbaord content */}
      </div>
      {/* End dashbaord content */}
    </>
  );
};

export default index;
