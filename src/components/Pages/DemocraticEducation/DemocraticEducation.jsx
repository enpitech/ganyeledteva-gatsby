import React from 'react';
import Page from '../../Page/Page';
import PageHeader from '../../Page/PageHeader';

function DemocraticEducation() {
  return (
    <Page>
      <Page.Header>
        <PageHeader
          title="הגישה הדמוקרטית"
          subtitle="החינוך הדמוקרטי הינו זרם שהתפתח בישראל לקראת שנות ה-80 ומתבסס על ההנחה כי אנו אנשים שונים עם צרכים שונים, וכי לכל איש ואישה הדרך והשפה שלהם."
          backgroundColorClass="bg-gradient-to-r from-green-300 to-blue-400"
          backgroundPatternClass="bg-patt2"
        />
      </Page.Header>
      <Page.Main>
        <div>תוכן העמוד</div>
      </Page.Main>
    </Page>
  );
}

export default DemocraticEducation;
