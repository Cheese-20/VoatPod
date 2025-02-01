import "../src/index.css";

import logo from "../assets/logo.png";

export const  PodNavigation =()=>{
    return (
        <header className="nav-container">
             <img src={logo} alt="Voat" className="logo" />
             <ul className="nav-links">
                    <li><a href="/Home">Home</a></li>
                    <li><a href="/Search">Search</a></li>
                    <li><a href="/Profile">Profile</a></li>
             </ul>
        </header>
    )
}