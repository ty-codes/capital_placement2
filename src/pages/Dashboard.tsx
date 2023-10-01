import styled from 'styled-components';
import { AdditionalQuestions, AdditionalQuestionsWrapper, CoverImage, PageWrapper, PersonalInformation, Profile } from 'components';
import { useState } from 'react';

export default function Dashboard ():JSX.Element {

  return (
    <PageWrapper>
      <Page>
        <CoverImage />
        <PersonalInformation />
        <Profile />
        <AdditionalQuestionsWrapper />
      </Page>
    </PageWrapper>
  );
}


const Page = styled.div`
  
`;


