import {
  BurgerIcon,
} from 'assets/svg';
import styled from 'styled-components';
import { device } from 'constants/index';
import { NavLink, useLocation } from "react-router-dom";


export default function TopNav({ isSmallDevice, setIsSideNavOpen }: {
  isSmallDevice: boolean, setIsSideNavOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {

  return (
    <Wrapper id="topNav">
      {isSmallDevice && (
          <BurgerIcon
            className="burger"
            onClick={() => {
              setIsSideNavOpen(prevState => !prevState);
            }}
          />
        )}
      <NavItems className="nav-items">
          <NavLink to="program-details">
            <li className='capitalize'>Program details</li> 
          </NavLink>
          <NavLink to="/">
            <li className='capitalize'>Application form</li> 
          </NavLink>
          <NavLink to="workflow">
            <li className='capitalize'>Workflow</li> 
          </NavLink>
          <NavLink to="preview">
            <li className='capitalize'>Preview</li> 
          </NavLink>
        </NavItems>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  transition: all 1s ease;
  z-index: 5;
  width: calc(100vw - ${props => props.theme.sideBarWidth});
  float: right;
  overflow-x: hidden;
  background: white;

  @media ${device.laptop} {
    width: calc(100vw - 4rem);
  }

  @media ${device.isSmallDevice} {
    width: 100%;
    padding-inline: 0.65rem;
    gap: 0.5rem;
  }

  .burger {
    margin-right: 0.65rem;

    rect {
      fill: ${props => props.theme.primaryColor};
    }
  }
`;

const NavItems = styled.ul`
  margin-block: 3rem;
  padding: 0;
  display: flex;
  gap: 2rem;
  box-shadow: 2px 4px 8px 4px #eeeeee;
  width: 100%;
  height: 4rem;
  overflow-x: auto;

  a {
    text-decoration: none;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;

    &.active {
      background-color: #00635b;
      color: #fff;
    }
  }

  li,
  .link-dropdown {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 12rem;
    margin-inline: auto;

    svg {
      width: 1.3rem;
      height: 1.3rem;
      margin: auto;
    }

    path {
      stroke: ${props => props.theme.black};
    }
  }

  .link-dropdown {
    margin-bottom: 0;
  }
`;