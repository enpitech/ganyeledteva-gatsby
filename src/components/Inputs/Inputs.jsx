/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

export function SubmitBtn({ label }) {
  return (
    <div className="pt-5">
      <div className="flex justify-start">
        <button
          type="submit"
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-3xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full h-16"
        >
          {label}
        </button>
      </div>
    </div>
  );
}

export function FullName({ label, onChange, required }) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor="full_name"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        {label}
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <input
          type="text"
          name="full_name"
          id="full_name"
          autoComplete="name"
          className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
          onChange={onChange}
          required={required}
        />
      </div>
    </div>
  );
}

export function Email({ onChange, required }) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
      >
        כתובת אימייל
      </label>
      <div className="mt-1 sm:mt-0 sm:col-span-2">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}

export function Phone({ onChange, required }) {
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
      <label
        htmlFor="phone_number"
        className="block text-sm font-medium text-gray-700"
      >
        טלפון
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          type="text"
          name="phone_number"
          id="phone_number"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-16 sm:text-sm border-gray-300 rounded-md"
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
}

export function TextBox({ label, onChange, fieldName, required }) {
  return (
    <div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor={fieldName}
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          {label}
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <textarea
            id={fieldName}
            name={fieldName}
            rows={3}
            className="max-w-lg shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-md"
            defaultValue=""
            onChange={onChange}
            required={required}
          />
        </div>
      </div>
    </div>
  );
}

export default { SubmitBtn, FullName, Email, Phone, TextBox };
