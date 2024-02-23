import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { clearState } from "../../redux/bookmarks";
import { checkoutClearState } from "../../redux/checkouts";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    dispatch(checkoutClearState());
    dispatch(clearState());
    navigate('/')
    closeMenu();
  };

  return (
    <>
      <button className="user-button" onClick={toggleMenu}>
        <img id="user-button-image" src={user.profileImage} />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user && (
            <>
              <li>{user.username}</li>
              <li><button onClick={() => navigate('/user/picks')} className="saved-button">Your Picks</button></li>
              <li>
                <button className="user-logout" onClick={logout}>Log Out</button>
              </li>
            </>
          )}
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
