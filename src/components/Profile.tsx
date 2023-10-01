import styled from 'styled-components';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FileIcon, LikeIcon } from 'assets/svg';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { AdditionalQuestions } from './AdditionalQuestions';
import { useAppContext } from 'contexts/AppContext';
import { AppContextType } from '../@types/app';

export default function Profile(): JSX.Element {
  const initialValues = {
    education: {
      show: false,
      mandatory: false,
    },
    experience: {
      show: false,
      mandatory: false,
    },
    resume: {
      show: false,
      mandatory: false,
    },
  };

  const { values, handleSubmit, handleChange, handleBlur, errors } = useFormik({
    initialValues,
    onSubmit: values => {
      console.log(values);
      // navigate("/");
    },
  });

  const { profile, profileTypes } = useAppContext() as AppContextType;

  // const ChooseFilledForm = ({ currentType, props, formType }: { currentType: string, props?: IForm, formType?: string }): JSX.Element => {
  //   const type = currentType;
  
  //   if (type === "Paragraph") {
  //     return <></>
  //   } else if (type === "Number") {
  //     return <></>
  //   } else if (type === "Short Answer") {
  //     return <></>
  //   } else if (type === "Yes/No") {
  //     return <YesNo props={props} formType={formType} />
  //   } else if (type === "Dropdown") {
  //     return <Dropdown props={props} formType={formType} />
  //   } else if (type === "Date") {
  //     return <></>
  //   } else if (type === "File Upload") {
  //     return <></>
  //   } else if (type === "Multiple Choice") {
  //     return <MultipleChoice props={props} formType={formType} />
  //   } else if (type === "Video") {
  //     return <Video props={props} formType={formType} />
  //   } else {
  //     return <></>
  //   }
  // };

  const Question = ({ question, id }: { question: string | undefined, id: number }):JSX.Element => {
    const [show, setShow] = useState(false);
    console.log(profile)
    console.log(show)
    return <>
      <div className='question' key={`question-${id}`}>
        <p>{question}</p>
        <FileIcon className='cursor-pointer' onClick={() => setShow(!show)} />
      </div>
      {show && <p>hello</p>}
    </>
  }

  return (
    <Wrapper>
      <Header>
        <h3>Profile</h3>
      </Header>
      <Form>
        <form
          onSubmit={handleSubmit}
          className="flex j-space-between align-center two-columns"
        >
          <div className="input_wrap">
            <div className="flex j-space-between align-center input">
              <label className="capitalize">education</label>
              <div className="flex">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  name="education.mandatory"
                  id="education.mandatory"
                  checked={values.education.mandatory}
                />
                <p className="t-sm">Mandatory</p>
              </div>
              <div className="flex align-center">
                <Toggle
                  defaultChecked={values.education.show}
                  onChange={handleChange}
                  aria-label="show"
                  name='education.show'
                />
                <span className="t-sm capitalize">
                  {values.education.show ? 'show' : 'hide'}
                </span>
              </div>
            </div>
          </div>

          <div className="input_wrap">
            <div className="flex j-space-between align-center input">
              <label className="capitalize">experience</label>
              <div className="flex">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  name="experience.mandatory"
                  id="experience.mandatory"
                  checked={values.experience.mandatory}
                />
                <p className="t-sm">Mandatory</p>
              </div>
              <div className="flex align-center">
                <Toggle
                  defaultChecked={values.experience.show}
                  onChange={handleChange}
                  aria-label="show"
                  name="experience.show"
                />
                <span className="t-sm capitalize">
                  {values.experience.show ? 'show' : 'hide'}
                </span>
              </div>
            </div>
          </div>

          <div className="input_wrap">
            <div className="flex j-space-between align-center input">
              <label className="capitalize">resume</label>
              <div className="flex">
                <input
                  type="checkbox"
                  onChange={handleChange}
                  name="resume.mandatory"
                  id="resume.mandatory"
                  checked={values.resume.mandatory}
                />
                <p className="t-sm">Mandatory</p>
              </div>
              <div className="flex align-center">
                <Toggle
                  defaultChecked={values.resume.show}
                  onChange={handleChange}
                  name='resume.show'
                  aria-label="show"
                />
                <span className="t-sm capitalize">
                  {values.resume.show ? 'show' : 'hide'}
                </span>
              </div>
            </div>
          </div>
        </form>

        <QuestionTypes>
          {profileTypes?.map((question: string, id: number) => (
            <>
              <p className='question-type capitalize text_light'>
                {question}
              </p>

              {profile?.profileQuestions && (
                <div className='questions'>
                  {
                    profile?.profileQuestions?.filter(el => el.type?.toLowerCase() === question.toLowerCase()).map(({ question }, id) => <Question question={question} id={id} />
                    )
                  }
                </div>
              )}
            </>
          ))}
        </QuestionTypes>

        <AdditionalQuestions props={values} formType={'profile'} />
      </Form>
    </Wrapper>
  );
}

const QuestionTypes = styled.div`
  margin-block: 0.5rem;

  .question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: PoppinsSemiBold;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid rgba(151, 151, 151, 0.7);
    padding-block: 0.7rem;

    svg {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
`;

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

  form {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 1rem;
    margin-bottom: 0.5rem;


    label {
      font-family: PoppinsSemiBold;
    }

    .input_wrap {
      width: 100%;

      .input {
        padding-bottom: 1rem;
        border-bottom: 1px solid #979797;

        p {
          font-family: PoppinsSemiBold;
        }
      }
    }

    input[type='checkbox'] {
      height: 0.8rem;
      width: 0.8rem;
    }

    .react-toggle {
      .react-toggle-track {
        width: 2rem;
        height: 1rem;

        svg {
          display: none;
        }
      }

      .react-toggle-thumb {
        width: 1rem;
        height: 1rem;
        top: 0px;
        left: 0px;
      }
    }

    .react-toggle--checked .react-toggle-thumb {
      left: 1rem !important;
    }

    .input-error {
      color: ${props => props.theme.red};
    }

    .flex {
      gap: 0.2rem;
    }
  }
`;
