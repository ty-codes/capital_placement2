import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import { TopNav, SideNavbar } from ".";
import { useState } from "react";
import { OutletProps } from "react-router-dom";

interface IProps {
  isSmallDevice: boolean
}

export default function PageLayout(props: OutletProps): React.ReactElement | null {
  const isSmallDevice:boolean = useMediaQuery({ maxWidth: 768 });
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

  return (
    <>
      <Container isSmallDevice={isSmallDevice}>
        <>
          <TopNav
            isSmallDevice={isSmallDevice}
            setIsSideNavOpen={setIsSideNavOpen}
          />
          <SideNavbar
            isSideNavOpen={isSideNavOpen}
            setIsSideNavOpen={setIsSideNavOpen}
          />
          {props}
        </>
      </Container>
    </>
  );
}

const Container = styled.div<IProps>`
  height: 100vh;
  width: 100vw;
  overflow-y: auto;

  @media (min-width: 1024px) {
    &::-webkit-scrollbar {
      display: none;
      width: 9px;

      &:hover {
        cursor: pointer;
      }
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: white;
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: ${(props) => props.theme.primaryColor};
    }
  }
`;
