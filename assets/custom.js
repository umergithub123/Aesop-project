// slider

var swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      speed: 500,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
       breakpoints: {
        // when window width is >= 749px
        749: {
          slidesPerView: 4
        }
      }
    });

// product page slider

var swiper = new Swiper(".product_slider", {
      slidesPerView: 1,
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }
    });
var swiper = new Swiper(".small_slider", {
      slidesPerView: 1,
      speed: 500,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

var swiper = new Swiper(".brand_page_slider", {
      slidesPerView: 1,
      speed: 500,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
      breakpoints: {
        // when window width is >= 749px
        749: {
          slidesPerView: 4
        }
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });

// story page single slider
  var swiper = new Swiper(".newSwiper", {
     slidesPerView: 1,
     speed: 500,
     pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    scrollbar: {
        el: ".swiper-scrollbar",
      hide: true,
      },
  });

// hide close menu btn on doc click
document.addEventListener('click', function (event) {
    const isHeaderItem = event.target.closest('.header__inline-menu');
    if (!isHeaderItem) {
        mega_close.classList.add('hidden')
    }
});
let mega_links = document.querySelectorAll('details.mega-menu summary span');
let currnt_mega = document.querySelector('details.mega-menu[open]');
let mega_close = document.querySelector('.mega_close')
if(mega_links){
  mega_links.forEach((link)=>{
    link.addEventListener('click',(e)=>{
      if(e.target !== e.currentTarget) return;
      let currnt_Click = e.target;
      let detail_clicked = currnt_Click.closest('details.mega-menu')
      if(detail_clicked.hasAttribute('open')){
        mega_close.classList.add('hidden')
      }else{
        mega_close.classList.remove('hidden')
      }
    })
  })
}
mega_close.addEventListener('click',()=>{
  if(currnt_mega){
  currnt_mega.click();
  }
  mega_close.classList.add('hidden')
})
// end

// login show password
// Toggle eye button on password field
document.querySelectorAll('.show-password').forEach(item => {
  item.addEventListener('click', () => {
    console.log('click working--')
    item.closest('.field').querySelector('input').setAttribute('type', 'text')
    item.classList.add('active')
    setTimeout(() => {
      item.closest('.field').querySelector('input').setAttribute('type', 'password')
      item.classList.remove('active')
    }, 3000)
  })
})


// login popup
    let register_pop = document.querySelector('.pop_up_holder.register');
    let login_pop_up = document.querySelector('.pop_up_holder.login');
    const pop_open = document.querySelector('.header__icon--account');
    let check_att = pop_open.getAttribute('href');
    pop_open.addEventListener('click',function(e){
      e.preventDefault();
      if(!check_att.includes('javascript')){
      window.location.href= '/account'
      return false;
      }
      login_pop_up.classList.add('pop_up_enabled');
    })
    const close_drawer_pop = document.querySelector('.pop_up_close');
    close_drawer_pop.addEventListener('click',function(){
      login_pop_up.classList.remove('pop_up_enabled');
    })

// create account / register pop up
   document.querySelector('.create_acc_btn').addEventListener('click',(e)=>{
     e.preventDefault();
     login_pop_up.classList.remove('pop_up_enabled'); 
     register_pop.classList.add('pop_up_enabled');
   })

  document.querySelector('.register_header svg:first-child').addEventListener('click',()=>{
   register_pop.classList.remove('pop_up_enabled');
   login_pop_up.classList.add('pop_up_enabled');
  })
  document.querySelector('.register_header .close_regis_pop svg').addEventListener('click',()=>{
    console.log('clicking---')
    register_pop.classList.remove('pop_up_enabled');
  })
// end

// custom popup shipping announce
    var shipping_announce = document.querySelector('.announcement-bar__message');
    var side_drawer = document.querySelector('.shipping_announce_popup');
    shipping_announce.addEventListener('click',function(){
      side_drawer.classList.add('drawer_enabled');
    })
    var close_drawer = document.querySelector('.shipping_announce_popup .close_btn:not(.pop_up_close)');
    close_drawer.addEventListener('click',function(){
      side_drawer.classList.remove('drawer_enabled');
    })

    var shipping_parentElement = document.querySelector(".shipping_announce_popup .side_drawer_overlay");
    shipping_parentElement.addEventListener("click", function(event) {
     // Check if the clicked element is not a specific element (e.g., button with id "button2")
     if (event.target && event.target !== document.querySelector(".shipping_announce_popup .side_drawer")) {
       // Do something when a non-specific element is clicked
       side_drawer.classList.remove('drawer_enabled');
     }
    });


// colleciton page dropdown menu
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// collection page options 
// select first checked radio
let option_sizes = document.querySelectorAll('.optionSize');
[...option_sizes].forEach((sizes) => {

   sizes.querySelector('input:first-child').checked = true;
   let checked_title = sizes.querySelector('input:first-child').getAttribute('data-title');
   let checked_price = sizes.querySelector('input:first-child').getAttribute('data-price');
   let compare_price = sizes.querySelector('input:first-child').getAttribute('compare-price');
   let parent = sizes.closest(".card__information")
   parent.querySelector('.card__heading>a').innerText = checked_title;
   if(compare_price){
     parent.querySelector('.price').classList.add('price--on-sale')
     parent.querySelector('.price-item--sale').innerText = checked_price
     parent.querySelector('.price__sale .price-item--regular').innerText = compare_price
     parent.querySelector('.price--on-sale .price__regular').style.display = 'none'
     parent.querySelector('.price--on-sale .price__sale').style.display = 'block'
   }else{
     parent.querySelector('.price').classList.remove('price--on-sale')
     parent.querySelector('.price-item--regular').innerText = checked_price
     parent.querySelector('.price .price__regular').style.display = 'block'
     parent.querySelector('.price .price__sale').style.display = 'none'
   }
});

// Global function for change product info on collection page
function change_global(sizes){
      // doc load code
      let prod_tit = sizes.getAttribute('prod-title');
      let var_tit = sizes.getAttribute('data-title');
      let var_desc = sizes.getAttribute('data-desc');
      let sizes_parent = sizes.closest('.card__information')
      let desc_parent = sizes_parent.querySelector('.card_description')
      if(var_tit != ''){
        sizes_parent.querySelector('.card__heading>a').innerText = var_tit;
      }else{
        sizes_parent.querySelector('.card__heading>a').innerText = prod_tit;
      }
      // description
      let all_des = sizes_parent.querySelectorAll('.variant_desc');
      all_des.forEach((des)=>{
       des.style.display = 'none'
     })
     // let def_desc = sizes_parent.querySelector('.default_desc');
     // let opt_one_desc = sizes_parent.querySelector('.opiton_1_description')
     if(var_desc != null){      
       desc_parent.innerHTML = var_desc; 
     }
}
// change title and descriptions collection page on load
let radio_buts_frst = document.querySelectorAll('.optionSize input:first-child');
document.addEventListener('DOMContentLoaded',()=>{  
  [...radio_buts_frst].forEach((sizes) => {
      change_global(sizes);      
  })
})

// change title and descriptions collection page on click
let radio_buts = document.querySelectorAll('.optionSize input');
  radio_buts.forEach((sizes) => {
    sizes.addEventListener('click',(size)=>{
     let target = size.target;
     let checked_title = target.getAttribute('data-title'); 
     let checked_price = target.getAttribute('data-price');
     let var_desc = target.getAttribute('data-desc');
     let img_parent = target.closest('.card--media');
     let var_img = target.getAttribute('var_img');
     let compare_price = target.getAttribute('compare-price')
     let parent = target.closest(".card__information")
     let des_hold = parent.querySelector('.card_description')
     let prod_hand = target.getAttribute('prod-title')
     // variant descripiton
     let click_parent = target.closest(".card__information")
     let all_des = click_parent.querySelectorAll('.variant_desc');
     all_des.forEach((des)=>{
       des.style.display = 'none'
     })
     des_hold.innerHTML = var_desc;

     // end
     if(checked_title != ''){
       parent.querySelector('.card__heading>a').innerText = checked_title;
     }else{
       parent.querySelector('.card__heading>a').innerText = prod_hand
     }
     if(var_img && var_img != ''){
       let img = img_parent.querySelector('img')
       img.setAttribute('srcset',var_img)
     }
     if(compare_price){
       parent.querySelector('.price').classList.add('price--on-sale')
       parent.querySelector('.price-item--sale').innerText = checked_price
       parent.querySelector('.price__sale .price-item--regular').innerText = compare_price
       parent.querySelector('.price--on-sale .price__regular').style.display = 'none'
       parent.querySelector('.price--on-sale .price__sale').style.display = 'block'
     }else{
       parent.querySelector('.price').classList.remove('price--on-sale')
       parent.querySelector('.price .price__regular').style.display = 'block'
       parent.querySelector('.price .price__sale').style.display = 'none'
       parent.querySelector('.price-item--regular').innerText = checked_price
     }
    })
})
// global add to cart function
function addToCart(variantId, maxQuantity) {
  fetch('/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity: 1,
      id: variantId,
      properties: {
        'maxQuantity': maxQuantity
      }
    }),
  })
  .then((response) => response.json())
  .then((data)=>{
    if (data.status === 422){
      document.body.classList.add('cart-error-active')
      document.querySelector('#cart-error-popup').innerText = data.description
      setTimeout(()=> {
          document.body.classList.remove('cart-error-active')
      },3000)
    }
    else{
      cartPopupUpdate()
      setTimeout(()=> {
          document.body.classList.add('cart-popup-active')
          document.body.classList.add('dropdown-shadow')
      },500)
    }
  })
  .catch((error) => {
      document.body.classList.add('cart-error-active')
      document.querySelector('#cart-error-popup').innerText = 'An Error Occured. Please try again later'
      setTimeout(()=> {
          document.body.classList.remove('cart-error-active')
      },3000)
  })
  .finally(() => {
      
  })
}


