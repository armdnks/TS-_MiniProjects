function getElement(selection: string) {
  const element = document.querySelector(selection)!;
  if (element) {
    return element;
  }
  throw new Error(`Please check "${selection}" selector, no such element exists`);
}

class Gallery {
  element;
  galleryContainer;
  thumbImages: HTMLImageElement[];
  modal;
  modalMainImage: HTMLImageElement;
  modalImageName: HTMLHeadingElement;
  modalImages;
  modalThumbImages;
  modalCloseBtn;
  modalNextBtn;
  modalPrevBtn;

  constructor(element: Element) {
    this.element = element;
    this.galleryContainer = getElement('.gallery-container')! as HTMLDivElement;
    this.thumbImages = [...element.querySelectorAll('.gallery-thumb-image')]! as HTMLImageElement[];
    this.modal = getElement('.modal');
    this.modalMainImage = getElement('.modal-main-image')! as HTMLImageElement;
    this.modalImageName = getElement('.modal-image-name')! as HTMLHeadingElement;
    this.modalImages = getElement('.modal-images');
    this.modalThumbImages = getElement('.modal-thumb-image');
    this.modalCloseBtn = getElement('.modal-close-btn')! as HTMLButtonElement;
    this.modalNextBtn = getElement('.modal-next-btn')! as HTMLButtonElement;
    this.modalPrevBtn = getElement('.modal-prev-btn')! as HTMLButtonElement;

    this.element.addEventListener(
      'click',
      function (this: Gallery, e: Event) {
        const target = e.target as HTMLImageElement;

        if (target.parentElement!.classList.contains('gallery-thumb-image')) {
          this.openModal(target, this.thumbImages);
        }
      }.bind(this)
    );

    this.closeModal = this.closeModal.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.prevImage = this.prevImage.bind(this);
    this.setMainImage = this.setMainImage.bind(this);
    this.chooseImage = this.chooseImage.bind(this);
  }

  openModal(selectedImage: HTMLImageElement, list: HTMLImageElement[]) {
    this.modal.classList.add('open');
    this.setMainImage(selectedImage);
    this.modalImages.innerHTML = list
      .map(function (image: HTMLDivElement) {
        return `
            <div class="${selectedImage.parentElement!.dataset.id === image.dataset.id ? 'modal-thumb-image selected' : 'modal-thumb-image'}" title="${image.title}" data-id="${image.dataset.id}">
                <img src="${(image.children[0] as HTMLImageElement).src}" alt="${(image.children[0] as HTMLImageElement).alt}" />
            </div>
        `;
      })
      .join('');
    this.modalCloseBtn.addEventListener('click', this.closeModal);
    this.modalNextBtn.addEventListener('click', this.nextImage);
    this.modalPrevBtn.addEventListener('click', this.prevImage);
    this.modalImages.addEventListener('click', this.chooseImage);
  }

  setMainImage(selectedImage: HTMLImageElement) {
    this.modalMainImage.src = selectedImage.src;
    this.modalImageName.textContent = selectedImage.parentElement!.title;
  }

  closeModal() {
    this.modal.classList.remove('open');
    this.modalCloseBtn.removeEventListener('click', this.closeModal);
    this.modalNextBtn.removeEventListener('click', this.nextImage);
    this.modalPrevBtn.removeEventListener('click', this.prevImage);
    this.modalImages.removeEventListener('click', this.chooseImage);
  }

  nextImage() {
    const selected = this.modalImages.querySelector('.selected')! as HTMLDivElement;
    const next = (selected.nextElementSibling || this.modalImages.firstElementChild)! as HTMLDivElement;
    selected.classList.remove('selected');
    next.classList.add('selected');
    this.setMainImage(next.children[0] as HTMLImageElement);
  }

  prevImage() {
    const selected = this.modalImages.querySelector('.selected')! as HTMLDivElement;
    const prev = (selected.previousElementSibling || this.modalImages.lastElementChild)! as HTMLDivElement;
    selected.classList.remove('selected');
    prev.classList.add('selected');
    this.setMainImage(prev.children[0] as HTMLImageElement);
  }

  chooseImage(e: Event) {
    const target = e.target as HTMLImageElement;
    if (target.parentElement!.classList.contains('modal-thumb-image')) {
      const selected = this.modalImages.querySelector('.selected')! as HTMLDivElement;
      selected.classList.remove('selected');
      this.setMainImage(target);
      target.parentElement!.classList.add('selected');
    }
  }
}

const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));
