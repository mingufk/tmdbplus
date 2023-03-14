import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Nav = () => {
  const [show, setShow] = useState(false);
  const { pathname } = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const initialUserData = localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData'))
    : {};
  const [userData, setUserData] = useState({ initialUserData });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === '/') {
          navigate('/main');
        }
      } else {
        navigate('/');
      }
    });
  }, [auth, navigate, pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    navigate(`/search?q=${e.target.value}`);
  };

  const handleAuth = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUserData(result.user);
        localStorage.setItem('userData', JSON.stringify(result.user));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUserData({});
        localStorage.removeItem('userData');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <NavWrapper show={show}>
      <Logo>
        <img
          src="/images/logo.svg"
          alt="TMDB+"
          onClick={() => (window.location.href = '/main')}
        />
      </Logo>

      {pathname === '/' ? (
        <SignIn onClick={handleAuth}>Sign in</SignIn>
      ) : (
        <>
          <Input
            value={searchValue}
            onChange={handleSearch}
            className="nav__input"
            type="text"
            placeholder="Search by title, character, or genre"
          />

          <SignOut>
            <User src={initialUserData.photoURL} alt={userData.displayName} />
            <DropDown>
              <span onClick={handleSignOut}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </NavWrapper>
  );
};

export default Nav;

const SignIn = styled.a`
  border-radius: 30px;
  background-color: #01b4e4;
  color: #0d253f;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #0d253f;
  transition: all 0.2s ease 0s;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #0d253f;
    color: #01b4e4;
    border-color: transparent;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0;
  color: #01b4e4;
  background-color: #0d253f;
  border: 2px solid #01b4e4;
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-weight: 700;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
  text-transform: uppercase;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const User = styled.img`
  border-radius: 50%;
  width: 90%;
  height: 90%;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.15);
`;

const Input = styled.input`
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  outline: none;
  text-overflow: ellipsis;
  z-index: calc(9);
  border: none;
  border-radius: 30px;
  background-color: transparent;
  color: #90cea1;
  padding-left: 24px;
  width: 19rem;
  height: 2rem;
  -webkit-appearance: textfield;
  outline-offset: -2px;
  overflow: visible;
  font-weight: 600;
  font-size: 1.1rem;
  opacity: 0.8;
  border: 3px solid rgba(1, 180, 228, 0.5);

  ::placeholder {
    color: #01b4e4;
    font-weight: 700;
    opacity: 0.5;
  }

  &:focus {
    width: 38rem;
    height: 2.5rem;
    opacity: 1;
    background-color: #01b4e4;
    color: #0d253f;
  }
`;

const NavWrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  background-color: ${(props) => (props.show ? '#090b13' : 'transparent')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 154px;
  height: 20px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
    cursor: pointer;
  }
`;
