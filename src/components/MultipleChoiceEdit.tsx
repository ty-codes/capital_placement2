import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'react-toggle/style.css';
import { DeleteIcon, ListIcon } from 'assets/svg';
import { useState } from 'react';
import { AppContextType, IQuestion } from '../@types/app';
import { useAppContext } from 'contexts/AppContext';


export default function MultipleChoiceEdit({ data, formType, setShowQuestion }: { setShowQuestion: React.Dispatch<React.SetStateAction<boolean>>, data?: IQuestion, formType?: string }
): JSX.Element {
  const [show, setShow] = useState<boolean>(true);
  const { profile, setPersonalTypes, setCustomisedTypes, setProfileTypes, personalInformation, customizedQuestions } = useAppContext() as AppContextType;

  const initialValues = {
    choices: data?.choices,
    question: data?.question,
    type: 'multiple choice',
    other: data?.other,
    maxChoice: data?.maxChoice,
    id: data?.id
  };

  const validationSchema = Yup.object().shape({
    question: Yup.string().required('Please enter question'),
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

      const { question, type, other, maxChoice, id } = values;
      values = { question, type, choices: data?.choices, other, maxChoice, id };
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
                <label className="capitalize t-sm">Question</label>
              </div>

              <div className="align-center">
                <span className="relative">
                  <input
                    className="t-sm"
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

            <div className="choices align-center">
              {values?.choices?.map((choice: string, id: number) => (
                <>
                  <div className="choice-wrapper flex">
                    <ListIcon />
                    <div className='w-100'>
                      <p className="t-sm">Choice</p>
                      <input type="text" className='t-sm' defaultValue={choice} readOnly />
                    </div>
                  </div>
                </>
              ))}
              {/* // {
              //   <>
              //     <div className="choice-wrapper flex">
              //       <ListIcon />
              //       <div className='w-100'>
              //         <p className="t-sm">Choice</p>
              //         <input type="text" value={choice} onChange={e => setChoice(e.target.value)} />
              //       </div>
              //       <PlusIcon
              //         onClick={() => {
              //           setChoices([...choices, choice]);
              //           setChoice('');
              //         }}
              //       />
              //     </div>
              //   </>
              // } */}
            </div>

            <div className='flex'>
              <input type='checkbox' checked={values.other} onChange={handleChange}
                name="other"
                id="other" />
              <p className='t-sm'>Enable 'other' option</p>
            </div>

            <div className="input_wrap">
              <div>
                <label className="capitalize t-sm">Max choice allowed</label>
              </div>

              <div className="align-center">
                <span className="relative">
                  <input
                    className="t-sm"
                    id="maxChoice"
                    type="number"
                    name="maxChoice"
                    value={values.maxChoice}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </span>
                {errors?.maxChoice && (
                  <p className="input-error t-sm">{errors?.maxChoice}</p>
                )}
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

  .choices {
    display: flex;
    flex-direction: column;
    width: 100%;

    p {
      text-align: left;
    }

    .choice-wrapper {
      width: 100%;
      gap: 0.3rem;
      align-items: center;
      margin-bottom: 1rem;

      svg {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
  }
`;
