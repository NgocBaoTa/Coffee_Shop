/** @format */

import React from "react";
import "./footer.css";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PermPhoneMsgRoundedIcon from "@mui/icons-material/PermPhoneMsgRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <div className="footer_container--bg">
      <div className="footer_container grid wide">
        <div className="footer_left l-6 m-6 c-12">
          <div className="footer_left--heading">Bean Coffee</div>
          <div className="footer_left--text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </div>
        </div>
        <div className="footer_right l-6 m-6 c-12">
          <div className="footer_right--heading">Contact</div>
          <div className="footer_right--address footer_right--item">
            <LocationOnRoundedIcon className="footer_right--icon" />
            <div className="footer_right--text">
              16 Edgeware Dr, Etobicoke, Toronto, ON, Canada
            </div>
          </div>
          <div className="footer_right--phone footer_right--item">
            <PermPhoneMsgRoundedIcon className="footer_right--icon" />
            <div className="footer_right--text">1234567890</div>
          </div>
          <div className="footer_right--email footer_right--item">
            <EmailRoundedIcon className="footer_right--icon" />
            <div className="footer_right--text">abc@gmail.com</div>
          </div>
          <div className="footer_right--media footer_right--item">
            <FacebookRoundedIcon className="footer_right--icon" />
            <InstagramIcon className="footer_right--icon" />
            <YouTubeIcon className="footer_right--icon" />
            <TwitterIcon className="footer_right--icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
