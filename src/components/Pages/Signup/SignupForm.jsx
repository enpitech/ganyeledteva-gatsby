/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { navigate } from 'gatsby-link';
import moment from 'moment';
import { SubmitBtn, FullName, Email, Phone, TextBox } from '../../Inputs';
import SuccessAlert from '../../Alerts/SuccessAlert';
import ErrorAlert from '../../Alerts/ErrorAlert';

function encode(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');
}

function getAgeInSepInMonths(date) {
  const currentDate = new Date();

  const currentMonth = currentDate.getMonth() + 1; // date months are 0 based
  let nextSeptYear = currentDate.getFullYear();
  if (currentMonth >= 9 && currentMonth <= 12) {
    nextSeptYear += 1;
  }

  const diff = new Date(`09/01/${nextSeptYear}`) - new Date(date);

  const precentAge = diff / 1000 / 60 / 60 / 24 / 365;
  const years = Math.floor(precentAge);
  const months = (precentAge - years) * 12;

  return years * 12 + Math.floor(months);
}

export default function SignupForm() {
  const [formValues, setFormValues] = useState({});
  const [formSent, setFormSent] = useState(false);
  const [error, setError] = useState();
  const formRef = useRef(null);

  const handleInputChange = ({ target }) => {
    setFormValues({ ...formValues, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;

    const dateOfBirthDay = document.getElementsByName('day')[0].value;
    const dateOfBirthMonth = document.getElementsByName('month')[0].value;
    const dateOfBirthYear = document.getElementsByName('year')[0].value;

    const dateOfBirth = `${dateOfBirthDay}/${dateOfBirthMonth}/${dateOfBirthYear}`;
    if (!moment(dateOfBirth, 'DD/MM/YYYY', true).isValid()) {
      setError({
        title: 'התאריך שהכנסתם לא טוב',
        content: 'שימו לב שהתאריך לידה בפורמט וטווח תקינים',
      });
      return;
    }

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...formValues,
        age_in_sept: getAgeInSepInMonths(
          `${dateOfBirthMonth}/${dateOfBirthDay}/${dateOfBirthYear}`
        ),
        date_of_birth: dateOfBirth,
      }),
    }).catch();

    setFormSent(true);
  };

  return (
    <>
      <ErrorAlert
        open={!!error}
        title={error && error.title}
        content={error && error.content}
        onClose={() => {
          setError(false);
        }}
        actionText="הבנתי"
        actionOnClick={() => setError(false)}
      />
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
        id="signup"
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

        <div className="w-1/3 mx-auto">
          <SubmitBtn label="שלח" onSubmit={handleSubmit} />
        </div>
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
          <span>
            <select name="year">
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
              <option value="2019">2019</option>
              <option value="2018">2018</option>
              <option value="2017">2017</option>
            </select>
          </span>

          <span>
            <select name="month">
              <option value="01">ינואר</option>
              <option value="02">פברואר</option>
              <option value="03">מרץ</option>
              <option value="04">אפריל</option>
              <option value="05">מאי</option>
              <option value="06">יוני</option>
              <option value="07">יולי</option>
              <option value="08">אוגוסט</option>
              <option value="09">ספטמבר</option>
              <option value="10">אוקטובר</option>
              <option value="11">נובמבר</option>
              <option value="12">דצמבר</option>
            </select>
          </span>

          <span>
            <select name="day">
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
          </span>
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
        label="ספרו לנו מי אתם ואיך נוכל לעזור לכם"
        onChange={handleInputChange}
        fieldName="who_are_you"
      />
      <TextBox
        label="ספרו לנו על האופן בו אתם תופסים את תפקיד הגן בחיי הילדים ואת מערכת היחסים בין הבית לגן"
        onChange={handleInputChange}
        fieldName="thoughts_about_education"
      />
    </>
  );
}
