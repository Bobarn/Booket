import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
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
    </ul>
  );
}

export default Navigation;
