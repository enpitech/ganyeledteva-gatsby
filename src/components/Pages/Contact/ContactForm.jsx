/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { navigate } from 'gatsby-link';

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

export default function ContactForm({ formType }) {
  const [formValues, setFormValues] = useState({});

  const handleInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...formValues,
      }),
    })
      .then(() => navigate(form.getAttribute('action')))
      .catch((error) => alert(error));
  };

  const getForm = () => {
    switch (formType) {
      case 1:
        return <RegistrationForm handleInputChange={handleInputChange} />;
      case 2:
        return <WorkWithUsForm handleInputChange={handleInputChange} />;
      case 3:
        return <ServicesForm handleInputChange={handleInputChange} />;
      default:
        return null;
    }
  };

  return (
    <form
      className="space-y-8"
      name="contact"
      method="post"
      action="/contact/"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
    >
      <input type="hidden" name="form-name" value="contact" />
      <p hidden>
        <label>
          Don’t fill this out:{' '}
          <input name="bot-field" onChange={handleInputChange} />
        </label>
      </p>

      <div className="space-y-8  sm:space-y-5">
        <div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
          <div className="space-y-6 sm:space-y-5">{getForm()}</div>
        </div>
      </div>

      <SubmitBtn label="תרשמו אותי!" />
    </form>
  );
}

function RegistrationForm({ handleInputChange }) {
  return (
    <>
      <FullName label="שם מלא של ההורה" onChange={handleInputChange} />

      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="child_name"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          שם מלא של הילד/ה
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            type="text"
            name="child_name"
            id="child_name"
            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="date_of_birth"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          תאריך לידה של הילד/ה
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            type="date"
            name="date_of_birth"
            id="date_of_birth"
            autoComplete="bday"
            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <legend className="block text-sm font-medium text-gray-700">
          ילד או ילדה?
        </legend>
        <fieldset className="sm:col-span-2">
          <div className="mt-4 grid grid-cols-1 gap-y-4">
            <div className="flex items-center">
              <input
                id="male"
                name="sex"
                type="radio"
                value="ילד"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                onChange={handleInputChange}
              />
              <label htmlFor="male" className="mr-3">
                <span className="block text-sm text-gray-700">ילד</span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="female"
                name="sex"
                type="radio"
                value="ילדה"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                onChange={handleInputChange}
              />
              <label htmlFor="female" className="mr-3">
                <span className="block text-sm text-gray-700">ילדה</span>
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <Email onChange={handleInputChange} />

      <Phone onChange={handleInputChange} />

      <TextBox
        label="ספרו לנו על האופן בו אתם תופסים חינוך"
        onChange={handleInputChange}
        fieldName="thoughts_about_education"
      />
    </>
  );
}

function WorkWithUsForm({ handleInputChange }) {
  return (
    <>
      <FullName label="שם מלא" onChange={handleInputChange} />
      <Email onChange={handleInputChange} />
      <Phone onChange={handleInputChange} />

      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <label
          htmlFor="age"
          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
        >
          גיל
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            type="number"
            min={0}
            name="age"
            id="age"
            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
            onChange={handleInputChange}
          />
        </div>
      </div>

      <TextBox label="על עצמכם" onChange={handleInputChange} />
      <TextBox label="מה אתם מחפשים" onChange={handleInputChange} />
    </>
  );
}

function ServicesForm({ handleInputChange }) {
  return (
    <>
      <FullName label="שם מלא" onChange={handleInputChange} />
      <Email onChange={handleInputChange} />
      <Phone onChange={handleInputChange} />

      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <legend className="block text-sm font-medium text-gray-700">
          באיזה שירות אתם מתעניינים?
        </legend>
        <fieldset className="sm:col-span-2">
          <div className="mt-4 grid grid-cols-1 gap-y-4">
            <div className="flex items-center">
              <input
                id="managers"
                value="managers"
                name="service"
                type="radio"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                onChange={handleInputChange}
              />
              <label htmlFor="managrs" className="mr-3">
                <span className="block text-sm text-gray-700">
                  קורס מנהלות גנים
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="parents_school"
                value="parents_school"
                name="service"
                type="radio"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                onChange={handleInputChange}
              />
              <label htmlFor="parents_school" className="mr-3">
                <span className="block text-sm text-gray-700">
                  קורס בית ספר להורים
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="lectures"
                values="lectures"
                name="service"
                type="radio"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                onChange={handleInputChange}
              />
              <label htmlFor="lectures" className="mr-3">
                <span className="block text-sm text-gray-700">
                  הרצאות לארגונים
                </span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="other"
                value="other"
                name="service"
                type="radio"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                onChange={handleInputChange}
              />
              <label htmlFor="other" className="mr-3">
                <span className="block text-sm text-gray-700">אחר</span>
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <TextBox label="דברים נוספים" onChange={handleInputChange} />
    </>
  );
}

/** Forms Components */
function SubmitBtn({ label }) {
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

function FullName({ label, onChange }) {
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
        />
      </div>
    </div>
  );
}

function Email({ onChange }) {
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
        />
      </div>
    </div>
  );
}

function Phone({ onChange }) {
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
        />
      </div>
    </div>
  );
}

function TextBox({ label, onChange, fieldName }) {
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
            defaultValue={''}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
