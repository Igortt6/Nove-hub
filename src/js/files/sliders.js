/*
Документація по роботі у шаблоні: 
Документація слайдера: https://swiperjs.com/
Сніппет(HTML): swiper
*/

// Підключаємо слайдер Swiper з node_modules
// При необхідності підключаємо додаткові модулі слайдера, вказуючи їх у {} через кому
// Приклад: { Navigation, Autoplay }
import Swiper, { Navigation, Autoplay, Pagination, Scrollbar } from 'swiper';
import lightGallery from 'lightgallery';
import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
/*
Основні модулі слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Детальніше дивись https://swiperjs.com/
*/

// Стилі Swiper
// Базові стилі
import "../../scss/base/swiper.scss";
// Повний набір стилів з scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Повний набір стилів з node_modules
// import 'swiper/css';

// Ініціалізація слайдерів
function initSliders() {
	// Список слайдерів
	// Перевіряємо, чи є слайдер на сторінці
	if (document.querySelector('.reviews-block__slider')) { // Вказуємо склас потрібного слайдера
		// Створюємо слайдер
		new Swiper('.reviews-block__slider', { // Вказуємо склас потрібного слайдера
			modules: [Navigation, Autoplay, Pagination],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 0,
			autoHeight: true,
			speed: 800,
			loop: true,
			pagination: {
				el: ".reviews-block__pagination",
				clickable: true,
				dynamicBullets: true
			},
			navigation: {
				prevEl: ".reviews-block__button-prev",
				nextEl: ".reviews-block__button-next"
			},
			on: {}
		});
	}
	if (document.querySelector('.car-gallery__slider')) { // Вказуємо склас потрібного слайдера
		let $lgSwiper = document.getElementById('lg-swipper');
		// Створюємо слайдер
		const swiper = new Swiper('.car-gallery__slider', { // Вказуємо склас потрібного слайдера
			modules: [],
			observer: true,
			observeParents: true,
			slidesPerView: 3,
			spaceBetween: 10,
			autoHeight: true,
			speed: 800,

			on: {
				init: function () {
					const lg = lightGallery($lgSwiper, {
						download: false,
						closable: true,
						plugins: [lgThumbnail],
						licenseKey: '7EC452A9-0CFD441C-BD984C7C-17C8456E',
						speed: 500,
						mobileSettings: { controls: false, showCloseIcon: true, download: false, },
					});

					// Before closing lightGallery, make sure swiper slide
					// is aligned with the lightGallery active slide
					$lgSwiper.addEventListener('lgBeforeClose', () => {
						swiper.slideTo(lg.index, 0)
					});
				},
			}
		});
	}
}
// Скролл на базі слайдера (за класом swiper scroll для оболонки слайдера)
function initSlidersScroll() {
	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск ініціалізації слайдерів
	initSliders();
	// Запуск ініціалізації скролла на базі слайдера (за класом swiper_scroll)
	//initSlidersScroll();
});