import React from "react";
import { Helmet } from "react-helmet";
import "./index.css";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useLocation } from "@reach/router";
import config from "../../data/SiteConfig";
import { classNames } from "../utils";
import Footer from "../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF, faYoutube } from "@fortawesome/free-brands-svg-icons";
import Logo from "../components/Logo/Logo";
import favicon from "~static/logos/favicon.png";
import { useStaticQuery, graphql } from "gatsby";

export default function MainLayout({ children }) {
  const data = useStaticQuery(graphql`
    query siteConfigQuery {
      allMdx(filter: { fields: { dir: { eq: "site_config" } } }) {
        edges {
          node {
            frontmatter {
              navigation_routes {
                name
                href
              }
              nav_menu_routes_to_ignore {
                href
              }
              footer_menu_routes_to_ignore {
                href
              }
            }
          }
        }
      }
    }
  `);

  let {
    navigation_routes: routes,
    nav_menu_routes_to_ignore: navMenuIgnoredRoutes,
    footer_menu_routes_to_ignore: footerMenuIgnoredRoutes,
  } = data.allMdx.edges[0].node.frontmatter;

  const navigation = routes;

  navMenuIgnoredRoutes = navMenuIgnoredRoutes.map((item) => item.href);
  footerMenuIgnoredRoutes = footerMenuIgnoredRoutes?.map((item) => item.href);

  const navBarMenuItems = navigation.filter(
    ({ name, href }) => !navMenuIgnoredRoutes.includes(href)
  );
  const footerMenuItems = navigation.filter(
    ({ name, href }) => !footerMenuIgnoredRoutes?.includes(href)
  );

  const signupToGanNavItem = { name: "לרישום לגן", href: "/signup" };

  const mobileNavBarMenuItems = navigation.concat(signupToGanNavItem);

  const location = useLocation();

  return (
    <div className="min-h-screen">
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="he" dir="rtl" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <Disclosure as="nav" className="bg-white shadow-sm">
        {({ open }) => (
          <>
            <div className="mx-auto pr-4 pl-2 md:pxpx-4 md:px-6 lg:px-8">
              <div className="flex flex-row-reverse md:flex-row justify-between h-16 items-center">
                <div className="flex">
                  <div className="flex-shrink-0 hidden md:flex items-center">
                    <Logo className="h-12 w-auto my-auto" alt="navLogo" />
                  </div>
                  <div className="block md:hidden">
                    <EnquireNavBarButtons
                      signupToGanNavItem={signupToGanNavItem}
                    />
                  </div>

                  <div className="hidden md:-my-px md:ms-6 md:flex">
                    {navBarMenuItems.map((item) => {
                      const isActive = item.href === location.pathname;

                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            isActive
                              ? "border-purple-border text-purple-border font-bold"
                              : "border-transparent text-gray-500 hover:text-purple-border hover:border-purple-border hover:font-bold",
                            `${
                              item.name === "צור קשר"
                                ? "text-purple-border"
                                : undefined
                            } text-center inline-flex items-center px-2 pt-1 border-b-2 text-sm font-medium`
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className="hidden md:block">
                  <EnquireNavBarButtons
                    signupToGanNavItem={signupToGanNavItem}
                  />{" "}
                </div>

                <div className="-mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="sr-only">פתח תפריט ראשי</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {mobileNavBarMenuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                        : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800",
                      "block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <div>{children}</div>
      <Footer config={config} navigation={footerMenuItems} />
    </div>
  );
}

const EnquireNavButton = ({ title, linkTo, className, target, children }) => (
  <a
    className={`m-2 rounded py-2 ${
      title ? "px-3" : ""
    } text-white inline-block flex flex-row ${className}`}
    href={linkTo}
    target={target}
  >
    {children ? (
      <div className={title ? "ml-2" : "m-auto"}>{children}</div>
    ) : null}
    {title}
  </a>
);

const EnquireNavBarButtons = ({ signupToGanNavItem }) => {
  return (
    <div className="text-sm my-auto flex flex-row">
      <EnquireNavButton
        className="h-4/5 w-4"
        linkTo="https://www.instagram.com/yaldey_hateva"
        target="_blank"
      >
        <FontAwesomeIcon icon={faInstagram} className="text-black" />
      </EnquireNavButton>
      <EnquireNavButton
        className="h-4/5 w-4"
        linkTo="https://www.youtube.com/user/0542318413"
        target="_blank"
      >
        <FontAwesomeIcon icon={faYoutube} className="text-black" />
      </EnquireNavButton>
      <EnquireNavButton
        className=" h-4/5 w-4"
        linkTo="https://www.facebook.com/yaldeyhateva/"
        target="_blank"
      >
        <FontAwesomeIcon
          icon={faFacebookF}
          className="text-black"
          // style={{ color: 'black' }}
        />
      </EnquireNavButton>
      <EnquireNavButton
        title={signupToGanNavItem.name}
        className="bg-red-link"
        linkTo={signupToGanNavItem.href}
      ></EnquireNavButton>
    </div>
  );
};
