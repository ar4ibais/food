window.addEventListener('DOMContentLoaded', () => {
    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');


    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active')
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e, i) => {
        const target = e.target;

        if (target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });




    // Timer

    const deadline = '2023-08-01';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60)) % 24),
            minutes = Math.floor((t / (1000 * 60)) % 60),
            seconds = Math.floor((t / (1000)) % 60);

        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function setZero(num) {
        if (num < 10) {
            return `0${num}`
        } else {
            return num;
        }
    }


    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = setZero(t.days);
            hours.innerHTML = setZero(t.hours);
            minutes.innerHTML = setZero(t.minutes);
            seconds.innerHTML = setZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modals

    const openBtns = document.querySelectorAll('[data-modal=""]'),
        closeBtn = document.querySelector('[data-close=""]'),
        modal = document.querySelector('.modal');


    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.querySelector('body').style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.querySelector('body').style.overflow = '';
        clearInterval(modalTimerId);
    }

    openBtns.forEach(btn => {
        btn.addEventListener('click', openModal);
    });


    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('keydown', e => {
        if (modal.classList.contains('show') && e.code == 'Escape') {
            closeModal();
        }
    });

    modal.addEventListener('click', e => {
        const target = e.target;

        if (target.classList.contains('modal')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 30000);

    function showModalByScroll() {
        if (document.documentElement.scrollHeight <= document.documentElement.scrollTop + document.documentElement.clientHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    // Cards with classes

    class MenuCard {
        constructor(img, title, descr, price) {
            this.img = img;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 37;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = Math.floor(this.price / this.transfer);
        }

        render() {

            const elem = document.createElement('div');
            elem.classList.add('menu__item');
            elem.innerHTML = `
                <img src=${this.img} alt="vegy">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> $/день</div>
                </div> 
            `;
            return elem;
        }
    }

    const fitnessProg = new MenuCard("img/tabs/vegy.jpg", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 229),
        premiumProg = new MenuCard("img/tabs/elite.jpg",
            'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 550),
        postProg = new MenuCard("img/tabs/post.jpg", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 430);

    const menuField = document.querySelector('.menu__field .container');

    menuField.append(fitnessProg.render());
    menuField.append(premiumProg.render());
    menuField.append(postProg.render());
});