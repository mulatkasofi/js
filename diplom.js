var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    mousewheel: false,
    keyboard: true,
});

const products = {
    product: [
        {
            id: "1",
            img: "https://basket-08.wb.ru/vol1168/part116872/116872733/images/c516x688/1.jpg",
            title: "Телефон",
            newPrise: "199",
            oldPrice: "399p",
        },
        {
            id: "2",
            img: "https://basket-08.wb.ru/vol1144/part114477/114477947/images/c516x688/1.jpg",
            title: "Смартфон",
            newPrise: "299",
            oldPrice: "499p",
        },
        {
            id: "3",
            img: "https://basket-10.wb.ru/vol1410/part141022/141022943/images/c516x688/1.jpg",
            title: "Крутой телефон",
            newPrise: "99",
            oldPrice: "299p",
        },
        {
            id: "4",
            img: "https://basket-07.wb.ru/vol1064/part106476/106476292/images/c516x688/1.jpg",
            title: "Телефон",
            newPrise: "9",
            oldPrice: "99p",
        },
        {
            id: "5",
            img: "https://basket-07.wb.ru/vol1064/part106476/106476292/images/c516x688/1.jpg",
            title: "Телефон",
            newPrise: "19",
            oldPrice: "39p",
        },
        {
            id: "6",
            img: "https://basket-08.wb.ru/vol1151/part115115/115115739/images/c516x688/1.jpg",
            title: "Телефон",
            newPrise: "179",
            oldPrice: "389p",
        },
        {
            id: "7",
            img: "	https://basket-10.wb.ru/vol1444/part144465/144465363/images/c516x688/1.jpg",
            title: "Телефон",
            newPrise: "169",
            oldPrice: "299p",
        },
        {
            id: "8",
            img: "https://basket-08.wb.ru/vol1118/part111864/111864106/images/c516x688/1.jpg",
            title: "Телефон",
            newPrise: "195",
            oldPrice: "359p",
        },
        {
            id: "9",
            img: "https://basket-05.wb.ru/vol889/part88962/88962425/images/c516x688/1.jpg",
            title: "Телефон",
            newPrise: "129",
            oldPrice: "899p",
        },
        {
            id: "10",
            img: "https://basket-09.wb.ru/vol1210/part121010/121010317/images/c516x688/1.jpg",
            title: "Телефон",
            newPrise: "45",
            oldPrice: "100p",
        },
    ],
    findById(id) {
        return this.product.find((product) => product.id === id);
    },


};

const basket = {
    busket: [],
    add(product) {
        this.busket.push(product);
    },
    remove(id) {
        this.busket = this.busket.filter((product) => product.id !== id);
    },
    price() {
        let totalprice = 0
        this.busket.forEach((e) => {
            totalprice += +e.newPrise
        })

        return totalprice

    }
};

const renderCard = (product) => {
    return `
         
            <li class="cart-content__item">
              <article class="cart-content__product cart-product">
                <img src=${product.img} alt="" class="cart-product__img">
                <div class="cart-product__text">
                  <h3 class="cart-product__title">${product.title}</h3>
                </div>
                <div class="right-side">
                  <button class="cart-product__delete" aria-label="Удалить товар" data-del-id=${product.id}>  &times;</button>
                  <span class="cart-product__price">${product.newPrise}</span>
                </div>
        
              </article>
            </li>
         
        `;
};

const rennderItem = (product) => {
    const productSection = document.querySelector(".products");
    productSection.innerHTML = null
    product.forEach((product) => {
        productSection.innerHTML += `<section class="item">
            
        <img src="${product.img}" alt="" class="item-photo" data-id_photo=${product.id}>
        <div class="text">
        <p class="item-text">${product.newPrise}</p>
        <p class="item-text sale" >${product.oldPrice}</p>
    </div>
        <p class="item-title">${product.title}</p>
        <button class="item-drop" data-product-id=${product.id}>В корзину</button>
    </section>`;
    });

    productSection.addEventListener("click", (e) => {
        const ph = e.target.getAttribute("data-id_photo");
        if (ph) {
            e.target.classList.toggle("big");
        }
    });

    const renderBasket = () => {
        const ul = document.querySelector("ul");
        ul.innerHTML = null;
        basket.busket.forEach((productFromBasket) => {
            ul.innerHTML += renderCard(productFromBasket);
        });

        ul.innerHTML += `<li>Итог:${basket.price()}p</li> `
        ul.onclick = (e) => {
            const todoId = e.target.getAttribute("data-del-id");
            if (todoId) {
                const product = products.findById(todoId);
                basket.remove(product.id);

                renderBasket();
            }
        };
    };

    productSection.addEventListener("click", (e) => {
        e.preventDefault();
        const productId = e.target.getAttribute("data-product-id");
        if (productId) {
            const product = products.findById(productId);
            basket.add(product);
            renderBasket();
        }

    });




};


const search = document.querySelector('.search')
search.addEventListener('input', (e) => {
    if(e.target.value.trim().length>2){
        const filterProducts = products.product.filter((prod) => {
            prod.title.toLowerCase().includes(e.target.value.toLowerCase())
           
        })
        console.log(filterProducts);
        rennderItem(filterProducts)
    }else{
        rennderItem(products.product);
    }
  

})
//   header.addEventListener("input",(e)=>{
//     if(e.target.classList.contains('search')){
//         const filterProducts=products.product.filter((prod)=>{
//             prod.title.toLowerCase().includes(e.target.value.toLowerCase())

//         })
//         rennderItem(filterProducts) 
//     }else{
//         rennderItem(products.product);
//     }


//     }
//   )

const cart_bt = document.querySelector(".bag");
const cart_content = document.querySelector(".cart-content");
cart_bt.addEventListener("click", function () {
    cart_content.classList.toggle("active-cart");
});
