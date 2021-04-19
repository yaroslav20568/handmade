$(window).on('load', function() {
    $(function(){
        $('.slider').slick();
        $('.current-good-slider').slick();
    });
});

$('document').ready(function() {
    $("input[name=phone]").inputmask("+375(99)999-9999");
});

window.addEventListener('DOMContentLoaded', () => {
    // let cardTitle = document.querySelector('.card__title');
    // let cardText = document.querySelector('.card__text');

    // console.log(cardTitle.textContent.length);

    // function del(elem) {
    //     if(elem.textContent.length > 20) {
    //         elem.textContent = `${elem.textContent.substring(0, 20)}...`;
    //         console.log(elem.textContent);
    //     }
    // }

    // del(cardTitle);
    // del(cardText);

    window.addEventListener('unload', () => {
        document.documentElement.scrollTop = 0;
    });

    /* MODAL */
    let orderButton = document.querySelector('.good__button-order');
    let shoppingCartButton = document.querySelector('.good__button-cart');
    let modal = document.querySelector('.modal');
    let shopingCart = document.querySelector('.shoping-cart');
    let modalCloseBtn = document.querySelectorAll('[data-modalClose]');
    let modalInputs = document.querySelectorAll('.modal .modal__input');
    let modalSubmit = document.querySelector('.modal__button');

    const openModal = (poputpItem) => {
        poputpItem.classList.remove('hide');
        poputpItem.classList.add('show');
        document.body.style.overflow = 'hidden';
        modalInputs.forEach((input) => {
            input.value = '';
            input.style.border = 'none';
        });
    };
    
    const closeModal = (poputpItem) => {
        poputpItem.classList.remove('show');
        poputpItem.classList.add('hide');
        document.body.style.overflow = 'auto';
    };

    if(orderButton) {
        orderButton.addEventListener('click', () => {
            openModal(modal);
        });
    }

    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    }

    shopingCart.addEventListener('click', (e) => {
        if (e.target === shopingCart) {
            closeModal(shopingCart);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(modal){
            if (e.code === 'Escape' && modal.classList.contains('show')) {
                closeModal(modal);
            }
        }
        if (e.code === 'Escape' && shopingCart.classList.contains('show')) {
            closeModal(shopingCart);
        }
    });
    
    modalCloseBtn.forEach(item => {
        item.addEventListener('click', () => {
            // console.log(item.parentElement.parentElement.parentElement.parentElement);
            if (item.classList.contains('modal__close')) {
                closeModal(modal);
            }
            if (item.classList.contains('shoping-cart__close')) {
                closeModal(shopingCart);
            }
        });
    });


    /* REG */
    let regFIO = /([а-яё]+|[a-z]+[\-\s]?){3,}/;
    let regPhone = /\+\d{3}\(\d{2}\)\d{3}-\d{4}/;
    let regAddress = /^(?!\s*$)[-\/'"№., 0-9а-яА-Я, a-z, A-Z]+$/;
    let regIndex = /^\d{6}$/;
    let regEmail = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;


    function validated () {
            let i = 0;
            if(!regFIO.test(modalInputs[0].value) || modalInputs[0].value.length < 6 || modalInputs[0].value.length > 30) {
                modalInputs[0].style.border = '1px solid red';
            } else if(regFIO.test(modalInputs[0].value)) {
                i++;
                modalInputs[0].style.border = '1px solid #fff';
            }
            if(!regPhone.test(modalInputs[1].value)) {
                modalInputs[1].style.border = '1px solid red';
            } else if(regPhone.test(modalInputs[1].value)) {
                i++;
                modalInputs[1].style.border = '1px solid #fff';
            }
            if(!regAddress.test(modalInputs[2].value) || modalInputs[2].value.length < 6 ||  modalInputs[2].value.length > 30) {
                modalInputs[2].style.border = '1px solid red';
            } else if(regAddress.test(modalInputs[2].value)) {
                i++;
                modalInputs[2].style.border = '1px solid #fff';
            }
            if(!regIndex.test(modalInputs[3].value)) {
                modalInputs[3].style.border = '1px solid red';
            } else if(regIndex.test(modalInputs[3].value)) {
                i++;
                modalInputs[3].style.border = '1px solid #fff';
            } 
            if(!regEmail.test(modalInputs[4].value) || modalInputs[4].value.length > 25) {
                modalInputs[4].style.border = '1px solid red';
            } else if(regEmail.test(modalInputs[4].value)) {
                i++;
                modalInputs[4].style.border = '1px solid #fff';
            } 
            if(i == 5){
                document.querySelector('.modal__form').submit();
            }
    }

    if(modalSubmit) {
        modalSubmit.addEventListener('click', (e) => {
            e.preventDefault();

            if (modalInputs[0].value == '' || modalInputs[1].value == '' || modalInputs[2].value == ''|| modalInputs[3].value == '' || modalInputs[4].value == '') {
                e.preventDefault();
                for(let i = 0; i < modalInputs.length - 1; i++) {
                    modalInputs[i].style.border = '1px solid red';
                }
                validated();
            }
            else {
                validated();
            }
        });
    }

    /* SHOPING-CART */
    let date = new Date();
    date.setDate(date.getDate() + 365);
    date = date.toUTCString();

    function getCookie(name) {
        var matches = document.cookie.match(new RegExp(
            '(?:^|\s)' + name.replace(/([.$?*+\\\/{}|()\[\]^])/g, '\\$1') + '=(.*?)(?:;|$)'
        ));
        return matches ? matches[1] : null;
    }

    const objCarts = JSON.parse(getCookie('objsCarts')) || []; //получаем куки

    // const objCarts = JSON.parse(localStorage.getItem('objCarts')) || [];

    function decCount(i) {
        if(objCarts[i].count <= 1) {
            objCarts[i].count = 2;
        }
        return objCarts[i].count--;
    }

    function incCount(i) {
        return objCarts[i].count++;  
    }

    function updateCount(i) {
        return objCarts[i].count;
    }

    function finalPrice(i) {
        return objCarts[i].count * objCarts[i].price;
    }

    function finalPriceItems(i) {
        let sumPrice = 0;
        for (let i = 0; i < objCarts.length; i++) {
            sumPrice += finalPrice(i);
        }
        document.querySelector('.shoping-cart__price').innerHTML = `Цена: <span>${sumPrice} бел.руб</span>`;
    }

    function shopingCartNumbers() {
        document.querySelector('.cart__number').textContent = objCarts.length;
    }

    shopingCartNumbers();

    function renderShopingCart() {
        if(objCarts.length > 0) {
            document.querySelector('.shoping-cart-cart__main').innerHTML = '';

            document.querySelector('.shoping-cart-cart__main').innerHTML = `
                <div class="shoping-cart__text">Информация о товарах</div>
                <div class="shoping-cart__elements"></div>
                <div class="shoping-cart__price">Цена: <span>500 бел.руб </span></div>
                <div class="shoping-cart__buttons">
                    <button class="shoping-cart__button shoping-cart__button-select">Выбрать ещё</button>
                    <button class="shoping-cart__button shoping-cart__button-buy">Купить</button>
                </div>
            `;
            
            objCarts.forEach((cartItem, i) => {
                document.querySelector('.shoping-cart__elements').innerHTML += `
                    <div class="shoping-cart__element">
                        <div class="shoping-cart__element-left">
                            <div class="element__photo-wrapper">
                                <img class="element__photo" src=${cartItem.imgCart} alt="">
                            </div>

                            <div class="element__text">
                                <div class="element__title">${cartItem.title}</div>
                                <div class="element__subtitle">${cartItem.subtitle}</div>
                            </div>
                        </div>

                        <div class="shoping-cart__element-right">
                            <div class="element__calculator">
                                <div class="calculator__item calculator__dec"></div>
                                <div class="calculator__item calculator__count">${cartItem.count}</div>
                                <div class="calculator__item calculator__inc"></div>
                            </div>

                            <div class="element__price">${finalPrice(i)} бел.руб</div>

                            <button class="element__btn-delete">
                                <img src=${cartItem.imgDelete} alt="">
                            </button>                              
                        </div>
                    </div>
                `;
            });
        } else {
            document.querySelector('.shoping-cart-cart__main').innerHTML = '';
            document.querySelector('.shoping-cart-cart__main').innerHTML = `
                <div class="shoping-cart__text shoping-cart__massage">Корзина пуста</div>
                <div class="shoping-cart__elements"></div>
                <div class="shoping-cart__price hide">Цена: <span>500 бел.руб </span></div>
                <input class="modal__button hide" type="submit" value="Подтвердить заказ">
            `;
        }


        let countItems = document.querySelectorAll('.calculator__count'),
        countItemDec = document.querySelectorAll('.calculator__dec'),
        countItemInc = document.querySelectorAll('.calculator__inc'),
        elementsPrice = document.querySelectorAll('.element__price'),
        elementsDelete = document.querySelectorAll('.element__btn-delete');

        countItemDec.forEach((itemDec, i) => {
            itemDec.addEventListener('click', () => {
                decCount(i);
                document.cookie = `objsCarts=${JSON.stringify(objCarts)}; expires=${date}`; //устанавливаем куки
                // localStorage.setItem('objCarts', JSON.stringify(objCarts));
                countItems[i].textContent = updateCount(i);
                elementsPrice[i].textContent = `${finalPrice(i)} бел.руб`;
                finalPriceItems(i);
            });
        });

        countItemInc.forEach((itemInc, i) => {
            itemInc.addEventListener('click', () => {
                incCount(i);
                document.cookie = `objsCarts=${JSON.stringify(objCarts)}; expires=${date}`; //устанавливаем куки
                // localStorage.setItem('objCarts', JSON.stringify(objCarts));
                countItems[i].textContent = updateCount(i);
                elementsPrice[i].textContent = `${finalPrice(i)} бел.руб`;
                finalPriceItems(i);
            });
        });

        elementsDelete.forEach((itemDel, i) => {
            itemDel.addEventListener('click', () => {
                objCarts.splice(i, 1);
                document.cookie = `objsCarts=${JSON.stringify(objCarts)}; expires=${-1}`; //устанавливаем куки
                // localStorage.setItem('objCarts', JSON.stringify(objCarts));
                renderShopingCart();
                if(objCarts != 0) {
                    finalPriceItems(i);
                }
            });
        });

        shopingCartNumbers();

        let buttonSelect = document.querySelector('.shoping-cart__button-select');
        if(buttonSelect){
            document.querySelector('.shoping-cart__button-select').addEventListener('click', () => {
                closeModal(shopingCart);
            });
        }
    }

    let buttonShopingCart = document.querySelector('.good__button-cart');
    
    if(buttonShopingCart) {
        buttonShopingCart.addEventListener('click', () => {
                let imgCart = document.querySelector('.current-good-slider__item img').getAttribute('src'),
                    title = document.querySelector('.good__title').textContent,
                    subtitle = document.querySelector('.good__text').textContent,
                    count = 1,
                    price = document.querySelector('.good__price span').textContent.replace(/[^\d;]/g, ''),
                    imgDelete = 'images/dest/photo/shoping-cart/delete-icon.svg';

                const newObj = {
                    imgCart: imgCart,
                    title: title,
                    subtitle: subtitle,
                    count: count,
                    price: price,
                    imgDelete: imgDelete
                };   


                let bool;

                for (let i = 0; i < objCarts.length; i++) {
                    bool = JSON.stringify(Object.entries(objCarts[i]).sort()) == JSON.stringify(Object.entries(objCarts[i]).sort());
                    incCount(i);
                    document.cookie = `objsCarts=${JSON.stringify(objCarts)}; expires=${date}`; //устанавливаем куки
                }

                if(!bool) {
                    objCarts.push(newObj);
                    document.cookie = `objsCarts=${JSON.stringify(objCarts)}; expires=${date}`; //устанавливаем куки
                    // localStorage.setItem('objCarts', JSON.stringify(objCarts));
                    renderShopingCart();
                    finalPriceItems();
                }
        });
    }

    if(shoppingCartButton) {
        shoppingCartButton.addEventListener('click', () => {
            renderShopingCart();
            openModal(shopingCart);
            finalPriceItems(objCarts.length);
        });
    }

    document.querySelector('.header-bottom__cart').addEventListener('click', () => {
        renderShopingCart();
        openModal(shopingCart);
        finalPriceItems(0);
    });
});