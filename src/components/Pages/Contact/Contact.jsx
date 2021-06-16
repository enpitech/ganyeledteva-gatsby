import React, { useState } from 'react';
import Page from '../../Page/Page';
import PageHeader from '../../Page/PageHeader';
import ContactForm from './ContactForm';

import ReasonBtn from './ReasonBtn';

export default function Contact() {
  const [formType, setFormType] = useState(1);

  return (
    <Page>
      <Page.Header>
        <PageHeader
          title={'צור קשר'}
          subtitle={'צור איתנו קשר'}
          backgroundColorClass="bg-gradient-to-r from-blue-gan-page-header1 to-blue-gan-page-header2"
          backgroundPatternClass="bg-patt1"
        />
      </Page.Header>
      <Page.Main className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
        {formType ? null : (
          <h2 className="text-4xl font-extrabold text-black text-center sm:text-5xl sm:tracking-tight lg:text-2xl mb-6">
            למה אתם כאן?
          </h2>
        )}
        <div className="flex flex-col md:flex-row justify-between h-96 md:h-36">
          <ReasonBtn
            active={formType === 1}
            content="אני רוצה להרשם לגן"
            onClick={() => setFormType(1)}
          />
          <ReasonBtn
            active={formType === 2}
            content="בא לי לעבוד אתכם"
            onClick={() => setFormType(2)}
          />
          <ReasonBtn
            active={formType === 3}
            content="שמעתי על המוצרים שלכם"
            onClick={() => setFormType(3)}
          />
        </div>

        {!formType ? null : <ContactForm formType={formType} />}
      </Page.Main>
    </Page>
  );
}
