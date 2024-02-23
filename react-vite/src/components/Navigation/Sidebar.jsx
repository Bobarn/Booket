import { useState } from "react";
import { useSelector } from "react-redux";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { useDispatch } from "react-redux";
import { thunkLogout } from "../../redux/session";
import { checkoutClearState } from "../../redux/checkouts";
import { clearState } from "../../redux/bookmarks";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  const user = useSelector((state) => state.session.user);
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    dispatch(checkoutClearState());
    dispatch(clearState());
    navigate('/')
  };

  return (
    <>
      <IconContext.Provider value={{ color: "undefined" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
                <li className="nav-text">
                  <Link to={`/users/${user.id}`}>
                  <i className="fa-solid fa-house-chimney-user"></i>
                  <span>Your Page</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to={'/books/new'}>
                    <i className="fa-solid fa-pen-nib"></i>
                    <span>Publish</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <Link to={'/user/picks'}>
                  <i className="fa-solid fa-book-bookmark"></i>
                  <span>Your Picks</span>
                  </Link>
                </li>
                <li className="nav-text">
                  <button className="user-logout" onClick={logout}>Log Out</button>
                </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
