import styled from 'styled-components';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LikeIcon } from 'assets/svg';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { questionTypes } from 'constants/index';
import { Video, Date, Dropdown, FileUpload, MultipleChoice, Number, Paragragh, ShortAnswer, YesNo } from 'components';
import { useAppContext } from 'contexts/AppContext';
import { AppContextType } from '../@types/app';


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

interface IForm {
  education?: IObject,
  experience?: IObject,
  resume?: IObject,
  dob?: IObject,
  id?: IObject,
  nationality?: IObject,
  phone?: IObject,
  residence?: IObject,
}


export default function AdditionalQuestionsWrapper(): JSX.Element {
  const { customisedTypes, customizedQuestions } = useAppContext() as AppContextType;

  const initialValues = {
    firstName: '',
    lastName: '',
    emailId: '',
    phoneNumber: '',
    nationality: '',
    currentResidence: '',
    idNumber: '',
    dateOfBirth: '',
    gender: '',
    hideDob: true,
    dobIU: false,
    hideId: true,
    idIU: false,
    hideResidence: true,
    residenceIU: false,
    hideNationality: true,
    nationalityIU: false,
    hidePhone: true,
    phoneIU: false,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter first name'),
    lastName: Yup.string().required('Please enter last name'),
    emailId: Yup.string()
      .email('Please enter a valid email')
      .required('Please enter email'),
    phoneNumber: Yup.number().required('Please enter phone number'),
    nationality: Yup.string().required('Please enter nationality'),
    currentResidence: Yup.string().required('Please enter residence'),
    idNumber: Yup.number().required('Please enter id'),
    dateOfBirth: Yup.string().required('Please enter start date'),
    gender: Yup.string().required('Please enter gender'),
  });

  const { values, handleSubmit, handleChange, handleBlur, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      console.log(values);
      // navigate("/");
    },
  });


  return (
    <Wrapper>
      <Header>
        <h3>Additional Questions</h3>
      </Header>


      <Form>
        <QuestionTypes>
          {customisedTypes?.map((question: string, id: number) => (
            <>
              <p className='question-type capitalize text_light'>
                {question}
              </p>

              {customizedQuestions && (
                <div className='questions'>
                  {
                    customizedQuestions?.filter(el => el.type?.toLowerCase() === question.toLowerCase()).map(({ question }, id) => (
                      <div className='question'>
                        <p>{question}</p>
                      </div>
                    ))
                  }
                </div>
              )}
            </>
          ))}
        </QuestionTypes>
        <AdditionalQuestions />
      </Form>
    </Wrapper>
  );
}

export const AdditionalQuestions = ({ props, formType }: { props?: IForm, formType?: string }): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);
  const [currentType, setCurrentType] = useState<string>('');


  return (
    <>

      {show && (
        <>
          <select value={currentType} className='t-sm' onChange={(e) => { setCurrentType(e.target.value); }}>
            <option value=""></option>
            {questionTypes.map((question: string, id: number) => (
              <option key={`question-type-${id}`} className="capitalize t-sm">
                {question}
              </option>
            ))}
          </select>
        </>

      )}
      <></>
      {currentType && <ChooseQuestion currentType={currentType} props={props} formType={formType} />}

      <div className="add-questions mt-05 flex cursor-pointer">
        <LikeIcon />
        <p onClick={() => setShow(true)}>Add question</p>

      </div>
    </>
  )
};

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
