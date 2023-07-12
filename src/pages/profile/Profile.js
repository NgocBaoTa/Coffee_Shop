/** @format */

import React from "react";
import "./profile.css";
import Nav from "../../components/header/Nav";

import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
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

function Profile() {
  return (
    <>
      <div className="profile_background_nav">
        <Nav />
      </div>
      <div className="profile_main">
        <div className="profile_main--avatar">
          <IconButton sx={{ p: 0 }}>
            <Stack direction="row" spacing={2}>
              <Avatar
                {...stringAvatar(
                  JSON.parse(localStorage.getItem("user")).username
                )}
                sx={{ width: 120, height: 120, fontSize: 40 }}
              />
            </Stack>
                  </IconButton>
                  
                  <div className="profile_change_avatar">Change avatar</div>
        </div>
      </div>
    </>
  );
}

export default Profile;
