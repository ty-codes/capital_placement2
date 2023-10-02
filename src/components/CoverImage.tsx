import styled from "styled-components";
import Dropzone from 'react-dropzone';
import { useState } from "react";
import { UploadIcon } from "assets/svg";
import { storage } from '../firebase';
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useAppContext } from "contexts/AppContext";
import { AppContextType } from "../@types/app";
import { device } from "constants/index";


export default function CoverImage(): JSX.Element {
  const [error, setError] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [progresspercent, setProgresspercent] = useState(0);

  const {setImageUri} = useAppContext() as AppContextType;

  const handleSubmit = (files: any) => {
    console.log(files)
    const file = files[0];

    if (!file) return;

    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgresspercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImgUrl(downloadURL)
        });
      }
    );
  }

  if(imgUrl) {
    console.log(imgUrl, progresspercent);
    setImageUri && setImageUri(imgUrl);
  }

  return (
    <Wrapper>
      <Header>
        <h3>Upload cover image</h3>
      </Header>
      {imgUrl 
      ? <img src={imgUrl} alt='uploaded file' className="cover-image" height={200} />
        : <>
          <Form>
            <Dropzone onDrop={(files) => { handleSubmit(files) }}
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
                  {error && <p className='input-error red t-sm'>{error}</p>}
                </div>
              )}

            </Dropzone>
          </Form>
        </>
      }
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

