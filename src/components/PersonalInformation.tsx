import styled from "styled-components";
import { useFormik } from "formik";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { AdditionalQuestions } from "./AdditionalQuestions";
import { useAppContext } from 'contexts/AppContext';
import { AppContextType, IQuestion } from '../@types/app';
import { useState } from 'react';
import { EditIcon } from 'assets/svg';
import { device } from "constants/index";
import { ParagraphEdit, YesNoEdit, VideoEdit, ShortAnswerEdit, NumberEdit, DropdownEdit, DateEdit, FileUploadEdit, MultipleChoiceEdit } from 'components';


export default function PersonalInformation(): JSX.Element {
  const { personalInformation, setPersonalInformation, personalTypes } = useAppContext() as AppContextType;

  const initialValues = {
    dob: {
      show: false,
      internalUse: false,
    },
    id: {
      show: false,
      internalUse: false,
    },
    residence: {
      show: false,
      internalUse: false,
    },
    nationality: {
      show: false,
      internalUse: false,
    },
    phone: {
      show: false,
      internalUse: false,
    }
  };


  const ChooseEditForm = ({ currentType, data, setShowQuestion }: { setShowQuestion: React.Dispatch<React.SetStateAction<boolean>>, currentType: string | undefined, data?: IQuestion }): JSX.Element => {
    const type: string | undefined = currentType;

    if (type === "paragraph") {
      return <ParagraphEdit data={data} setShowQuestion={setShowQuestion} formType="personal information" />
    } else if (type === "number") {
      return <NumberEdit data={data} setShowQuestion={setShowQuestion} formType="personal information" />
    } else if (type === "short answer") {
      return <ShortAnswerEdit data={data} setShowQuestion={setShowQuestion} formType="personal information" />
    } else if (type === "yes/no") {
      return <YesNoEdit data={data} setShowQuestion={setShowQuestion} formType="personal information" />
    } else if (type === "dropdown") {
      return <DropdownEdit data={data} setShowQuestion={setShowQuestion} formType="personal information" />
    } else if (type === "date") {
      return <DateEdit data={data} setShowQuestion={setShowQuestion} formType="personal information" />
    } else if (type === "file upload") {
      return <FileUploadEdit data={data} setShowQuestion={setShowQuestion} formType="personal information" />
    } else if (type === "multiple choice") {
      return <MultipleChoiceEdit data={data} setShowQuestion={setShowQuestion} formType="personal information" />
    } else if (type === "video") {
      return <VideoEdit data={data} setShowQuestion={setShowQuestion} formType="personal information" />
    } else {
      return <></>
    }
  };

  const Question = ({ question, id, key }: { question: string | undefined, id: string | undefined, key: number }): JSX.Element => {
    const [show, setShow] = useState(false);
    const filteredQuestion = personalInformation?.personalQuestions?.filter(question => question.id === id)
    const [showQuestion, setShowQuestion] = useState<boolean>(true);

    return <>
      {
        showQuestion &&
        <>
          <div className='question' key={`question-${key}`}>
            <p>{question}</p>
            <EditIcon className='cursor-pointer' onClick={() => { setShow(!show) }} />
          </div>
          {show && filteredQuestion && <ChooseEditForm setShowQuestion={setShowQuestion} currentType={filteredQuestion[0]?.type} data={filteredQuestion[0]} />}

        </>
      }
    </>
  }

  const { values, handleSubmit, handleChange } =
    useFormik({
      initialValues,
      onSubmit: (values) => {
        setPersonalInformation && setPersonalInformation({ ...values, personalQuestions: [] })
      }
    });

  return (
    <Wrapper>
      <Header>
        <h3>Personal Information</h3>
      </Header>
      <Form>
        <form
          onSubmit={handleSubmit}
          className="flex j-space-between align-center two-columns"
        >
          <div className="input_wrap">
            <div className="input">
              <p className="capitalize">
                First name
              </p>
            </div>
          </div>

          <div className="input_wrap">
            <div className="input">
              <p className="capitalize">
                Last name
              </p>
            </div>
          </div>

          <div className="input_wrap">
            <div className="input">
              <p className="capitalize">
                Email
              </p>
            </div>
          </div>


          <div className="input_wrap">
            <div className="flex j-space-between align-center input">
              <label className="capitalize">
                phone<span className="t-sm text_light"> (without dial code)</span>
              </label>
              <div className="flex">
                <input type="checkbox" onChange={handleChange} name="phone.internalUse" id="phone.internalUse" checked={values.phone.internalUse} />
                <p className="t-sm">Internal</p>
              </div>
              <div className="flex align-center">
                <Toggle
                  defaultChecked={values.phone.show} name="phone.show" onChange={handleChange} aria-label='show' />
                <span className="t-sm capitalize">{values.phone.show ? 'show' : 'hide'}</span>
              </div>

            </div>
          </div>


          <div className="input_wrap">
            <div className="flex j-space-between align-center input">
              <label className="capitalize">
                nationality
              </label>
              <div className="flex">
                <input type="checkbox" onChange={handleChange} name="nationality.internalUse" id="nationality.internalUse" checked={values.nationality.internalUse} />
                <p className="t-sm">Internal</p>
              </div>
              <div className="flex align-center">
                <Toggle
                  defaultChecked={values.nationality.show} name="nationality.show" onChange={handleChange} aria-label='show' />
                <span className="t-sm capitalize">{values.nationality.show ? 'show' : 'hide'}</span>
              </div>

            </div>
          </div>

          <div className="input_wrap">
            <div className="flex j-space-between align-center input">
              <label className="capitalize">
                current residence
              </label>
              <div className="flex">
                <input type="checkbox" onChange={handleChange} name="residence.internalUse" id="residence.internalUse" checked={values.residence.internalUse} />
                <p className="t-sm">Internal</p>
              </div>
              <div className="flex align-center">
                <Toggle
                  defaultChecked={values.residence.show} name="residence.show" onChange={handleChange} aria-label='show' />
                <span className="t-sm capitalize">{values.residence.show ? 'show' : 'hide'}</span>
              </div>

            </div>
          </div>

          <div className="input_wrap">
            <div className="flex j-space-between align-center input">
              <label className="capitalize">
                ID number
              </label>
              <div className="flex">
                <input type="checkbox" onChange={handleChange} name="id.internalUse" id="id.internalUse" checked={values.id.internalUse} />
                <p className="t-sm">Internal</p>
              </div>
              <div className="flex align-center">
                <Toggle
                  defaultChecked={values.id.show} name="id.show" onChange={handleChange} aria-label='show' />
                <span className="t-sm capitalize">{values.id.show ? 'show' : 'hide'}</span>
              </div>
            </div>
          </div>

          <div className="input_wrap">
            <div className="flex j-space-between align-center input">
              <label className="capitalize">
                Date of Birth
              </label>
              <div className="flex">
                <input type="checkbox" onChange={handleChange} name="dob.internalUse" id="dob.internalUse" checked={values.dob.internalUse} />
                <p className="t-sm">Internal</p>
              </div>
              <div className="flex align-center">
                <Toggle
                  defaultChecked={values.dob.show} name="dob.show" onChange={handleChange} aria-label='show' />
                <span className="t-sm capitalize">{values.dob.show ? 'show' : 'hide'}</span>
              </div>

            </div>
          </div>

          {personalTypes && personalTypes?.length < 1 && <button type="submit">Save</button>}

        </form>

        <QuestionTypes>
          {personalTypes?.filter((value, idx, array) => array.indexOf(value) === idx)?.map((question: string, id: number) => (
            <>
              <p className='question-type capitalize text_light'>
                {question}
              </p>

              {personalInformation?.personalQuestions && (
                <div className='questions'>
                  {
                    personalInformation?.personalQuestions?.filter(el => el.type?.toLowerCase() === question.toLowerCase())
                      .map(({ question, id }, key) => <Question question={question} key={key} id={id} />
                      )
                  }
                </div>
              )}
            </>))}
        </QuestionTypes>

        <AdditionalQuestions props={values} formType={'personal information'} />

      </Form>
    </Wrapper>
  )
};

const QuestionTypes = styled.div`
  margin-block: 0.5rem;

  .question {
    display: flex;
    gap: 0.3rem;
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

   @media ${device.mobileM} {
    min-width: auto;
    width: 100%;
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

    input[type=checkbox] {
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
      color: ${props => props.theme.red}
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
      margin-block: 1rem;
    }
   }
`;

