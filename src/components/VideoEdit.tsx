import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toggle/style.css';
import { DeleteIcon } from 'assets/svg';
import { useState } from 'react';
import { AppContextType, IQuestion } from '../@types/app';
import { useAppContext } from 'contexts/AppContext';

export default function VideoEdit({ data, formType, setShowQuestion }: { setShowQuestion: React.Dispatch<React.SetStateAction<boolean>>, data?: IQuestion, formType?: string }
): JSX.Element {
  const [show, setShow] = useState<boolean>(true);
  const { profile, setPersonalTypes, setCustomisedTypes, setProfileTypes,
    customizedQuestions, personalInformation } = useAppContext() as AppContextType;
  const initialValues = {
    question: data?.question,
    type: 'video',
    additionalInformation: data?.additionalInformation,
    maxTime: data?.maxTime,
    timeType: data?.timeType,
    id: data?.id
  };

  const validationSchema = Yup.object().shape({
    question: Yup.string().required('Please enter question'),
    maxTime: Yup.number().required('Please enter max time').min(1, 'Please enter a value greater than 0').typeError('Please enter a number'),
    timeType: Yup.string().required('Please select seconds/minutes'),
  });


  const deleteQuestion = () => {
    if (formType && formType === 'profile') {
      const profileQuestions = profile?.profileQuestions || [];
      let updateIndex = profileQuestions?.findIndex(el => el.id === data?.id);
      profileQuestions.splice(updateIndex, 1);
      // setProfile && profile && setProfile(profile)
      setShowQuestion(false);
    } else if (formType && formType === 'personal information') {
      const personalQuestions = personalInformation?.personalQuestions || [];
      let updateIndex = personalQuestions?.findIndex(el => el.id === data?.id);
      personalQuestions.splice(updateIndex, 1);
      setShowQuestion(false);

    } else {
      setCustomisedTypes && setCustomisedTypes(current => [...current, values?.type?.toLowerCase()])
      const customisedQuestions = customizedQuestions || [];
      let updateIndex = customisedQuestions?.findIndex(el => el.id === data?.id);
      customisedQuestions.splice(updateIndex, 1);
      setShowQuestion(false);

    }
  }


  const { values, handleSubmit, handleChange, handleBlur, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      setShow(false);

      if (formType && formType === 'profile') {
        setProfileTypes && setProfileTypes(current => [...current, values?.type?.toLowerCase()])
        const profileQuestions = profile?.profileQuestions || [];
        let updateIndex = profileQuestions?.findIndex(el => el.id === data?.id);
        profileQuestions.splice(updateIndex, 1, values);
      } else if (formType && formType === 'personal information') {
        setPersonalTypes && setPersonalTypes(current => [...current, values?.type?.toLowerCase()])
        const personalQuestions = personalInformation?.personalQuestions || [];
        let updateIndex = personalQuestions?.findIndex(el => el.id === data?.id);
        personalQuestions.splice(updateIndex, 1, values);
      } else {
        setCustomisedTypes && setCustomisedTypes(current => [...current, values?.type?.toLowerCase()])
        const customisedQuestions = customizedQuestions || [];
        let updateIndex = customisedQuestions?.findIndex(el => el.id === data?.id);
        customisedQuestions.splice(updateIndex, 1, values);
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

            <div className="input_wrap">
              <div className="align-center">
                <span className="relative">
                  <input
                    className=""
                    id="additionalInformation"
                    type="text"
                    name="additionalInformation"
                    placeholder="Additional Information"
                    value={values.additionalInformation}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </span>
                {errors?.additionalInformation && (
                  <p className="input-error t-sm">{errors?.additionalInformation}</p>
                )}
              </div>
            </div>

            <div className='input-flex'>
              <div className="input_wrap">
                <div className="align-center">
                  <span className="relative">
                    <input
                      className=""
                      id="maxTime"
                      type="text"
                      name="maxTime"
                      placeholder="Max duration of video in (sec/min)"
                      value={values.maxTime}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </span>
                  {errors?.maxTime && (
                    <p className="input-error">{errors?.maxTime}</p>
                  )}
                </div>
              </div>

              <div className="input_wrap">
                <select value={values.timeType} name='timeType' onChange={handleChange}>
                  <option value="" >Select "Seconds" or "Minutes"</option>
                  <option className="capitalize" value="seconds">
                    seconds
                  </option>
                  <option className="capitalize" value="minutes">
                    minutes
                  </option>
                </select>
              </div>
            </div>

            <div className="flex w-100 j-space-between align-center">
              <div className="flex align-center cursor-pointer">
                <DeleteIcon
                  className="delete-icon"
                  onClick={() => deleteQuestion()}
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

  .input-flex {
    display: flex;
    align-items: start;
    gap: 0.5rem;

    .input_wrap {
      width: 47%;
    }
  }
`;
