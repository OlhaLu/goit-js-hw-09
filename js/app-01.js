'use strics';

import { images } from './gallery-items.js';

// функция перебора массива и добавление всех найденных елементов в ul
function createImgGallery(images) {
  const gallery = document.querySelector('.gallery');
  images.forEach(image => {
    gallery.appendChild(createLiElement(image));
  });
}

// функция создания елементов li с атрибутами согласно разметке
function createLiElement({ preview, original, description }) {
  const li = document.createElement('li');
  li.classList.add('gallery__item');

  const a = document.createElement('a');
  a.classList.add('gallery_link');
  a.setAttribute('href', original);

  const img = document.createElement('img');
  img.classList.add('gallery__image');
  img.setAttribute('src', preview);
  img.setAttribute('data-source', original);
  img.setAttribute('alt', description);

  const span = document.createElement('span');
  span.classList.add('gallery__icon');
  const i = document.createElement('i');
  i.classList.add('material-icons');
  i.textContent = 'zoom_out_map';

  li.appendChild(a, span);
  a.appendChild(img);

  return li;
}

createImgGallery(images);

// слушатель событий click на open и close модального окна
const overlayMenu = document.querySelector('.gallery');
overlayMenu.addEventListener('click', openModal);
const closeOverlayMenu = document.querySelector(
  'button[data-action="close-modal"]',
);
closeOverlayMenu.addEventListener('click', closeModal);

// функция открытия модального окна с записью атрибутов src, alt в div.content
function openModal(event) {
  event.preventDefault();
  const imgAlt = event.target.alt;
  const imgSource = event.target.dataset.source;

  const overlay = document.querySelector('.overlay');
  const openModImg = overlay.querySelector('img');
  openModImg.setAttribute('src', imgSource);
  openModImg.setAttribute('alt', imgAlt);
  overlay.classList.add('is-visible');
  window.addEventListener('keydown', handleEscPress);
}

// функция закрытия модального окна
function closeModal(event) {
  const overlay = document.querySelector('.overlay');
  const openModImg = overlay.querySelector('img');
  openModImg.setAttribute('src', '');
  overlay.classList.remove('is-visible');
  window.removeEventListener('keydown', handleEscPress);
}

// закрытие модального окна по клику на серую зону div.overlay
const backdrop = document.querySelector('.overlay');
backdrop.addEventListener('click', backdropClick);

function backdropClick() {
  if (event.target !== event.currentTarget) {
    return;
  }
  closeModal();
}

// закрытие модального окна по нажатию на Esc
function handleEscPress(event) {
  if (event.code !== 'Escape') {
    return;
  }
  closeModal();
}
