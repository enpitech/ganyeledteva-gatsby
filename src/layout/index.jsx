import React from "react";
import { Helmet } from "react-helmet";
import "./index.css";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useLocation } from "@reach/router";
import config from "../../data/SiteConfig";
import { classNames } from "../utils";
import Footer from "../components/Footer/Footer";

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
      </Helmet>
      <Disclosure as="nav" className="bg-white shadow-sm">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-row-reverse sm:flex-row justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    />
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
                <div className="hidden sm:block my-auto">
                  <Button
                    title="פייסבוק"
                    bgColor="bg-blue-fb"
                    linkTo="https://www.facebook.com/yaldeyhateva/"
                    target="_blank"
                  />
                  <Button
                    title="צור קשר"
                    bgColor="bg-red-link"
                    linkTo="/contact"
                  />
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
      <Footer config={config} />
    </div>
  );
}

const Button = ({ title, linkTo, bgColor, target }) => (
  <div>
    <a
      className={`m-2 rounded py-2 px-3 text-white inline-block flex flex-row ${bgColor}`}
      href={linkTo}
      target={target}
    >
      <div className="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
      </div>
      {title}
    </a>
  </div>
);
