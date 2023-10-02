import { device } from "constants/index";
import styled from "styled-components";

export default function CoverImageFilled({image} : {image:string}): JSX.Element {

  return (
    <Wrapper>
      <Header>
        <h3>Upload cover image</h3>
      </Header>
      <img src={image} alt='uploaded file' className="cover-image" height={200} />
    </Wrapper>
  )
};

const Wrapper = styled.div`
   margin-bottom: 2rem;
   box-shadow: 2px 4px 8px 1px #eeeeee;
   width: 29vw;
   min-width: 23rem;
   border-radius: 1rem;

   @media ${device.mobileM} {
    min-width: auto;
    width: 100%;
    }

   .cover-image {
    width: 100%;
    object-fit: cover;
    object-position: center;
   }
   
`;

const Header = styled.div`
   padding: 1rem;
   font-family: PoppinsSemiBold;
   background: ${props => props.theme.headerBg};
   border-radius: 1rem 1rem 0 0;
`;


