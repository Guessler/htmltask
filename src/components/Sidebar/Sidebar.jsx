import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCog,
    faCogs,
    faPhoneVolume,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';
import tg from '../../assets/tg.png';
import PropTypes from 'prop-types';

const themes = {
    light: {
        background: '#fff',
        hover: '#f0f2ff',
        active: '#f0f2ff',
        text: '#97a5b9',
        textHover: '#091b31',
        textActive: '#0000b5',
        sectionText: '#aaa',
        logoColor: '#0000b5',
        buttonBg: '#fff',
        buttonBgActive: '#e2e8f0',
    },
    dark: {
        background: '#202127',
        hover: '#2D2E34',
        active: '#393A3F',
        text: '#f0f2ff',
        textHover: '#f0f2ff',
        textActive: '#f0f2ff',
        sectionText: '#aaa',
        logoColor: '#3B82F6',
        buttonBg: '#202127',
        buttonBgActive: '#4B5966',
    }
};

const StyledSidebar = styled.div`
  width: ${({ isOpen }) => (isOpen ? '200px' : '105px')};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  position: relative;
  padding: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  transition: all 0.3s ease-in-out;
`;

const SideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

const LogoContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: ${({ isOpen }) => (isOpen ? 'flex-start' : 'center')};

  img {
    width: 40px;
    height: 40px;
    margin-right: ${({ isOpen }) => (isOpen ? '10px' : '0')};
  }

  h3 {
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    margin: 0;
    font-size: 18px;
    color: ${({ theme }) => theme.logoColor};
  }

  @media (max-width: 768px) {
    justify-content: center;

    img {
      margin-right: 0;
    }
  }
`;

const MenuSection = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;

  h4 {
    margin-bottom: 10px;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    text-align: center;
    font-size: 14px;
    color: ${({ theme }) => theme.sectionText};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    max-width: 180px;
    margin-bottom: 10px;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    background-color: transparent;
    text-align: left;
    color: ${({ theme }) => theme.text};

    &.active {
      background-color: ${({ theme }) => theme.active};
      color: ${({ theme }) => theme.textActive};
      font-weight: bold;
    }

    &:hover:not(.active) {
      background-color: ${({ theme }) => theme.hover};
      color: ${({ theme }) => theme.textHover};
    }

    &:hover .tooltip {
      display: ${({ isOpen }) => (isOpen ? 'none' : 'block')};
    }

    .tooltip {
      display: none;
      position: absolute;
      background-color: #0000b5;
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      right: -40px;
      transform: translateY(-50%);
      z-index: 1;
    }

    svg {
      min-width: 20px;
      text-align: center;
      margin-right: ${({ isOpen }) => (isOpen ? '10px' : '0')};
    }

    span {
      display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const BottomMenuSection = styled(MenuSection)`
  margin-top: auto;
  margin-bottom: 0;
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 20px;
  right: -20px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(180deg)')};
  color: ${({ theme }) => theme.text};
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 0 12px;
  margin-top: 20px;
  width: ${({ isOpen }) => (isOpen ? '100%' : '40px')};
  height: 40px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    flex-grow: 1;
    padding-left: 10px;
    overflow: hidden;
  }

  span,
  h4 {
    margin: 0;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.text};
  }

  h4 {
    font-weight: bold;
    font-size: 16px;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 16px;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    flex-shrink: 0;
    color: ${({ theme }) => theme.text};
  }
`;

const Sidebar = (props) => {
    const { color = 'light' } = props;
    const [isOpen, setIsOpen] = useState(true);
    const [activeItem, setActiveItem] = useState(null);

    const handleItemClick = (index) => {
        setActiveItem(index);
    };

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const routes = [
        { title: 'Home', icon: 'fas-solid fa-house', path: '/' },
        { title: 'Sales', icon: 'chart-line', path: '/sales' },
        { title: 'Costs', icon: 'chart-column', path: '/costs' },
        { title: 'Payments', icon: 'wallet', path: '/payments' },
        { title: 'Finances', icon: 'chart-pie', path: '/finances' },
        { title: 'Messages', icon: 'envelope', path: '/messages' },
    ];

    const bottomRoutes = [
        { title: 'Settings', icon: faCogs, path: '/settings' },
        { title: 'Support', icon: faPhoneVolume, path: '/support' },
    ];

    const goToRoute = (path) => {
        console.log(`going to "${path}"`);
    };

    return (
        <ThemeProvider theme={themes[color] || themes.light}>
            <StyledSidebar isOpen={isOpen}>
                <SideBarContainer>
                    <LogoContainer isOpen={isOpen}>
                        <img src={logo} alt="Logo" />
                        <h3>Technifly</h3>
                    </LogoContainer>
                    <MenuSection isOpen={isOpen}>
                        {routes.map((route, index) => (
                            <div
                                key={route.title}
                                className={activeItem === index ? 'active' : ''}
                                onClick={() => {
                                    handleItemClick(index);
                                    goToRoute(route.path);
                                }}
                            >
                                <FontAwesomeIcon icon={route.icon} />
                                <span>{route.title}</span>
                                <div className="tooltip">{route.title}</div>
                            </div>
                        ))}
                    </MenuSection>
                    <BottomMenuSection isOpen={isOpen}>
                        {bottomRoutes.map((route, index) => (
                            <div
                                key={route.title}
                                className={activeItem === routes.length + index ? 'active' : ''}
                                onClick={() => {
                                    handleItemClick(routes.length + index);
                                    goToRoute(route.path);
                                }}
                            >
                                <FontAwesomeIcon icon={route.icon} />
                                <span>{route.title}</span>
                                <div className="tooltip">{route.title}</div>
                            </div>
                        ))}
                    </BottomMenuSection>
                </SideBarContainer>
                <ToggleButton isOpen={isOpen} onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={isOpen ? faAngleLeft : faAngleRight} />
                </ToggleButton>
                <ProfileContainer isOpen={isOpen}>
                    <img src={tg} alt="Profile" />
                    <div>
                        <span>account</span>
                        <h4>Leo T.</h4>
                    </div>
                    <button>
                        <FontAwesomeIcon icon={faCog} />
                    </button>
                </ProfileContainer>
            </StyledSidebar>
        </ThemeProvider>
    );
};

Sidebar.propTypes = {
    color: PropTypes.string,
};

export default Sidebar;