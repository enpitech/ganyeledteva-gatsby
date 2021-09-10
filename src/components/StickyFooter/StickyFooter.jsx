import React from 'react';
import { SpeakerphoneIcon, XIcon } from '@heroicons/react/outline';

export default function StickyFooter({
  actionText,
  actionLink,
  onClose,
  text,
  mobileText,
}) {
  return (
    <>
      {/*
        Make sure you add some bottom padding to pages that include a sticky banner like this to prevent
        your content from being obscured when the user scrolls to the bottom of the page.
      */}
      <div className="fixed inset-x-0 bottom-8 md:bottom-0">
        <div className="bg-indigo-600">
          <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between flex-wrap">
              <div className="w-10 md:w-0 flex-1 flex items-center">
                <p className="mx-auto md:mx-0 md:ml-3 font-medium text-white truncate">
                  {mobileText ? (
                    <span className="md:hidden">{mobileText}</span>
                  ) : null}
                  <span className="hidden md:inline">{text}</span>
                </p>
              </div>
              <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
                <a
                  href={actionLink}
                  className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50"
                >
                  {actionText}
                </a>
              </div>
              {onClose ? (
                <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                  <button
                    type="button"
                    className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                    onClick={onClose}
                  >
                    <span className="sr-only">סגור</span>
                    <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
