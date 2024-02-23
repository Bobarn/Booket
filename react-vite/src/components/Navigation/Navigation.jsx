import { useNavigate, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton';
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation() {

  const navigate = useNavigate()

  const user = useSelector((state) => state.session.user)

  return (
    <nav id="nav-bar">
      {user ?
      <NavLink to='/home'>
        <img id="booket-logo" src="https://photobooket.s3.amazonaws.com/0ff8394c13b543928702e6cccfb0c165.png"/>
      </NavLink>
      :
      <NavLink to='/'>
        <img id="booket-logo" src="https://photobooket.s3.amazonaws.com/0ff8394c13b543928702e6cccfb0c165.png"/>
      </NavLink>
      }
      {user && <button id="navigation-bar"></button>}
      {user && <button className="user-page-button" onClick={() => navigate(`/users/${user.id}`)}>Your Page</button>}
      <div className="user-options">
        {user ?
        <>
        <button className={'modal-button'} onClick={() => navigate('/books/new')}>Publish</button>
        </>
        :
        <>
            <OpenModalMenuItem
              itemText="Log In"
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              modalComponent={<SignupFormModal />}
            />
        </>
        }
      </div>
      {user &&
      <ProfileButton />
      }
    </nav>
  );
}

export default Navigation;
