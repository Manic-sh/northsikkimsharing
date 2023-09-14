"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem
} from "react-pro-sidebar";

import Social from "../common/social/Social";
import ContactInfo from "./ContactInfo";

const MobileMenu = () => {
  const router = useRouter();

  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
        <Link href="/">
          <img src="/img/general/logo.svg" alt="brand" />
        </Link>
        {/* End logo */}

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="icon icon-close"></i>
        </div>
        {/* icon close */}
      </div>
      {/* End pro-header */}

      <ProSidebarProvider>
        <Sidebar width="400" backgroundColor="#0d2857">
          <Menu>
          <MenuItem
              component={
                <Link
                  href="/"
                  className={
                    router.pathname === "/" ? "menu-active-link" : ""
                  }
                />
              }
            >
              Home
            </MenuItem>
            {/* End  All Home Menu */}
            <MenuItem
              component={
                <Link
                  href="/packages"
                  className={
                    router.pathname === "/packages" ? "menu-active-link" : ""
                  }
                />
              }
            >
              Packages
            </MenuItem>
            <MenuItem
              component={
                <Link
                  href="/destinations"
                  className={
                    router.pathname === "/destinations"
                      ? "menu-active-link"
                      : ""
                  }
                />
              }
            >
              Desitinations
            </MenuItem>
            {/* End  Desitinations Menu */}

            <MenuItem
              component={
                <Link
                  href="/sights"
                  className={
                    router.pathname === "/sights"
                      ? "menu-active-link"
                      : ""
                  }
                />
              }
            >
              Sights
            </MenuItem>

            {/* <SubMenu label="Dashboard">
              {dashboardItems.map((item, i) => (
                <MenuItem
                  key={i}
                  component={
                    <Link
                      href={item.routePath}
                      className={
                        isActiveLink(item.routePath, router.asPath)
                          ? "menu-active-link"
                          : ""
                      }
                    />
                  }
                >
                  {item.name}
                </MenuItem>
              ))}
            </SubMenu> */}
            {/* End  All Dashboard Menu */}

            <MenuItem
              component={
                <Link
                  href="/contact"
                  className={
                    router.pathname === "/contact" ? "menu-active-link" : ""
                  }
                />
              }
            >
              Contact
            </MenuItem>
            {/* End Contact  Menu */}
          </Menu>
        </Sidebar>
      </ProSidebarProvider>

      <div className="mobile-footer px-20 py-5 border-top-light"></div>

      <div className="pro-footer">
        <ContactInfo />
        <div className="mt-10">
          <h5 className="text-16 fw-500 mb-10">Follow us on social media</h5>
          <div className="d-flex x-gap-20 items-center">
            <Social />
          </div>
        </div>
      </div>
      {/* End pro-footer */}
    </>
  );
};

export default MobileMenu;
