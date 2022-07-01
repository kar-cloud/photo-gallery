import React from "react";
import { slide as Menu } from "react-burger-menu";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/actions/login";

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Menu>
      <a className="menu-item" href="/home">
        Home
      </a>
      <Link className="menu-item" to="/takePicture">
        Take Picture
      </Link>
      <a
        className="menu-item"
        style={{ cursor: "pointer" }}
        onClick={handleLogout}
      >
        Logout
      </a>
    </Menu>
  );
};

export default Sidebar;
