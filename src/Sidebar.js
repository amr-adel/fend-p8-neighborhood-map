import React from "react";
import List from "./List";
import Footer from "./Footer";
import logo from "./images/malls-of-cairo-logo.svg";

const Sidebar = props => {
  return (
    <section className="sidebar">
      <header className="header">
        <div className="brand">
          <h1>
            <img src={logo} alt="Malls of Cairo logo" />
          </h1>
        </div>
      </header>

      <List {...props} />

      <Footer />
    </section>
  );
};

export default Sidebar;
