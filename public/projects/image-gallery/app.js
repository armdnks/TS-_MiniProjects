"use strict";
function getElement(selection) {
    const element = document.querySelector(selection);
    if (element) {
        return element;
    }
    throw new Error(`Please check "${selection}" selector, no such element exists`);
}
class Gallery {
    constructor(element) {
        this.element = element;
        this.galleryContainer = getElement('.gallery-container');
        this.thumbImages = [...element.querySelectorAll('.gallery-thumb-image')];
        this.modal = getElement('.modal');
        this.modalMainImage = getElement('.modal-main-image');
        this.modalImageName = getElement('.modal-image-name');
        this.modalImages = getElement('.modal-images');
        this.modalThumbImages = getElement('.modal-thumb-image');
        this.modalCloseBtn = getElement('.modal-close-btn');
        this.modalNextBtn = getElement('.modal-next-btn');
        this.modalPrevBtn = getElement('.modal-prev-btn');
        this.element.addEventListener('click', function (e) {
            const target = e.target;
            if (target.parentElement.classList.contains('gallery-thumb-image')) {
                this.openModal(target, this.thumbImages);
            }
        }.bind(this));
        this.closeModal = this.closeModal.bind(this);
        this.nextImage = this.nextImage.bind(this);
        this.prevImage = this.prevImage.bind(this);
        this.setMainImage = this.setMainImage.bind(this);
        this.chooseImage = this.chooseImage.bind(this);
    }
    openModal(selectedImage, list) {
        this.modal.classList.add('open');
        this.setMainImage(selectedImage);
        this.modalImages.innerHTML = list
            .map(function (image) {
            return `
            <div class="${selectedImage.parentElement.dataset.id === image.dataset.id ? 'modal-thumb-image selected' : 'modal-thumb-image'}" title="${image.title}" data-id="${image.dataset.id}">
                <img src="${image.children[0].src}" alt="${image.children[0].alt}" />
            </div>
        `;
        })
            .join('');
        this.modalCloseBtn.addEventListener('click', this.closeModal);
        this.modalNextBtn.addEventListener('click', this.nextImage);
        this.modalPrevBtn.addEventListener('click', this.prevImage);
        this.modalImages.addEventListener('click', this.chooseImage);
    }
    setMainImage(selectedImage) {
        this.modalMainImage.src = selectedImage.src;
        this.modalImageName.textContent = selectedImage.parentElement.title;
    }
    closeModal() {
        this.modal.classList.remove('open');
        this.modalCloseBtn.removeEventListener('click', this.closeModal);
        this.modalNextBtn.removeEventListener('click', this.nextImage);
        this.modalPrevBtn.removeEventListener('click', this.prevImage);
        this.modalImages.removeEventListener('click', this.chooseImage);
    }
    nextImage() {
        const selected = this.modalImages.querySelector('.selected');
        const next = (selected.nextElementSibling || this.modalImages.firstElementChild);
        selected.classList.remove('selected');
        next.classList.add('selected');
        this.setMainImage(next.children[0]);
    }
    prevImage() {
        const selected = this.modalImages.querySelector('.selected');
        const prev = (selected.previousElementSibling || this.modalImages.lastElementChild);
        selected.classList.remove('selected');
        prev.classList.add('selected');
        this.setMainImage(prev.children[0]);
    }
    chooseImage(e) {
        const target = e.target;
        if (target.parentElement.classList.contains('modal-thumb-image')) {
            const selected = this.modalImages.querySelector('.selected');
            selected.classList.remove('selected');
            this.setMainImage(target);
            target.parentElement.classList.add('selected');
        }
    }
}
const nature = new Gallery(getElement('.nature'));
const city = new Gallery(getElement('.city'));
