import Link from 'next/link';

const TopBreadCrumb = ({title}) => {
  return (
    <section className="py-4 d-flex items-center bg-light-2">
      <div className="container">
        <div className="row y-gap-2 items-center justify-between">
          <div className="col-auto">
            <div className="row x-gap-10 y-gap-5 items-center text-12 text-light-1">
              <div className="col-auto">
                <Link href={{pathname: '/'}} className="link-opacity-10">
                  Home
                </Link>
              </div>
              {/* End .col-auto */}
              <div className="col-auto">&gt;</div>
              {/* End .col-auto */}
              <div className="col-auto">            
                <Link href={{pathname: '/packages/package-list'}} className="link-opacity-10">
                  Packages
                </Link>
              </div>
              {/* End .col-auto */}
              <div className="col-auto">&gt;</div>
              {/* End .col-auto */}
              <div className="col-auto">
                <div className="text-dark-1">
                  {title}
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
          {/* End .col-auto */}

          <div className="col-auto">
            <Link href={{pathname: '/packages/package-list'}} className="link-opacity-10 text-12">
                All Packages
            </Link>
          </div>
          {/* End col-auto */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
};

export default TopBreadCrumb;
