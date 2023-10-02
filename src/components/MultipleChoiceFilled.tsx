import styled from 'styled-components';
import { useFormik } from 'formik';
import 'react-toggle/style.css';
import { ListIcon } from 'assets/svg';
import { IQuestion } from '../@types/app';

export default function MultipleChoiceFilled({ data, type }: { data?: IQuestion, type?: string }): JSX.Element {
  const { choices, id, maxChoice, other, question } = data as IQuestion;
  const initialValues = {
    Pchoices: choices,
    question: question,
    type: 'multiple choice',
    other: other,
    maxChoice: maxChoice,
    id: id
  };

  const { values } = useFormik({
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

          <div className="choices align-center">
            {choices?.map((choice: string, id: number) => (
              <>
                <div className="choice-wrapper flex">
                  <ListIcon />
                  <div className='w-100'>
                    <p className="t-sm">Choice</p>
                    <input type="text" className='t-sm' disabled defaultValue={choice} readOnly />
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className='flex'>
            <input type='checkbox' checked={values.other} disabled name="other" id="other" />
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
                  disabled
                />
              </span>
            </div>
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
