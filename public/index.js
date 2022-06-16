"use strict";
// fetch JSON
const response = fetch('../index.json');
response
    .then((result) => result.json())
    .then((data) => homeButton(data))
    .catch((error) => console.log(error));
// home button
function homeButton(data) {
    const showcaseContainer = document.querySelector('.showcase-container');
    const linksData = data
        .map((item) => {
        const { title, href, image } = item;
        return /*html*/ `
        <a href="${href}" class="showcase-link">
          <p class="showcase-title">${title}</p>
          <img src="${image}" alt="${title}" class="showcase-thumbnail" />
        </a>
      `;
    })
        .join('');
    showcaseContainer.innerHTML = linksData;
}
