document.addEventListener('DOMContentLoaded', () => {
    acordeon();

    // mob menu
    const mobMenu = document.querySelector('.header');
    const burger = document.querySelector('.hamburger');
    const mobLinks = document.querySelectorAll('.menu__link');
    let mobMenuActive = false;

    burger.addEventListener('click', (e) => {
        if (mobMenuActive) {
            burger.classList.remove('hamburger__icon-active');
            mobMenu.style.left = "-100%";
            mobMenuActive = false;
            document.body.style.overflow = '';
        } else {
            burger.classList.add('hamburger__icon-active');
            mobMenu.style.left = 0;
            mobMenuActive = true;
            document.body.style.overflow = 'hidden';
        }
    });

    mobLinks.forEach(el => el.addEventListener('click', () => {
        if (mobMenuActive) {
            burger.classList.remove('hamburger__icon-active');
            mobMenu.style.left = "-100%";
            mobMenuActive = false;
            document.body.style.overflow = '';
        }
    }));

    // acordeon
    function acordeon() {
        const titleWrapers = document.querySelectorAll('.faq-list__item-title');
        const contentBlocks = document.querySelectorAll('.faq-list__item-content');
    
        titleWrapers.forEach((el,ind) => {
            el.addEventListener('click', () => {
                if (!contentBlocks[ind].classList.contains('content-active')) {
                    if (window.innerWidth > 992) {
                        const maxHeigth = Math.max(window.getComputedStyle(contentBlocks[ind].querySelector('.faq-list__item-description')).height.slice(0,-2));
                        contentBlocks[ind].style.height = `${maxHeigth + 16}px`;
                        contentBlocks[ind].style.paddingTop = `10px`;
                    } else {
                        const sumHeigth = +window.getComputedStyle(contentBlocks[ind].querySelector('.faq-list__item-description')).height.slice(0,-2);
                        console.log(sumHeigth);
                        contentBlocks[ind].style.height = `${sumHeigth + 16}px`;
                        contentBlocks[ind].style.paddingTop = `10px`;
                    }
                    
                    contentBlocks[ind].classList.add('content-active');

                    el.classList.add('faq-list__item-active')
                } else {
                    contentBlocks[ind].classList.remove('content-active');
                    contentBlocks[ind].style.height = `0px`;
                    contentBlocks[ind].style.paddingTop = `0`;
    
                    el.classList.remove('faq-list__item-active')
                }
            });
        });
    
    }

    // MODALS
    const overlay = document.querySelector('.overlay');
    const closeButtons = document.querySelectorAll('.modal__close-icon');
    const buttons = document.querySelectorAll("*[data-modal='*']");
    const infoBtn = document.querySelector('.info__btn');
    const promoBtn = document.querySelector('.promo__btn');
    const priceCatalog = document.getElementById('price-catalog');

    buttons.forEach(function (item) {
        if (item.hasAttribute('data-modal')) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                const attr = this.getAttribute('data-modal'),
                    modalWindow = document.getElementById(`${attr}`);

                modalWindow.classList.add('show');
                overlay.classList.add('show');
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = '12px';
            });
        }
    });

    infoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        priceCatalog.classList.add('show');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '12px';
    });

    promoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        priceCatalog.classList.add('show');
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '12px';
    });

    closeButtons.forEach(function (item) {
        item.addEventListener('click', function () {
            const modal = this.closest('.modal');

            modal.classList.remove('show');
            overlay.classList.remove('show');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
        });
    });

    overlay.addEventListener('click', function () {
        document.querySelector('.modal.show').classList.remove('show');
        this.classList.remove('show');
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
    });

    // form buyer validation
    // const formInput = document.querySelector('.contacts__form input');
    const formBtn = document.querySelector('.buyer__form-button');
    const wrapper1 = document.querySelector('.buyer__wrapper-1');
    const successMessage = document.querySelector('.buyer__wrapper-2');
    const form = document.querySelector('.buyer__form'); 

    formBtn.addEventListener('click', event => {
        event.preventDefault();

        // if (!formInput.value) {
        //     formInput.labels[0].classList.add('input-incorrect');
        // } else {
            //Тут має бути відправка даних
            wrapper1.style.display = 'none';
            successMessage.style.display = 'block';
            form.style.display = 'flex';
        // }
    });

    // formInput.addEventListener('input', event => {
    //     event.target.labels[0].classList.remove('input-incorrect');
    // });
});