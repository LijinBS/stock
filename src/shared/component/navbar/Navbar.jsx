import React, { useState } from 'react';
import './Navbar.scss';
function NavBar() {
    const [active, setActive] = useState('home')
    const handleClick = (value) => {
        setActive(value)
    }
    return (
        <div className="navbar"> 
        <ul>
            <li onClick={() => handleClick('home')}><a className={active === 'home' ? 'active' : ''} href="#home">Stocks</a></li>
            <li onClick={() => handleClick('news')}><a className={active === 'news' ? 'active' : ''} href="#news">Mutual Fund</a></li>
            <li onClick={() => handleClick('contact')}><a className={active === 'contact' ? 'active' : ''} href="#contact">Fixed Deposit</a></li>
            <li onClick={() => handleClick('about')}><a className={active === 'about' ? 'active' : ''}href="#about">US Stocks</a></li>
        </ul>
        </div>
    )
}


export default NavBar

