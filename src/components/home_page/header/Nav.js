/** @format */

import React, { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import "./nav.css";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LoginContext } from "../../../context/AuthContext";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";

// AVATAR
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

//THEME (COLOR)
const theme = createTheme({
  palette: {
    primary: {
      main: "#f9c06a",
    },
  },
});

function Nav() {
  const { setLogin, login } = useContext(LoginContext);
  //Drop down
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
  };

  const [isActive, setIsActive] = useState(false);
  const [path, setPath] = useState("");
  const changeActiveMenu = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className="nav_container grid wide">
        <NavLink to="/" className="nav_logo l-2 c-10 m-3">
          <div className="nav_logo--name">Bean Coffee</div>
        </NavLink>
        <div className="l-2"></div>

        <div className="nav_button c-2">
          {isActive ? (
            <CloseRoundedIcon onClick={changeActiveMenu} />
          ) : (
            <MenuRoundedIcon onClick={changeActiveMenu} />
          )}
        </div>

        <div className={`nav_main l-8 c-12 m-9 ${isActive ? "active" : ""}`}>
          <div className="nav_center l-6 m-8">
            <NavLink
              to="/"
              className={`nav_center--item l-3 m-3 ${
                path === "/home" ? "active" : ""
              }`}
            >
              Home
            </NavLink>
            <NavLink
              to="/menu"
              className={`nav_center--item l-3 m-3 ${
                path === "/menu" ? "active" : ""
              }`}
            >
              Menu
            </NavLink>
            <NavLink
              to="/product"
              className={`nav_center--item l-3 m-3 ${
                path === "/product" ? "active" : ""
              }`}
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className={`nav_center--item l-3 m-3 ${
                path === "/about" ? "active" : ""
              }`}
            >
              About Us
            </NavLink>
          </div>

          <div className="l-1"></div>

          <div className="nav_right l-5 m-4">
            <div className="l-2 m-0"></div>
            {login ? (
              <>
                <div className="l-2 m-0"></div>
                <div className="nav_right--card nav_right--item l-4 m-5">
                  <Badge color="primary" badgeContent={100}>
                    <ShoppingCartOutlinedIcon sx={{ fontSize: 26 }} />
                  </Badge>
                </div>

                <div className="nav_right--avatar nav_right--item l-4 m-7">
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
                        <Typography textAlign="center">Profile</Typography>
                      </MenuItem>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" onClick={handleLogout}>
                          Logout
                        </Typography>
                      </MenuItem>
                    </Menu>
                  </Box>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/auth/login"
                  className="nav_right--login nav_right--item l-4 m-5"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/auth/register"
                  className="nav_right--signup nav_right--item l-6 m-7"
                >
                  <button>Sign Up</button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Nav;
