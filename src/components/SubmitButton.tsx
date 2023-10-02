import { AppContextType } from "../@types/app"
import { useAppContext } from "contexts/AppContext"
import styled from "styled-components";
import { getDatabase, ref, set } from "firebase/database";
import {LoadingComponent } from 'components';
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function SubmitButton(): JSX.Element {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const writeData = () => {
        try {
            const db = getDatabase();
            set(ref(db, 'form/' + '560cdd979f73'), {
                id: attributes?.id,
                attributes
            });
            setLoading(false);
            navigate('/')
        }
        catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    const { attributes } = useAppContext() as AppContextType;
    const handleSubmit = async () => {
        setLoading(true)
        writeData()
    }

    return (
        <Wrapper>
            <Button disabled={loading} onClick={() => handleSubmit()}>{loading ? <LoadingComponent /> : "Submit"}</Button>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  width: 29vw;
  min-width: 23rem;
  margin-block: 1rem 1.5rem;
`;

const Button = styled.button`
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
`;