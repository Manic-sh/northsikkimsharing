import dynamic from "next/dynamic";
import CallToActions from "../../components/common/CallToActions";
import Seo from "../../components/common/Seo";
import Header2 from "../../components/header/header-2";
import Footer2 from "../../components/footer/footer-2";
import RefundPolicyContent from "../../components/common/RefundPolicyContent";

const CancellationPolicy = () => {
  return (
    <>
      <Seo pageTitle="Terms & Conditions" />
      {/* End Page Title */}

      <div className="header-margin"></div>
      {/* header top margin */}

      <Header2 />
      {/* End Header 1 */}

      <section className="layout-pt-lg layout-pb-lg">
        <div className="container">
          <div className="tabs js-tabs">
            <RefundPolicyContent />
          </div>
        </div>
      </section>
      {/* End terms section */}

      <CallToActions />
      {/* End Call To Actions Section */}

      <Footer2 />
      {/* End Call To Actions Section */}
    </>
  );
};

export default dynamic(() => Promise.resolve(CancellationPolicy), { ssr: false });
