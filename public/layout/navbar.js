"use strict";
function createNavbar() {
    let navbar = document.getElementById("navbar");
    const homepagePath = "../../../index.html";
    navbar.innerHTML = `
    <div class="navbar-btn-container">
      <div class="navbar-back-btn">
          <i class="material-icons">chevron_left</i>
          <a href=${homepagePath}>back</a>
      </div>
    </div>
  `;
    // insert link tag to header
    const styleSheet = "stylesheet";
    const materialIconsUrl = "https://fonts.googleapis.com/icon?family=Material+Icons";
    const navbarStyleLink = "../../layout/navbar.css";
    // material icons link
    let materialIconsLink = document.createElement("link");
    materialIconsLink.rel = styleSheet;
    materialIconsLink.href = materialIconsUrl;
    document.head.appendChild(materialIconsLink);
    // navbar style link
    let styleCssLink = document.createElement("link");
    styleCssLink.rel = styleSheet;
    styleCssLink.href = navbarStyleLink;
    document.head.appendChild(styleCssLink);
}
createNavbar();
