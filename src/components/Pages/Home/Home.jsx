import React from 'react';
import Page from '../../Page/Page';
import HomeHeader from './HomeHeader';

export default function Home() {
  return (
    <Page>
      <Page.Header>
        <HomeHeader />
      </Page.Header>
      <Page.Main>
        <div>דף הבית</div>
      </Page.Main>
    </Page>
  );
}
