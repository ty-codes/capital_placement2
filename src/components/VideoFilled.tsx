import styled from 'styled-components';
import { useFormik } from 'formik';
import 'react-toggle/style.css';
import { IQuestion } from '../@types/app';

export default function VideoFilled({ data, type }: { data?: IQuestion, type?: string }): JSX.Element {
  const { additionalInformation, id, maxTime, timeType, question } = data as IQuestion;

  const initialValues = {
    question: question,
    type: 'video',
    additionalInformation: additionalInformation,
    maxTime: maxTime,
    timeType: timeType,
    id: id
  };

  const { values, handleSubmit, handleChange } = useFormik({
    initialValues,
    onSubmit: () => {
    },
  });

  return (
    <>
      <Wrapper>
        <form
          onSubmit={handleSubmit}
          className="flex j-space-between align-center"
        >
          <div className="input_wrap">
            <div className="align-center">
              <span className="relative">
                <input
                  className=""
                  id="additionalInformation"
                  type="text"
                  name="additionalInformation"
                  placeholder="Additional Information"
                  value={values.additionalInformation}
                  disabled
                />
              </span>
            </div>
          </div>

          <div className='input-flex'>
            <div className="input_wrap">
              <div className="align-center">
                <span className="relative">
                  <input
                    className=""
                    id="maxTime"
                    type="text"
                    name="maxTime"
                    placeholder="Max duration of video in (sec/min)"
                    value={values.maxTime}
                    disabled
                  />
                </span>
              </div>
            </div>

            <div className="input_wrap">
              <select value={values.timeType} disabled name='timeType' onChange={handleChange}>
                <option value="" >Select "Seconds" or "Minutes"</option>
                <option className="capitalize" value="seconds">
                  seconds
                </option>
                <option className="capitalize" value="minutes">
                  minutes
                </option>
              </select>
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

  .input-flex {
    display: flex;
    align-items: start;
    gap: 0.5rem;

    .input_wrap {
      width: 47%;
    }
  }
`;
