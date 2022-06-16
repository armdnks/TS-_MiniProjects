/**
 * @title Mousemove Parallax
 * @tuts  https://www.youtube.com/watch?v=dqzZ0SbSgHY
 */

type TCakeData = {
  layer: number;
  image: string;
  speed: number;
};

const cakeData: TCakeData[] = [
  { layer: 13, speed: 3, image: "./img/wafer-1.png" },
  { layer: 12, speed: 4, image: "./img/sprinkles-1.png" },
  { layer: 11, speed: 4, image: "./img/choco-1.png" },
  { layer: 10, speed: 5, image: "./img/choco-2.png" },
  { layer: 9, speed: 6, image: "./img/cake-1.png" },
  { layer: 8, speed: 7, image: "./img/choco-3.png" },
  { layer: 7, speed: 7, image: "./img/wafer-3.png" },
  { layer: 6, speed: 8, image: "./img/sprinkles-2.png" },
  { layer: 5, speed: 9, image: "./img/cake-2.png" },
  { layer: 4, speed: 6, image: "./img/choco-4.png" },
  { layer: 3, speed: 10, image: "./img/wafer-2.png" },
  { layer: 2, speed: 8, image: "./img/wafer-4.png" },
  { layer: 1, speed: 11, image: "./img/sprinkles-3.png" },
];

const cakeContainer = document.querySelector(".cake-container")! as HTMLDivElement;
cakeData.forEach((item: TCakeData) => {
  const cakeImage = new Image();
  cakeImage.src = item.image;
  cakeImage.alt = item.image.replace("./img/", "");
  cakeImage.style.zIndex = `${item.layer}`;
  cakeImage.setAttribute("data-speed", String(item.speed));
  cakeImage.classList.add("cake-image");
  cakeContainer.appendChild(cakeImage);
});

const cakeImages = document.querySelectorAll(".cake-image")! as NodeListOf<HTMLImageElement>;
window.addEventListener("mousemove", cakeParallax);
function cakeParallax(e: MouseEvent) {
  cakeImages.forEach((image: HTMLImageElement) => {
    const speed = Number(image.getAttribute("data-speed"));
    const mouseMove: number = 75;
    const windowCenter: number = 2.5;
    const w = window.innerWidth * windowCenter;
    const h = window.innerHeight * windowCenter;
    const x = (w - e.clientX * speed) / mouseMove;
    const y = (h - e.clientY * speed) / mouseMove;
    image.style.transform = `translate(${x}px, ${y}px)`;
  });
}
