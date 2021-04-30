import React from 'react';
import Page from '../../Page/Page';
import PageHeader from '../../Page/PageHeader';

function Gan() {
  return (
    <Page>
      <Page.Header>
        <PageHeader
          title="גן ילדי הטבע הדמוקרטי"
          subtitle="גן ילדי הטבע הוקם בשנת 2009 בשכונת נחלת יצחק מתוך חזון של יצירת שינוי תפיסת תפקיד הגן בחייהם של הילדים והילדות עד גיל 3. הגן הציב לעצמו מטרה - לעמוד בסטנדרטים הגבוהים ביותר של חינוך לגילאי לידה עד 3, ושואף להציע מרחב חינוכי מתקדם צעיר אינטיליגנטי ורגיש. שעות הפעילות בגן שלנו: א'-ה' 7:30-16:30 ימי שישי לסירוגין 7:45-11:45"
          backgroundColorClass="bg-gradient-to-r from-blue-300 to-green-400"
          backgroundPatternClass="bg-patt1"
        />
      </Page.Header>
      <Page.Main>
        <div>תוכן העמוד</div>
      </Page.Main>
    </Page>
  );
}

export default Gan;
