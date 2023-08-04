import { getResource } from "../services/services";

const cards = () => {
    // Cards with classes
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.transfer = 37;
            this.changeToUAH();
            this.parent = document.querySelector(parentSelector);
        }

        changeToUAH() {
            this.price = Math.floor(this.price * this.transfer);
        }

        render() {
            const elem = document.createElement('div');
            if (this.classes.length != 0) {
                this.classes.forEach(className => {
                    elem.classList.add(className);
                });
            } else {
                this.element = 'menu__item';
                elem.classList.add(this.element);
            }
            elem.innerHTML = `
            <img src=${this.src} alt="${this.alt}">
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div> 
        `;

            this.parent.append(elem);
        }
    };

    getResource('http://localhost:3000/menu');

    getResource('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({ img, altimg, title, descr, price }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            })
        })
}


export default cards;