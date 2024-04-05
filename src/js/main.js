document.addEventListener('DOMContentLoaded', () => {
    acordeon();
    gallery('.promo__collage-item:first-child', "75000");
    gallery('.promo__collage-item:nth-child(2)', "80000");

    animation();
    gridAnimation();
    validForm();


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

        titleWrapers.forEach((el, ind) => {
            el.addEventListener('click', () => {
                if (!contentBlocks[ind].classList.contains('content-active')) {
                    if (window.innerWidth > 992) {
                        const maxHeigth = Math.max(window.getComputedStyle(contentBlocks[ind].querySelector('.faq-list__item-description')).height.slice(0, -2));
                        contentBlocks[ind].style.height = `${maxHeigth + 16}px`;
                        // contentBlocks[ind].style.paddingTop = `10px`;
                    } else {
                        const sumHeigth = +window.getComputedStyle(contentBlocks[ind].querySelector('.faq-list__item-description')).height.slice(0, -2);
                        console.log(sumHeigth);
                        contentBlocks[ind].style.height = `${sumHeigth + 16}px`;
                        // contentBlocks[ind].style.paddingTop = `10px`;
                    }

                    contentBlocks[ind].classList.add('content-active');

                    el.classList.add('faq-list__item-active')
                } else {
                    contentBlocks[ind].classList.remove('content-active');
                    contentBlocks[ind].style.height = `0px`;
                    // contentBlocks[ind].style.paddingTop = `0`;

                    el.classList.remove('faq-list__item-active')
                }
            });
        });

    }

    // MODALS
    const overlay = document.querySelector('.overlay');
    const closeButtons = document.querySelectorAll('.modal__close-icon');
    const buttons = document.querySelectorAll("[data-modal='modal-form']");
    const priceCatalog = document.getElementById('price-catalog');

    buttons.forEach(function (item) {
        if (item.hasAttribute('data-modal')) {
            item.addEventListener('click', function (e) {
                e.preventDefault();
                priceCatalog.classList.add('show');
                overlay.classList.add('show');
                document.body.style.overflow = 'hidden';
                document.body.style.paddingRight = '8px';
            });
        }
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

    //marketplaces tabs
    const headlines = document.querySelectorAll('.marketplaces__grid-item');
    const content = document.querySelectorAll('.marketplaces__content-item');

    headlines.forEach((el, ind) => {
        el.addEventListener('click', () => {
            headlines.forEach(el => {
                el.dataset.active = 'false';
            });
            content.forEach(el => {
                el.dataset.active = 'false';
            });

            el.dataset.active = 'true';
            content[ind].dataset.active = 'true';
        });
    });
});

function gallery(wrapperItem, transition) {
    const wrapper = document.querySelector(wrapperItem);

    shift();

    function shift() {
        const firstItem = wrapper.querySelector('.promo__collage-column');

        const itemHeight = window.getComputedStyle(firstItem).height.slice(0, -2);
        const gap = window.getComputedStyle(wrapper).gap.slice(0, -2);
        wrapper.style.top = `-${+itemHeight + +gap}px`;
        wrapper.style.transition = `all ${transition}ms linear`;

        setTimeout(() => {
            firstItem.remove();
            wrapper.append(firstItem);
            wrapper.style.transition = `unset`;
            wrapper.style.top = `0px`;

            shift();
        }, transition);
    }
}

function animation() {
    const animatedItems = document.querySelectorAll('[data-js="animated-item"]');
    function onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                change.target.classList.add('animation_done');
            }
        });
    }

    let options = { threshold: [0.4] };
    let observer = new IntersectionObserver(onEntry, options);

    animatedItems.forEach(el => {
        observer.observe(el);
    });
}

function gridAnimation() {
    const animatedItem = document.querySelector('[data-js="grid-animation"]');
    function onEntry(entry) {
        entry.forEach(change => {
            if (change.isIntersecting) {
                setTimeout(() => {
                    change.target.classList.add('grid-animation_done');
                }, 400)
            }
        });
    }

    let options = { threshold: [0.5] };
    let observer = new IntersectionObserver(onEntry, options);

    observer.observe(animatedItem);
}

function validForm() {
    const validateEmail = (email) => {
        return String(email).toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    document.querySelectorAll('[data-form="contact"]').forEach(el => {
        validation(el);
    });

    function validation(parentForm) {
        const form = parentForm,
            formInputs = form.querySelectorAll('input:not([type="submit"])');

        form.addEventListener('submit', e => {
            statusForSendingData = true;

            formInputs.forEach(el => {
                if (el.name == 'email' && !validateEmail(el.value)) {
                    el.labels[0].classList.add('incorrect');
                    statusForSendingData = false;
                    el.placeholder = "Обязательное поле*";
                }

                if (el.name == 'name' && !el.value) {
                    el.labels[0].classList.add('incorrect');
                    statusForSendingData = false;
                    el.placeholder = "Обязательное поле*";
                }

                if (el.name == 'phone') {
                    if (el.value.toString().length < 8 || isNaN(el.value)) {
                        el.labels[0].classList.add('incorrect');
                        statusForSendingData = false;
                        el.placeholder = "Обязательное поле*";
                    }
                }
            });

            if (statusForSendingData) {
                e.preventDefault();
                if (e.currentTarget.id == "form-buyer") {
                    const successMessage = document.querySelector('.buyer__wrapper-2');
                    const wrapper1 = document.querySelector('.buyer__wrapper-1');

                    successMessage.style.display = 'block';
                    form.style.display = 'flex';
                    wrapper1.style.display = 'none';
                } else if (e.currentTarget.id == "form-modal") {
                    const modalWrapper1 = document.querySelector('.modal__wrapper-1');
                    const thanksMessage = document.querySelector('.modal__wrapper-2');

                    modalWrapper1.style.display = 'none';
                    thanksMessage.style.display = 'block';
                }
            } else {
                e.preventDefault();
            }
        });

        formInputs.forEach(el => el.addEventListener('input', () => {
            el.labels[0].classList.remove('incorrect');
            el.placeholder = "";
        }));
    }
}
