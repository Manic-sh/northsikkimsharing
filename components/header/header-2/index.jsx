import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

import MobileMenu from "../MobileMenu";

const Header = ({ destinations }) => {
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);

  const isHomepage = router.pathname === '/';

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
  }, []);

  return (
    <>
      <header className={`header ${navbar ? "bg-dark-1 is-sticky" : isHomepage ? '' : 'bg-dark-1'}`}>
        <div className="header__container container">
          <div className="row justify-between items-center sm:w-100 sm:mr-0 sm:ml-0">
            <div className="col-auto mobile-col w-100 sm:pr-0 sm:pl-0">
              <div className="d-flex items-center justify-content-between ">
                <Link href="/" className="header-logo mr-20">
                  <img src="/img/general/logo.svg" alt="logo icon" />
                  <img src="/img/general/logo.svg" alt="logo icon" />
                </Link>
                {/* End logo */}
                <div className="mr-20 d-flex items-center ml-auto">
                  <div className="mr-15 d-none md:d-flex">
                    <Link
                      href="/others-pages/login"
                      className="icon-user text-inherit text-22 text-white"
                    />
                  </div>
                  {/* End mobile menu icon */}

                  <button
                    className="d-flex items-center icon-menu text-white text-20"
                    data-bs-toggle="offcanvas"
                    aria-controls="mobile-sidebar_menu"
                    data-bs-target="#mobile-sidebar_menu"
                  ></button>
                  {/* Start mobile menu icon */}

                  <div
                    className="offcanvas offcanvas-start  mobile_menu-contnet"
                    tabIndex="-1"
                    id="mobile-sidebar_menu"
                    aria-labelledby="offcanvasMenuLabel"
                    data-bs-scroll="true"
                    style={{ backgroundColor: '#051036', color: '#fff' }}
                  >
                    <MobileMenu />
                    {/* End MobileMenu */}
                  </div>
                </div>
                {/* End mobile humberger menu */}



                {/* <div className="relative xl:d-none">
                  <LocationSearch destinations={destinations} />
                </div> */}
                {/* End Search box */}
              </div>
              {/* End d-flex */}
            </div>
            {/* End col */}

            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="row x-gap-20 items-center xxl:d-none">
                  {/* <CurrenctyMegaMenu textClass="text-white" /> */}
                  {/* End Megamenu for Currencty */}

                  {/* Start vertical devider*/}
                  {/* <div className="col-auto">
                    <div className="w-1 h-20 bg-white-20" />
                  </div> */}
                  {/* End vertical devider*/}

                  {/* <LanguageMegaMenu textClass="text-white" /> */}
                  {/* End Megamenu for Language */}
                </div>
              </div>
            </div>
            {/* End col-auto */}
          </div>
          {/* End .row */}
        </div>
        {/* End header_container */}
      </header>
    </>
  );
};

export default Header;
