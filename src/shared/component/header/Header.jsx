import React from "react";
import logo from "../../../assets/icons/logo.svg";
import notification from "../../../assets/icons/notification1.svg";
import cart from "../../../assets/icons/shopping-cart.svg";
import "./Header.scss";

function Header() {
  return (
    <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="sections">
          <div className="section">Explore</div>
          <div className="section">Investments</div>
        </div>
        <div className="input-box">
          <input
            className="text-box"
            type="text"
            placeholder="What are you looking for?"
          />
        </div>
        <div className="button-groups">
          <img
            className="icon notification"
            src={notification}
            alt="notification"
          />
          <img className="icon cart" src={cart} alt="cart" />
        </div>
    </div>
  );
}

export default Header;
