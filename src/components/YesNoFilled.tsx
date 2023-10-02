import styled from 'styled-components';
import { useFormik } from 'formik';
import 'react-toggle/style.css';
import { IQuestion } from '../@types/app';

export default function YesNoFilled({ data, type }: { data?: IQuestion, type?: string }): JSX.Element {
  const { disqualify, id, question } = data as IQuestion;
  const initialValues = {
    question: question,
    type: 'yes/no',
    disqualify: disqualify,
    id: id
  };

  const { values, handleChange } = useFormik({
    initialValues,
    onSubmit: () => {

    },
  });


  return (
    <>
      <Wrapper>
        <form
          onSubmit={e => e.preventDefault()}
          className="flex j-space-between align-center"
        >

          <div className='flex'>
            <input type='checkbox' checked={values.disqualify} disabled onChange={handleChange}
              name="disqualify"
              id="disqualify" />
            <p className='t-sm'>Disqualify candidate if answer is no</p>
          </div>

        </form>
      </Wrapper>
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