// CartPopup open/close
document.querySelector('.header__icon--cart').addEventListener('click', (e)=> {
  e.preventDefault()
  if(document.body.classList.contains('template-cart')){
      return
  }else{
      document.body.classList.add('cart-popup-active')
      document.body.classList.add('dropdown-shadow')
  }
})

// Dropdown Shadow close button
document.querySelector('#dropdown-shadow').addEventListener('click', (e)=> {
  e.preventDefault()
  if(document.body.classList.contains('cart-popup-active')){
      document.body.classList.remove('cart-popup-active')
  }
  document.body.classList.remove('dropdown-shadow')
  document.body.style.overflow = 'inherit'
})
document.querySelector('#dropdown-cart .close_btn').addEventListener('click', (e)=> {
  e.preventDefault()
  document.body.classList.remove('cart-popup-active')
  document.body.classList.remove('dropdown-shadow')
  document.body.style.overflow = 'inherit'
})

function removeCartItem(){
  // Remove from cart
  var btn = document.querySelectorAll('.btn-remove')
  btn.forEach(item => {
    item.addEventListener('click', (e)=> {
      e.preventDefault()
      var lineId = item.closest('.item').getAttribute('data-line')
      var formData = {
          'line': lineId,
          'quantity': 0
      }
      cartChanger(formData, item.closest('.item'))
    })
  })
}
removeCartItem()

