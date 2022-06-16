function createNavbar() {
  let navbar = document.getElementById('navbar')! as HTMLElement;
  const homepagePath: string = '../../../index.html';
  navbar.innerHTML = `
    <div class="navbar-btn-container">
      <div class="navbar-back-btn">
          <i class="material-icons">chevron_left</i>
          <a href=${homepagePath}>back</a>
      </div>
    </div>
  `;

  // insert link tag to header
  const styleSheet: string = 'stylesheet';
  const materialIconsUrl: string = 'https://fonts.googleapis.com/icon?family=Material+Icons';
  const navbarStyleLink: string = '../../navbar/navbar.css';
  // material icons link
  let materialIconsLink = document.createElement('link')! as HTMLLinkElement;
  materialIconsLink.rel = styleSheet;
  materialIconsLink.href = materialIconsUrl;
  document.head.appendChild(materialIconsLink);
  // navbar style link
  let styleCssLink = document.createElement('link')! as HTMLLinkElement;
  styleCssLink.rel = styleSheet;
  styleCssLink.href = navbarStyleLink;
  document.head.appendChild(styleCssLink);
}

createNavbar();
