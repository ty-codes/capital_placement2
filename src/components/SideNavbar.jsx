import { useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { device } from "../constants";
import {
  FileIcon,
  HomeIcon,
  BurgerIcon
} from "../assets/svg";
import styled from "styled-components";

const SideNavbar = ({ isSideNavOpen, setIsSideNavOpen }) => {
  const location = useLocation();
  let currentPath =
    location.pathname === "/" || !location.pathname
      ? "dashboard"
      : location.pathname.split("/")[1];
  const [activeTab, setActiveTab] = useState(currentPath);
  const ref = useRef(null);
  const isSmallDevice = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (isSmallDevice) {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsSideNavOpen(false);
        }
      };
      document.addEventListener("click", handleClickOutside, true);
      document.addEventListener("scroll", handleClickOutside, true);

      return () => {
        document.removeEventListener("click", handleClickOutside, true);
        document.removeEventListener("scroll", handleClickOutside, true);
      };
    } else {
      setIsSideNavOpen(true);
    }
  }, [isSmallDevice, setIsSideNavOpen]);
  if (!isSmallDevice) setIsSideNavOpen(true);

  return (
    <>
      <Wrapper className={!isSideNavOpen ? "close" : undefined} ref={ref}>
        <BurgerIcon className="burger" onClick={() => setIsSideNavOpen(false)} />
        <NavItems className="nav-items">
          <NavLink to="/">
            <li><HomeIcon /></li> 
          </NavLink>
          <NavLink to="/">
            <li><FileIcon /></li>
          </NavLink>
        </NavItems>
        <End>
          <Circle>
            <p>NT</p>
          </Circle>
        </End>
      </Wrapper>
    </>
  );
};

const Circle = styled.div`
  background-color: #0000ff;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    color: #fff;
    margin-block: auto;
  }
`;

const End = styled.div`
  align-items: center;
  padding: 1rem 0.8rem;
  padding-bottom: 2rem;
  cursor: pointer;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  display: flex;
  gap: 2rem;
  flex-direction: column;

  @media (max-width: 991px) {
    margin-bottom: 0.8rem;
  }


  li,
  .link-dropdown {
    display: flex;

    svg {
      width: 1.3rem;
      height: 1.3rem;
      margin: auto;
    }

    path {
      stroke: ${props => props.theme.black};
    }
  }
`

const Wrapper = styled.nav`
  position: fixed;
  width: ${(props) => props.theme.sideBarWidth};
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 50;
  padding: 0;
  background: white;
  box-shadow: 2px 4px 8px 1px #eeeeee;
  padding-block: 2rem;


  &.close {
    display: none;
  }

  svg.burger {
    margin-inline: auto;
    display: flex;
    margin-bottom: 3.2rem;

    rect {
      fill: #000;
    }
  }

  .logo {
    width: 6rem;
    height: 4rem;
    display: flex;
    align-self: center;
    margin: auto;
  }

  @media ${device.laptop} {
    width: 4rem;
  }
`;

const NavItems = styled.ul`
  margin-top: 1rem;
  padding: 0;
  display: flex;
  gap: 2rem;
  flex-direction: column;

  a {
    text-decoration: none;
    color: inherit;
  }

  li,
  .link-dropdown {
    display: flex;

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


export default SideNavbar;