function cartChanger(formData, item){
  fetch('/cart/change.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
  .then(response => {
    return response.json()
  })
  .then((data)=>{
    if (data.status === 422){
      // document.body.classList.add('cart-error-active')
      // document.querySelector('#cart-error-popup').innerText = data.message
      // decrease quantity value if quantity increased
      // item.querySelector('.quantity__input').value = item.querySelector('.quantity__input').value - 1
      
      // setTimeout(()=> {
      //     document.body.classList.remove('cart-error-active')
      // },3000)
    }
    else{
      cartPopupUpdate()
      if(document.body.classList.contains('template-cart')){
        window.location.reload()
      }
    }
  })
  .catch((error) => {
      document.body.classList.add('cart-error-active')
      document.querySelector('#cart-error-popup').innerText = 'An Error Occured. Please try again later'
      setTimeout(()=> {
          document.body.classList.remove('cart-error-active')
      },3000)
  })
}

function cartPopupUpdate(){
  // for updating cart popup
  fetch('/cart.js', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
  })
  .then(response => {
    return response.json()
    console.log('response',response)
  })
  .then((cart)=>{ 
      var lineItems = []
      document.querySelector('.mini-products-list').innerHTML = ''
      var cartCounter = cart.item_count
      const cartCountBubble = document.createElement('div');
      cartCountBubble.className = 'cart-count-bubble';
      const spanElement = document.createElement('span');
      spanElement.textContent = cartCounter;
      cartCountBubble.appendChild(spanElement);
      const targetElement = document.querySelector('#cart-icon-bubble');
      targetElement.appendChild(cartCountBubble);
      
      var optionsArray = []
      
      var totalPrice = priceFormatting(cart.total_price / 100)
      cart.items.forEach((item, i) => { 
          var itemPrice = priceFormatting(item.price / 100)
          var activeQuantity = item.quantity
          var maxQuantity = item.properties.maxQuantity
          for(var j=1; j<=maxQuantity ; j++){
            if(j == activeQuantity){
              selected = 'selected'
            }else{
              selected = ''
            }
            optionsArray.push(
              `<option ${selected} value="${j}">${j}</option>`
            )
          }
          var lineItemDetails = `<li maxQuantity = "${item.quantity}" class="item" data-id="${item.id}" data-line="${i+1}">
              <a href="${item.url}" class="product-image">
              <img loading="lazy" src="${item.image}" alt="${item.title}">
              </a>
              <div class="product-details">
              <a href="javascript:void(0)" title="Remove" class="btn-remove">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none">
                  <path
                    d="M12.1875 14.8438C12.5326 14.8438 12.8125 14.5639 12.8125 14.2188V7.96875C12.8125 7.62362 12.5326 7.34375 12.1875 7.34375C11.8424 7.34375 11.5625 7.62362 11.5625 7.96875V14.2188C11.5625 14.5639 11.8424 14.8438 12.1875 14.8438Z"
                    fill="black"
                    fill-opacity="0.5" />
                  <path
                    d="M7.8125 14.8438C8.15763 14.8438 8.4375 14.5639 8.4375 14.2188V7.96875C8.4375 7.62362 8.15763 7.34375 7.8125 7.34375C7.46737 7.34375 7.1875 7.62362 7.1875 7.96875V14.2188C7.1875 14.5639 7.46737 14.8438 7.8125 14.8438Z"
                    fill="black"
                    fill-opacity="0.5" />
                  <path
                    d="M12.5 2.65625C12.8451 2.65625 13.125 2.37638 13.125 2.03125C13.125 1.68612 12.8451 1.40625 12.5 1.40625H7.5C7.15487 1.40625 6.875 1.68612 6.875 2.03125C6.875 2.37638 7.15487 2.65625 7.5 2.65625H12.5Z"
                    fill="black"
                    fill-opacity="0.5" />
                  <path
                    d="M3.125 3.28125C2.77987 3.28125 2.5 3.56112 2.5 3.90625C2.5 4.25138 2.77987 4.53125 3.125 4.53125H3.75V16.0312C3.75 17.4437 4.9 18.5938 6.3125 18.5938H13.6875C15.0999 18.5938 16.25 17.4437 16.25 16.0312V4.53125H16.875C17.2201 4.53125 17.5 4.25138 17.5 3.90625C17.5 3.56112 17.2201 3.28125 16.875 3.28125H15.625H4.375H3.125ZM15 4.53125V16.0312C15 16.7562 14.4125 17.3438 13.6875 17.3438H6.3125C5.5875 17.3438 5 16.7562 5 16.0312V4.53125H15Z"
                    fill="black"
                    fill-opacity="0.5" />
                </svg>
              </a>
              <div class="product-vendor">${item.vendor}</div>
              <a class="product-name" href="${item.url}">${item.product_title}</a>
              <div class="option">
              <small>${item.variant_title}</small>
              </div>
              <div class="cart-quantity">
              <quantity-input class="quantity cart-quantity">
                  <button class="quantity__button no-js-hidden" name="minus" type="button">
                    <span class="visually-hidden">
                      {{- 'products.product.quantity.decrease' | t: product: item.product.title | escape -}}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                      class="icon icon-minus"
                      fill="none"
                      viewBox="0 0 10 2"
                    >
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z" fill="currentColor">
                    </svg>
                  </button>
                  <input
                    class="quantity__input quantity-dropdown"
                    type="number"
                    name="updates[]"
                    value="${activeQuantity}"
                    min="1"
                      max="${maxQuantity}"
                    id="Quantity-{{ item.index | plus: 1 }}"
                    data-index="{{ item.index | plus: 1 }}"
                  >
                  <button class="quantity__button no-js-hidden" name="plus" type="button">
                    <span class="visually-hidden">
                      {{- 'products.product.quantity.increase' | t: product: item.product.title | escape -}}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      focusable="false"
                      class="icon icon-plus"
                      fill="none"
                      viewBox="0 0 10 10"
                    >
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z" fill="currentColor">
                    </svg>
                  </button>
                </quantity-input>

              <div class="cart-collateral">
                  <span class="price">
                  <span class="money">AED ${itemPrice}</span>
                  </span>
              </div>
              </div>
          </li>`
          lineItems.push(lineItemDetails) 
      })

      // Get the progress bar element and the update button
        let limit = totalPrice/300 * 100
        let progress = limit 
        const progressBarFill = document.querySelectorAll("#progress-bar-fill");
        if(progress <= 100){
            let remain = 300 - totalPrice
            document.querySelector('.pop_sample_bar p').innerText = `You're ${remain} AED away to get free samples`
            // const progressBar = document.getElementById("progress-bar");
            // Create a new element to represent the progress bar fill
            // progressBar.innerHTML = "<div id='progress-bar-fill'></div>";          
            progressBarFill.forEach((bar)=>{
              bar.style.width = `${progress}%`;
            })
            // progressBarFill.style.width = `${progress}%`;
        }else if(progress > 100){
          document.querySelector('.pop_sample_bar p').innerText = `Now you’re eligible for free samples`
          progressBarFill.forEach((bar)=>{
              bar.style.width = `100%`;
            })
        }
      // end
      document.querySelector('.mini-products-list').innerHTML = lineItems.join('')
      document.querySelector('.total .price').innerText = `AED ${totalPrice}`
      if(cartCounter > 0){
          document.querySelector('#dropdown-cart .has-items').classList.remove('hidden')
          document.querySelector('#dropdown-cart .no-items').classList.add('hidden')
      }else{
          document.querySelector('#dropdown-cart .has-items').classList.add('hidden')
          document.querySelector('#dropdown-cart .no-items').classList.remove('hidden')
      }
  })
  .catch((error) => {
      console.log('error',error)
      document.body.classList.add('cart-error-active')
          document.querySelector('#cart-error-popup').innerText = 'An Error Occured. Please try again later'
          setTimeout(()=> {
              document.body.classList.remove('cart-error-active')
      },3000)
  })
  .finally(() => {
      removeCartItem()
      updateCartItem()
  })
}


