import styled from 'styled-components';
import { CoverImageFilled, PageWrapper, PersonalInformationFilled, ProfileFilled, AdditionalQuestionsFilled } from 'components';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";


export default function Dashboard(): JSX.Element {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // grabs live data
    const db = getDatabase();
    const starCountRef = ref(db, 'form/' + '560cdd979f73');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      setData(data)
    });

  }, [])

  return (
    <PageWrapper>
      <Page>
        <CoverImageFilled image={data?.attributes?.attributes?.coverImage} />
        <PersonalInformationFilled data={data?.attributes?.attributes?.personalInformation} />
        <ProfileFilled data={data?.attributes?.attributes?.profile} />
        <AdditionalQuestionsFilled data={data?.attributes?.attributes?.customizedQuestions} />
      </Page>
    </PageWrapper>
  );
}


const Page = styled.div`
  
`;


