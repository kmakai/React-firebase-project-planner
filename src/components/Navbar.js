import React from "react";
import "../styles/Navbar.css";

function Navbar({ user, signin, signout }) {
  return (
    <div className="navbar">
      <h1>Project-Planner</h1>

      <div className="sign-in-out">
        {user ? (
          <button onClick={signout}>log out</button>
        ) : (
          <button onClick={signin}>log in</button>
        )}
        {user && (
          <div className="user-profile">
            <img src={user.photoURL} alt="" />
            <p className="name">{user.displayName}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
