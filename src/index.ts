// HOME BUTTON LINKS
type TData = {
  title: string;
  href: string;
  image: string;
};

// fetch JSON
const response = fetch('../index.json');

response
  .then((result: Response) => result.json())
  .then((data: TData[]) => homeButton(data))
  .catch((error: Error) => console.log(error));

// home button
function homeButton(data: TData[]) {
  const showcaseContainer = document.querySelector('.showcase-container')! as HTMLDivElement;

  const linksData = data
    .map((item: TData) => {
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
