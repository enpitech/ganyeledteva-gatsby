/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { navigate } from 'gatsby-link';
import { SubmitBtn, FullName, Email, Phone, TextBox } from '../../Inputs';
import SuccessAlert from '../../Alerts/SuccessAlert';

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

function getAgeInSep(date) {
  const currentDate = new Date();
  let nextSeptYear = currentDate.getFullYear();
  if (currentDate.getMonth() >= 9 && currentDate.getMonth() <= 12) {
    nextSeptYear += 1;
  }
  const diff = new Date(`09/01/${nextSeptYear}`) - new Date(date);

  const precentAge = diff / 1000 / 60 / 60 / 24 / 365;
  const years = Math.floor(precentAge);
  const months = (precentAge - years) * 12;

  return `${years}.${Math.floor(months)}`;
}

export default function SignupForm() {
  const [formValues, setFormValues] = useState({});
  const [formSent, setFormSent] = useState(false);
  const formRef = useRef(null);

  const handleInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...formValues,
        age_in_sept: getAgeInSep(formValues.date_of_birth),
      }),
    }).catch();

    setFormSent(true);
  };

  return (
    <>
      <SuccessAlert
        open={formSent}
        title="הטופס נשלח בהצלחה 🎉"
        content="מחכה לכם תשובה מאיתנו במייל שלכם"
        onClose={() => {
          setFormSent(false);
        }}
        actionText="חזרה לדף הבית"
        actionOnClick={() => navigate('/')}
      />
      <form
        className="space-y-8"
        name="signup"
        method="post"
        // action="/signup/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
        ref={formRef}
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
            <div className="space-y-6 sm:space-y-5">
              <RegistrationForm handleInputChange={handleInputChange} />
            </div>
          </div>
        </div>

        <SubmitBtn label="תרשמו אותי!" onSubmit={handleSubmit} />
      </form>
    </>
  );
}

function RegistrationForm({ handleInputChange }) {
  return (
    <>
      <FullName label="שם מלא של ההורה" onChange={handleInputChange} required />

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
            required
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
            required
          />
        </div>
      </div>
      <p hidden>
        <label>
          Age In September: <input name="age_in_sept" />
        </label>
      </p>

      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
        <legend className="block text-sm font-medium text-gray-700">
          ילד או ילדה?
        </legend>
        <fieldset className="sm:col-span-2">
          <div className="mt-4 grid grid-cols-1 gap-y-4">
            <div className="flex items-center">
              <input
                id="male"
                name="child_gender"
                type="radio"
                value="ילד"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                onChange={handleInputChange}
                required
              />
              <label htmlFor="male" className="mr-3">
                <span className="block text-sm text-gray-700">ילד</span>
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="female"
                name="child_gender"
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

      <Email onChange={handleInputChange} required />

      <Phone onChange={handleInputChange} required />

      <TextBox
        label="ספרו לנו על האופן בו אתם תופסים את תפקיד הגן בחיי הילדים ואת מערכת היחסים בין הבית לגן"
        onChange={handleInputChange}
        fieldName="thoughts_about_education"
        required
      />

      <TextBox
        label="ספרו לנו מי אתם ואיך נוכל לעזור לכם"
        onChange={handleInputChange}
        fieldName="who_are_you"
        required
      />
    </>
  );
}
