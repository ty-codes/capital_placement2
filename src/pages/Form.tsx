import styled from 'styled-components';
import { SubmitButton, AdditionalQuestionsWrapper, CoverImage, PageWrapper, PersonalInformation, Profile } from 'components';


export default function Form ():JSX.Element {

  return (
    <PageWrapper>
      <Page>
        <CoverImage />
        <PersonalInformation />
        <Profile />
        <AdditionalQuestionsWrapper />
        <SubmitButton />
      </Page>
    </PageWrapper>
  );
}


const Page = styled.div`
  
`;


