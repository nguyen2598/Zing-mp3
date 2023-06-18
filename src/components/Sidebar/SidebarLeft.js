import React from 'react';
import './Sidebar.scss';

import logo from '../../assest/image/logo.svg';
import { menuSlidebar } from '../../ultis/menu';
import { NavLink, useNavigate } from 'react-router-dom';
import path from '../../ultis/path';

const notActiveStyle = '';
const activeStyle = '';
function Sidebarleft() {
    const navigate = useNavigate();
    return (
        <div className="sidebar-left">
            <div className="sidebar-left--logo" onClick={() => navigate(`\/${path.HOME}`)}>
                <img src={logo} alt="logo zing mp3" />
            </div>
            <div className="sidebar-left--nav">
                {menuSlidebar.map((item, index) => (
                    <NavLink to={item.path} className="sidebar-left--nav__item" key={item.path}>
                        {item.icon}
                        <span>{item.text}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
}

export default Sidebarleft;
