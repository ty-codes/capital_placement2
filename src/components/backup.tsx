import styled from "styled-components";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LikeIcon } from "assets/svg";
import Toggle from "react-toggle";
import "react-toggle/style.css";

export default function PersonalInformation(): JSX.Element {
  const [loading, setError] = useState<string>('');



  const initialValues = {
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    nationality: "",
    currentResidence: "",
    idNumber: "",
    dateOfBirth: "",
    gender: "",
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
    firstName: Yup.string().required("Please enter first name"),
    lastName: Yup.string().required("Please enter last name"),
    emailId: Yup.string()
      .email("Please enter a valid email")
      .required("Please enter email"),
    phoneNumber: Yup.number()
      .required("Please enter phone number"),
    nationality: Yup.string().required("Please enter nationality"),
    currentResidence: Yup.string().required("Please enter residence"),
    idNumber: Yup.number()
    .required("Please enter id"),
    dateOfBirth: Yup.string().required("Please enter start date"),
    gender: Yup.string().required("Please enter gender"),
  });


  const { values, handleSubmit, handleChange, handleBlur, errors } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit: (values) => {
        console.log(values)
        // navigate("/");
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
            <div>
              <label className="capitalize">
                First name
              </label>
            </div>

            <div className="align-center">
              <span className="relative">
                <input
                  className=""
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </span>
              {errors?.firstName && (
                <p className="input-error t-sm">{errors?.firstName}</p>
              )}
            </div>
          </div>

          <div className="input_wrap">
            <div>
              <label className="capitalize">
                Last name
              </label>
            </div>

            <div className="align-center">
              <span className="relative">
                <input
                  className=""
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </span>
              {errors?.lastName && (
                <p className="input-error t-sm">{errors?.lastName}</p>
              )}
            </div>
          </div>
          
          <div className="input_wrap">
            <div>
              <label className="capitalize">
                Email
              </label>
            </div>
            <div className="align-center">
              <span className="relative">
                <input
                  className=""
                  id="emailId"
                  type="text"
                  name="emailId"
                  value={values.emailId}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </span>
              {errors?.emailId && (
                <p className="input-error t-sm">{errors?.emailId}</p>
              )}
            </div>
          </div>


          <div className="input_wrap">
          <div className="flex j-space-between align-center">
              <label className="capitalize">
                phone<span className="t-sm text_light"> (without dial code)</span>
              </label>
              <div className="flex">
                <input type="checkbox" onChange={handleChange} name="phoneIU" id="phoneIU" checked={values.phoneIU} />
                <p className="t-sm">Internal</p>
              </div>
              <div className="flex align-center">
                <Toggle
              defaultChecked={values.hidePhone} onChange={handleChange} aria-label='show' />
              <span className="t-sm capitalize">{values.hidePhone ? 'hide' : 'show'}</span>
              </div>
              
            </div>

            <div className="align-center">
              <span className="relative">
                <input
                  className=""
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </span>
              {errors?.phoneNumber && (
                <p className="input-error t-sm">{errors?.phoneNumber}</p>
              )}
            </div>
          </div>


          <div className="input_wrap">
          <div className="flex j-space-between align-center">
              <label className="capitalize">
                nationality
              </label>
              <div className="flex">
                <input type="checkbox" onChange={handleChange} name="nationalityIU" id="nationalityIU" checked={values.nationalityIU} />
                <p className="t-sm">Internal</p>
              </div>
              <div className="flex align-center">
                <Toggle
              defaultChecked={values.hideNationality} onChange={handleChange} aria-label='show' />
              <span className="t-sm capitalize">{values.hideNationality ? 'hide' : 'show'}</span>
              </div>
              
            </div>

            <div className="align-center">
              <span className="relative">
                <input
                  className=""
                  id="nationality"
                  type="text"
                  name="nationality"
                  value={values.nationality}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </span>
              {errors?.nationality && (
                <p className="input-error t-sm">{errors?.nationality}</p>
              )}
            </div>
          </div>

          <div className="input_wrap">
          <div className="flex j-space-between align-center">
              <label className="capitalize">
                current residence
              </label>
              <div className="flex">
                <input type="checkbox" onChange={handleChange} name="residenceIU" id="residenceIU" checked={values.residenceIU} />
                <p className="t-sm">Internal</p>
              </div>
              <div className="flex align-center">
                <Toggle
              defaultChecked={values.hideResidence} onChange={handleChange} aria-label='show' />
              <span className="t-sm capitalize">{values.hideResidence ? 'hide' : 'show'}</span>
              </div>
              
            </div>
            <div className="align-center">
              <span className="relative">
                <input
                  className=""
                  id="currentResidence"
                  type="text"
                  name="currentResidence"
                  value={values.currentResidence}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </span>
              {errors?.currentResidence && (
                <p className="input-error t-sm">{errors?.currentResidence}</p>
              )}
            </div>
          </div>

          <div className="input_wrap">
            <div className="flex j-space-between align-center">
              <label className="capitalize">
                ID number
              </label>
              <div className="flex">
                <input type="checkbox" onChange={handleChange} name="idIU" id="idIU" checked={values.idIU} />
                <p className="t-sm">Internal</p>
              </div>
              <div className="flex align-center">
                <Toggle
              defaultChecked={values.hideId} onChange={handleChange} aria-label='show' />
              <span className="t-sm capitalize">{values.hideId ? 'hide' : 'show'}</span>
              </div>
              
            </div>
            <div className="align-center">
              <span className="relative">
                <input
                  className=""
                  id="idNumber"
                  type="text"
                  name="idNumber"
                  value={values.idNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </span>
              {errors?.idNumber && (
                <p className="input-error t-sm">{errors?.idNumber}</p>
              )}
            </div>
          </div>
          
          <div className="input_wrap">
            <div className="flex j-space-between align-center">
              <label className="capitalize">
                Date of Birth
              </label>
              <div className="flex">
                <input type="checkbox" onChange={handleChange} name="dobIU" id="dobIU" checked={values.dobIU} />
                <p className="t-sm">Internal</p>
              </div>
              <div className="flex align-center">
                <Toggle
              defaultChecked={values.hideDob} onChange={handleChange} aria-label='show' />
              <span className="t-sm capitalize">{values.hideDob ? 'hide' : 'show'}</span>
              </div>
              
            </div>
            <div className="align-center">
              <span className="relative">
                <input
                  className=""
                  id="dateOfBirth"
                  type="date"
                  name="dateOfBirth"
                  value={values.dateOfBirth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </span>
              {errors?.dateOfBirth && (
                <p className="input-error t-sm">{errors?.dateOfBirth}</p>
              )}
            </div>
          </div>

          <div className="add-question flex">
            <LikeIcon />
            <p className="t-sm">Add a question</p>
          </div>

          <button>
            Submit
          </button>
        </form>
      </Form>
    </Wrapper>
  )
};

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
      border: none;
      outline: none;
      border-bottom: 1px solid #979797;
      height: 1.5rem;
      padding-block: 0;
      width: 100%;
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