// cart popup quantity changer
function updateCartItem(){

  const quantityBtn = document.querySelectorAll('.cart-quantity .quantity-dropdown')
  quantityBtn.forEach(item => {
    item.addEventListener('change', (e)=> {
      e.preventDefault()
      var lineId = item.closest('.item').getAttribute('data-line')
      var quantity = item.value
      var formData = {
          'line': lineId,
          'quantity': quantity
      }
      cartChanger(formData, item.closest('.item'))
    })
  })

}
updateCartItem()


function priceFormatting(price){
  // for formatting price
  var formatPrice = new Intl.NumberFormat('en-PK', { maximumSignificantDigits: 3 }).format(price)
  return formatPrice
}


// general add to cart in bulk or multiple add
function multiple_cart(array){
  fetch('/cart/add.js', {
       method: 'POST',
       body: JSON.stringify({ items: array }),
       headers: { 'Content-type': 'application/json' }
     })
     .then(response => {
       return response.json();
     })
     .then((data)=>{
      if (data.status === 422){
        document.body.classList.add('cart-error-active')
        document.querySelector('#cart-error-popup').innerText = data.description
        setTimeout(()=> {
            document.body.classList.remove('cart-error-active')
        },3000)
        }
        else{
          let cart_page = document.querySelector('body.cart');
          if(cart_page){
              document.querySelector('.samples_drawer .close_btn').click()
              cartPopupUpdate()
              location.reload()
          }else{
            cartPopupUpdate()
            setTimeout(()=> {
                document.body.classList.add('cart-popup-active')
                document.body.classList.add('dropdown-shadow')
            },500)
          }
        }
      })
     .catch((error) => {
      document.body.classList.add('cart-error-active')
      document.querySelector('#cart-error-popup').innerText = 'An Error Occured. Please try again later'
      setTimeout(()=> {
          document.body.classList.remove('cart-error-active')
      },3000)
     })
}














