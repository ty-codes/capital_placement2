import styled from 'styled-components';
import { useState } from 'react';
import { useFormik } from 'formik';
import 'react-toggle/style.css';
import { Video, Date, Dropdown, FileUpload, MultipleChoice, Number, Paragragh, ShortAnswer, YesNo } from 'components';
import { useAppContext } from 'contexts/AppContext';
import { AppContextType, IQuestion, IForm } from '../@types/app';
import MultipleChoiceFilled from './MultipleChoiceFilled';
import DropdownFilled from './DropdownFilled';
import YesNoFilled from './YesNoFilled';
import VideoFilled from './VideoFilled';
import { EditIcon } from 'assets/svg';
import { device } from 'constants/index';

const ChooseQuestion = ({ currentType, props, formType }: { currentType: string, props?: IForm, formType?: string }): JSX.Element => {
  const type = currentType;

  if (type === "Paragraph") {
    return <Paragragh props={props} formType={formType} />
  } else if (type === "Number") {
    return <Number props={props} formType={formType} />
  } else if (type === "Short Answer") {
    return <ShortAnswer props={props} formType={formType} />
  } else if (type === "Yes/No") {
    return <YesNo props={props} formType={formType} />
  } else if (type === "Dropdown") {
    return <Dropdown props={props} formType={formType} />
  } else if (type === "Date") {
    return <Date props={props} formType={formType} />
  } else if (type === "File Upload") {
    return <FileUpload props={props} formType={formType} />
  } else if (type === "Multiple Choice") {
    return <MultipleChoice props={props} formType={formType} />
  } else if (type === "Video") {
    return <Video props={props} formType={formType} />
  } else {
    return <Paragragh props={props} formType={formType} />
  }
};

interface IObject {
  show?: boolean,
  mandatory?: boolean,
  internalUse?: boolean
}


export default function AdditionalQuestionsFilled({ data }: { data: IQuestion[] }): JSX.Element {
  const { customisedTypes, customizedQuestions } = useAppContext() as AppContextType;

  const initialValues = {
  };

  const { } = useFormik({
    initialValues,
    onSubmit: () => {
    },
  });

  const questionTypes: string[] = [];
  data?.map(el => el?.type && el.type.length > 0 && questionTypes.push(el.type))

  
  const ChooseFilledForm = ({ currentType, data }: { currentType: string | undefined, data?: IQuestion}): JSX.Element => {
    const type:string | undefined = currentType;
  
    if (type === "yes/no") {
      return <YesNoFilled data={data} type={type} />
    } else if (type === "dropdown") {
      return <DropdownFilled data={data} type={type} />
    } else if (type === "multiple choice") {
      return <MultipleChoiceFilled data={data} type={type} />
    }  else if (type === "video") {
      return <VideoFilled data={data} type={type} />
    } else {
      return <></>
    }
  };

  const Question = ({ question, id, key }: { question: string | undefined, id: string | undefined, key: number }):JSX.Element => {
    const [show, setShow] = useState(false);
    const filteredQuestion = data?.filter(question => question.id === id)

    return <>
      <div className='question' key={`question-${key}`}>
        <p>{question}</p>
        <EditIcon className='cursor-pointer' onClick={() => {setShow(!show)}} />
      </div>
      {show && filteredQuestion && <ChooseFilledForm currentType={filteredQuestion[0]?.type} data={filteredQuestion[0]}  />}
    </>
  }


  return (
    <Wrapper>
      <Header>
        <h3>Additional Questions</h3>
      </Header>


      <Form>
      <QuestionTypes>
          {questionTypes?.filter((value, idx, array) => array.indexOf(value) === idx)?.map((question: string, id: number) => (
            <span key={`type-${id}`}>
              <p className='question-type capitalize text_light'>
                {question}
              </p>

              {data && (
                <div className='questions'>
                  {
                    data?.filter(el => el.type?.toLowerCase() === question.toLowerCase())
                    .map(({ question, id }, key) => <Question question={question} key={key} id={id} />
                    )
                  }
                </div>
              )}
            </span>
          ))}
        </QuestionTypes>
      </Form>
    </Wrapper>
  );
}


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

    label {
      font-family: PoppinsSemiBold;
    }

    .input_wrap {
      width: 100%;
    }

    input {
      outline: none;
      width: 100%;
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
