/** @format */

import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./header.css";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import { LoginContext } from "../../../context/AuthContext";

function stringToColor(string) {
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name.split(" ")[1]
      ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
      : `${name.split(" ")[0][0]}`,
  };
}

function Header() {
  const navigate = useNavigate();
  const { setLogin } = useContext(LoginContext);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setLogin(false);
    // localStorage.removeItem("user");
    localStorage.clear();
    // window.location.reload();
    navigate("/");
  };

  return (
    <div className="cart_header--cnt">
      <div className="grid wide cart_header">
        <div className="cart_header--logo">
          <NavLink to="/" className="cart_header--name">
            Bean Coffee
          </NavLink>
          <hr className="cart_header--line" />
          <div className="cart_header--cart">CART</div>
        </div>
        <div className="cart_header--avatar"></div>

        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Stack direction="row" spacing={2}>
              <Avatar
                {...stringAvatar(
                  JSON.parse(localStorage.getItem("user")).username
                )}
                sx={{ width: 35, height: 35 }}
              />
            </Stack>
          </IconButton>
          <Menu
            sx={{ mt: "40px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign="center">
                <NavLink to="/profile" className="nav_right--profile">
                  Profile
                </NavLink>
              </Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography
                textAlign="center"
                onClick={handleLogout}
                className="nav_right--logout"
              >
                Logout
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </div>
    </div>
  );
}

export default Header;
