import styled from "styled-components";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LikeIcon } from "assets/svg";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { AdditionalQuestions } from "./AdditionalQuestions";
import { useAppContext } from 'contexts/AppContext';
import { AppContextType } from '../@types/app';


export default function PersonalInformation(): JSX.Element {
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



  const { values, handleSubmit, handleChange, handleBlur, errors } =
    useFormik({
      initialValues,
      onSubmit: (values) => {
        console.log(values)
        // navigate("/");
      }
    });

    const { personalInformation, personalTypes } = useAppContext() as AppContextType;


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
          
        </form>

        <QuestionTypes>
          {personalTypes?.map((question: string, id: number) => (
            <>
              <p className='question-type capitalize text_light'>
                {question}
              </p>

              {personalInformation?.profileQuestions && (
                <div className='questions'>
                  {
                    personalInformation?.personalQuestions?.filter(el => el.type?.toLowerCase() === question.toLowerCase()).map(({ question }, id) => (
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

        <AdditionalQuestions props={values} />
      </Form>
    </Wrapper>
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
   }
`;

