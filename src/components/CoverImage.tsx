import styled from "styled-components";
import Dropzone from 'react-dropzone';
import { useState } from "react";
import { UploadIcon } from "assets/svg";


export default function CoverImage(): JSX.Element {
  const [error, setError] = useState<string>('');

  return (
    <Wrapper>
      <Header>
        <h3>Upload cover image</h3>
      </Header>
      <Form>
        <Dropzone onDrop={files => console.log(files)}
          onDragOver={() => {
            var element = document.getElementById(`dropzone`)
            if (element) {
              element.classList.add("drag");
            }
          }}
          onDragLeave={() => {
            var element = document.getElementById(`dropzone`)
            if (element) {
              element.classList.remove("drag");
            }
          }}
          onDropAccepted={() => {
            var element = document.getElementById(`dropzone`)
            if (element) {
              element.classList.remove("drag");
            }
          }}
          onDropRejected={() => {
            setError("Something went wrong. Try again")
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="zone-wrapper" >
              <div id="dropzone" className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <UploadIcon />
                <p>Upload cover image</p>
                <p className="recommendation t-sm">16:9 ratio is recommended. Max image size is 1mb</p>
              </div>
              {error && <p className='error-msg'>{error}</p>}
            </div>
          )}
        </Dropzone>
      </Form>
    </Wrapper>
  )
};

const Wrapper = styled.div`
   margin-bottom: 2rem;
   box-shadow: 2px 4px 8px 1px #eeeeee;
   width: 29vw;
   min-width: 23rem;
   border-radius: 1rem;
`;

const Header = styled.div`
   padding: 1rem;
   font-family: PoppinsSemiBold;
   background: ${props => props.theme.headerBg};
   border-radius: 1rem 1rem 0 0;
`;

const Form = styled.div`
   padding: 2rem 1.5rem;

   .zone-wrapper {
    border: 2px dotted rgba(151, 151, 151, 0.5);
    padding: 2rem 1.5rem;

    .dropzone {
      display:flex; 
      justify-content: center;
      gap: 0.5rem;
      flex-direction: column;
      align-items: center;
    }

    p {
      font-weight: 600;

      &.recommendation {
        font-family: PoppinsExtraLight; 
        color: #979797;     
      }
    }

    svg {
      width: 1.3rem;
      height: 1.3rem;
      
    }
   }
`;

