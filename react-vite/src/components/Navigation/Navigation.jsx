import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

function Navigation() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    navigate('/')
  };

  const user = useSelector((state) => state.session.user)

  return (
    <nav>
      <NavLink to='/home'>
        <img id="booket-logo" src="https://cdn.discordapp.com/attachments/1187515837817557065/1203590758356226058/logo-no-background.png?ex=65d1a63e&is=65bf313e&hm=5e72a1a1824a9c9fd7220d48c56644483e34cc5f9b8f72da199607cc91f71915&"/>
      </NavLink>
      <div className="user-options">
        {user ?
        <>
        <button className={'modal-button'} onClick={() => navigate('/books/new')}>Publish</button>
        <button className="modal-button" onClick={logout}>Log Out</button>
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
      {/* <ul className="nav-list">
        <li>
          <NavLink to="/">Opening</NavLink>
        </li>

        <li>
          <ProfileButton />
        </li>
        <li>
          <NavLink to="/home">Feed</NavLink>
        </li>
        <li>
          <NavLink to="/books/new">Publish a Book</NavLink>
        </li>
      </ul> */}
    </nav>
  );
}

export default Navigation;
