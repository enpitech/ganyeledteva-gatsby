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
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import Logo from "../components/Logo/Logo";
import favicon from "~static/logos/favicon.png";

const navigation = [
  { name: "דף הבית", href: "/" },
  { name: "הגישה הדמוקרטית", href: "/democraticeducation" },
  { name: "הגן", href: "/gan" },
  {
    name: "חדשנות חינוכית לגיל הרך",
    href: "/democratic-center",
  },
  { name: "העדכון השבועי", href: "/weekly-update" },
  { name: "רישום לגן", href: "/signup" },
];

export default function MainLayout({ children }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <meta name="description" content={config.siteDescription} />
        <html lang="he" dir="rtl" />
        <link rel="icon" href={favicon} />
      </Helmet>
      <Disclosure as="nav" className="bg-white shadow-sm">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-row-reverse sm:flex-row justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Logo className="h-12 ml-4 w-auto my-auto" alt="navLogo" />
                  </div>
                  <div className="hidden sm:-my-px sm:ms-6 sm:flex sm:space-x-8">
                    {navigation.map((item, index) => {
                      const isActive = item.href === location.pathname;

                      return (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            isActive
                              ? "border-indigo-500 text-gray-900"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                            "inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium",
                            index === 0 ? "ml-5" : ""
                          )}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      );
                    })}
                  </div>
                </div>
                <div className="text-sm my-auto hidden sm:flex flex-row">
                  <EnquireNavButton
                    title="פייסבוק"
                    bgColor="bg-blue-fb"
                    linkTo="https://www.facebook.com/yaldeyhateva/"
                    target="_blank"
                  >
                    <FBIcon />
                  </EnquireNavButton>
                  <EnquireNavButton
                    title="צור קשר"
                    bgColor="bg-red-link"
                    linkTo="/contact"
                  >
                    <PhoneIcon />
                  </EnquireNavButton>
                </div>

                <div className="-mr-2 flex items-center sm:hidden">
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

            <Disclosure.Panel className="sm:hidden">
              <div className="pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
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

      <div className="pb-10 ">{children}</div>
      <Footer config={config} navigation={navigation} />
    </div>
  );
}

const EnquireNavButton = ({ title, linkTo, bgColor, target, children }) => (
  <a
    className={`m-2 rounded py-2 px-3 text-white inline-block flex flex-row ${bgColor}`}
    href={linkTo}
    target={target}
  >
    <div className="ml-2">{children}</div>
    {title}
  </a>
);

const FBIcon = () => <FontAwesomeIcon icon={faFacebookF} />;
const PhoneIcon = () => <FontAwesomeIcon icon={faPhone} />;
