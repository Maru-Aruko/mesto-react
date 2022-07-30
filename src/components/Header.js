import React from "react";
import Logo from "../images/logo.svg";

function Header() {
    return (
        <header className="header">
            <div className="header__logo" src={Logo} alt="Логотип «Место»"></div>
        </header>
    )
}

export default Header;