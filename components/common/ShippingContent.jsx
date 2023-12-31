const ShippingContent = () => {
    return (
        <div className="row y-gap-30">
            <div className="col-lg-2"></div>
            <div className="col-lg-8">
                <div class='compalinace-page'>
                    <div class='header-conatiner'>
                        <div class='merchant-logo'>
                            <div class='logo-container'><div class='logo-text'>S</div></div>
                        </div>
                        <p class='header-text'>Sunflower Tour &amp; Travels</p>
                    </div>
                    <div class='compalinace-content'>
                        <div class='content-container'>
                            <p class='content-head'>Shipping &amp; Delivery Policy</p>
                            <div class='content-seprater'></div>
                            <p class='updated-date'>Last updated on Dec 31st 2023</p>


                            <p class='content-text'>Shipping is not applicable for business.</p>
                        </div>
                    </div>
                </div>
                {/* End  General Terms of Use */}
            </div>
            <div className="col-lg-2"></div>
            {/* End col-lg-9 */}
        </div>
    );
};

export default ShippingContent;
