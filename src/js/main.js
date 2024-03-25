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
});