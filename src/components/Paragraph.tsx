import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toggle/style.css';
import { DeleteIcon } from 'assets/svg';
import { useState } from 'react';
import { AppContextType, IForm } from '../@types/app';
import { useAppContext } from 'contexts/AppContext';

export default function Paragraph({ props, formType }: { props?: IForm, formType?: string }): JSX.Element {
  const [show, setShow] = useState<boolean>(true);
  const initialValues = {
    question: '',
    type: 'paragraph',
  };

  const { profile, setPersonalTypes, setCustomisedTypes, setProfileTypes,
    setCustomisedQuestions, setProfile, personalInformation, setPersonalInformation } = useAppContext() as AppContextType;

  const validationSchema = Yup.object().shape({
    question: Yup.string().required('Please enter question'),
  });

  const { values, handleSubmit, handleChange, handleBlur, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      setShow(false);

      if (formType && formType === 'profile') {
        setProfileTypes && setProfileTypes(current => [...current, values?.type?.toLowerCase()])
        const profileQuestions = profile?.profileQuestions || [];
        profileQuestions.push(values)
        const data = {
          ...props, profileQuestions
        }
        setProfile && setProfile(data)
      } else if (formType && formType === 'personal information') {
        setPersonalTypes && setPersonalTypes(current => [...current, values?.type?.toLowerCase()])
        const personalQuestions = personalInformation?.personalQuestions || [];
        personalQuestions.push(values)
        const data = {
          ...props, personalQuestions
        }
        setPersonalInformation && setPersonalInformation(data)
      } else {
        setCustomisedTypes && setCustomisedTypes(current => [...current, values?.type?.toLowerCase()])
        setCustomisedQuestions && setCustomisedQuestions(current => [...current, values])
      }
    },
  });

  return (
    <>
      {show && (
        <Wrapper>
          <form
            onSubmit={handleSubmit}
            className="flex j-space-between align-center"
          >
            <div className="input_wrap">
              <div>
                <label className="capitalize">Question</label>
              </div>

              <div className="align-center">
                <span className="relative">
                  <input
                    className=""
                    id="question"
                    type="text"
                    name="question"
                    placeholder="Type here"
                    value={values.question}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </span>
                {errors?.question && (
                  <p className="input-error t-sm">{errors?.question}</p>
                )}
              </div>
            </div>
            <div className="flex w-100 j-space-between align-center">
              <div className="flex align-center cursor-pointer">
                <DeleteIcon
                  className="delete-icon"
                  onClick={() => setShow(false)}
                />
                <p className="input-error text_semibold t-sm">
                  Delete question
                </p>
              </div>
              <button type="submit" className="t-sm">
                Save
              </button>
            </div>
          </form>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div`
  width: 100%;
  
  form {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;
    margin-block: 1rem;

    label {
      font-family: PoppinsSemiBold;
    }

    .input_wrap {
      width: 100%;
    }

    input {
      outline: none;
      padding-block: 0;
      width: 100%;

      &::placeholder {
        font-size: 0.6rem;
      }
    }

    .input-error {
      color: ${props => props.theme.red};
    }

    .flex {
      gap: 0.2rem;
    }

    button {
      display: flex;
      align-self: flex-end;
      outline: none;
      border: none;
      height: 1.6rem;
      padding-inline: 0.5rem;
      color: white;
      align-items: center;
      justify-content: center;
      background: #087b2f;
    }
  }

  .delete-icon {
    width: 1rem;
    height: 1rem;
  }
`;
