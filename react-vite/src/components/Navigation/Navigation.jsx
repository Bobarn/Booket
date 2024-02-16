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
        <img id="booket-logo" src="https://cdn.discordapp.com/attachments/1187515837817557065/1203590758356226058/logo-no-background.png?ex=65d1a63e&is=65bf313e&hm=5e72a1a1824a9c9fd7220d48c56644483e34cc5f9b8f72da199607cc91f71915&"/>
      </NavLink>
      :
      <NavLink to='/'>
        <img id="booket-logo" src="https://cdn.discordapp.com/attachments/1187515837817557065/1203590758356226058/logo-no-background.png?ex=65d1a63e&is=65bf313e&hm=5e72a1a1824a9c9fd7220d48c56644483e34cc5f9b8f72da199607cc91f71915&"/>
      </NavLink>
      }
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
