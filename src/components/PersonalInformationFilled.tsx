import styled from "styled-components";
import { useFormik } from "formik";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { IForm, IQuestion } from '../@types/app';
import MultipleChoiceFilled from './MultipleChoiceFilled';
import DropdownFilled from './DropdownFilled';
import YesNoFilled from './YesNoFilled';
import VideoFilled from './VideoFilled';
import { useState } from 'react';
import { EditIcon } from 'assets/svg';
import { device } from "constants/index";


export default function PersonalInformationFilled({ data }: { data: IForm }): JSX.Element {

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

    const ChooseFilledForm = ({ currentType, data }: { currentType: string | undefined, data?: IQuestion }): JSX.Element => {
        const type: string | undefined = currentType;

        if (type === "yes/no") {
            return <YesNoFilled data={data} type={type} />
        } else if (type === "dropdown") {
            return <DropdownFilled data={data} type={type} />
        } else if (type === "multiple choice") {
            return <MultipleChoiceFilled data={data} type={type} />
        } else if (type === "video") {
            return <VideoFilled data={data} type={type} />
        } else {
            return <></>
        }
    };

    const Question = ({ question, id, key, type }: { type: string | undefined, question: string | undefined, id: string | undefined, key: number }): JSX.Element => {
        const [show, setShow] = useState(false);
        const filteredQuestion = data?.personalQuestions?.filter(question => question.id === id)

        return (
            <>
                <p className='question-type t-sm capitalize text_light'>
                    {type}
                </p>
                <div className='question' key={`question-${key}`}>
                    <p>{question}</p>
                    <EditIcon className='cursor-pointer' onClick={() => { setShow(!show) }} />
                </div>
                {show && filteredQuestion && <ChooseFilledForm currentType={filteredQuestion[0]?.type} data={filteredQuestion[0]} />}
            </>)
    }

    const questionTypes: string[] = [];
    data?.personalQuestions?.map(el => el?.type && el.type.length > 0 && questionTypes.push(el.type))


    const { handleSubmit } =
        useFormik({
            initialValues,
            onSubmit: () => {
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
                                <input type="checkbox" disabled name="phone.internalUse" id="phone.internalUse" checked={data?.phone?.internalUse} />
                                <p className="t-sm">Internal</p>
                            </div>
                            <div className="flex align-center">
                                <Toggle
                                    checked={data?.phone?.show} disabled name="phone.show" aria-label='show' />
                                <span className="t-sm capitalize">{data?.phone?.show ? 'show' : 'hide'}</span>
                            </div>

                        </div>
                    </div>


                    <div className="input_wrap">
                        <div className="flex j-space-between align-center input">
                            <label className="capitalize">
                                nationality
                            </label>
                            <div className="flex">
                                <input type="checkbox" name="nationality.internalUse" disabled id="nationality.internalUse" checked={data?.nationality?.internalUse} />
                                <p className="t-sm">Internal</p>
                            </div>
                            <div className="flex align-center">
                                <Toggle
                                    checked={data?.nationality?.show} disabled name="nationality.show" aria-label='show' />
                                <span className="t-sm capitalize">{data?.nationality?.show ? 'show' : 'hide'}</span>
                            </div>

                        </div>
                    </div>

                    <div className="input_wrap">
                        <div className="flex j-space-between align-center input">
                            <label className="capitalize">
                                current residence
                            </label>
                            <div className="flex">
                                <input type="checkbox" name="residence.internalUse" disabled id="residence.internalUse" checked={data?.residence?.internalUse} />
                                <p className="t-sm">Internal</p>
                            </div>
                            <div className="flex align-center">
                                <Toggle
                                    checked={data?.residence?.show} disabled name="residence.show" aria-label='show' />
                                <span className="t-sm capitalize">{data?.residence?.show ? 'show' : 'hide'}</span>
                            </div>

                        </div>
                    </div>

                    <div className="input_wrap">
                        <div className="flex j-space-between align-center input">
                            <label className="capitalize">
                                ID number
                            </label>
                            <div className="flex">
                                <input type="checkbox" name="id.internalUse" disabled id="id.internalUse" checked={data?.id?.internalUse} />
                                <p className="t-sm">Internal</p>
                            </div>
                            <div className="flex align-center">
                                <Toggle
                                    checked={data?.id?.show} name="id.show" disabled aria-label='show' />
                                <span className="t-sm capitalize">{data?.id?.show ? 'show' : 'hide'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="input_wrap">
                        <div className="flex j-space-between align-center input">
                            <label className="capitalize">
                                Date of Birth
                            </label>
                            <div className="flex">
                                <input type="checkbox" disabled name="dob.internalUse" id="dob.internalUse" checked={data?.dob?.internalUse} />
                                <p className="t-sm">Internal</p>
                            </div>
                            <div className="flex align-center">
                                <Toggle
                                    checked={data?.dob?.show} disabled name="dob.show" aria-label='show' />
                                <span className="t-sm capitalize">{data?.dob?.show ? 'show' : 'hide'}</span>
                            </div>

                        </div>
                    </div>

                </form>

                <QuestionTypes>
                    {data?.personalQuestions && (
                        <div className='questions'>
                            {
                                data?.personalQuestions?.map(({ question, id, type }, key) => <Question type={type} question={question} key={key} id={id} />
                                )
                            }
                        </div>
                    )}

                </QuestionTypes>

            </Form>
        </Wrapper>
    )
};

const QuestionTypes = styled.div`
  margin-block: 0.5rem;

  .question {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-family: PoppinsSemiBold;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid rgba(151, 151, 151, 0.7);
    padding-bottom: 0.7rem;

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

