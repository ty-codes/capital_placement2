import React, { Suspense, useMemo, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import './App.scss';
import { useMediaQuery } from 'react-responsive';
import { Outlet } from 'react-router-dom';
import { PageLoader, SideNavbar, TopNav } from 'components';

interface IProps {
  isSmallDevice: boolean
}

const Dashboard = React.lazy(() => import('./pages/Dashboard'));

function App() {
  const theme = useMemo(
    () => ({
      black: '#000000',
      white: '#fff',
      grey: '#AFAFAF',
      red: '#a80000',
      primaryColor: '#1d4ed8',
      headerBg: '#d0f7fa',

      // variables
      sideBarWidth: '6vw',
    }),
    [],
  );
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Suspense
          fallback={
            <Wrapper>
              <PageLoader />
            </Wrapper>
          }
        >
          <Routes>
            <Route path="/" element={<PagesWrapper />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

const PagesWrapper = () => {
  const isSmallDevice = useMediaQuery({ maxWidth: 768 });
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

  return (
    <Container isSmallDevice={isSmallDevice}>
      <TopNav
        isSmallDevice={isSmallDevice}
        setIsSideNavOpen={setIsSideNavOpen}
      />
      <SideNavbar
        isSideNavOpen={isSideNavOpen}
        setIsSideNavOpen={setIsSideNavOpen}
      />
      <Outlet />
    </Container>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: auto;
  margin-top: 5em;
  min-height: 100vh;
`;

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
      background: ${props => props.theme.primaryColor};
    }
  }
`;

export default App;
