if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.form = this.querySelector('form');
        this.form.querySelector('[name=id]').disabled = false;
        this.form.addEventListener('submit', this.onSubmitHandler.bind(this));
        this.cart = document.querySelector('cart-notification') || document.querySelector('cart-drawer');
        this.submitButton = this.querySelector('[type="submit"]');

        if (document.querySelector('cart-drawer')) this.submitButton.setAttribute('aria-haspopup', 'dialog');

        this.hideErrors = this.dataset.hideErrors === 'true';
      }

      onSubmitHandler(evt) {
        evt.preventDefault();
        if (this.submitButton.getAttribute('aria-disabled') === 'true') return;

        this.handleErrorMessage();

        this.submitButton.setAttribute('aria-disabled', true);
        this.submitButton.classList.add('loading');
        this.querySelector('.loading-overlay__spinner').classList.remove('hidden');

        const config = fetchConfig('javascript');
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
        delete config.headers['Content-Type'];

        const formData = new FormData(this.form);
        if (this.cart) {
          formData.append(
            'sections',
            this.cart.getSectionsToRender().map((section) => section.id)
          );
          formData.append('sections_url', window.location.pathname);
          this.cart.setActiveElement(document.activeElement);
        }
        config.body = formData;

        fetch(`${routes.cart_add_url}`, config)
          .then((response) => response.json())
          .then((response) => {
            if (response.status) {
              publish(PUB_SUB_EVENTS.cartError, {
                source: 'product-form',
                productVariantId: formData.get('id'),
                errors: response.errors || response.description,
                message: response.message,
              });
              this.handleErrorMessage(response.description);

              const soldOutMessage = this.submitButton.querySelector('.sold-out-message');
              if (!soldOutMessage) return;
              this.submitButton.setAttribute('aria-disabled', true);
              this.submitButton.querySelector('span').classList.add('hidden');
              soldOutMessage.classList.remove('hidden');
              this.error = true;
              return;
            } else if (!this.cart) {
               cartPopupUpdate()
                setTimeout(()=> {
                    document.body.classList.add('cart-popup-active')
                    document.body.classList.add('dropdown-shadow')
                },500)
              // window.location = window.routes.cart_url;
              // return;
            }

            if (!this.error)
              publish(PUB_SUB_EVENTS.cartUpdate, { source: 'product-form', productVariantId: formData.get('id'), cartData: response });
            this.error = false;
            const quickAddModal = this.closest('quick-add-modal');
            if (quickAddModal) {
              document.body.addEventListener(
                'modalClosed',
                () => {
                  setTimeout(() => {
                    this.cart.renderContents(response);
                  });
                },
                { once: true }
              );
              quickAddModal.hide(true);
            } else {
              this.cart.renderContents(response);
            }
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            this.submitButton.classList.remove('loading');
            if (this.cart && this.cart.classList.contains('is-empty')) this.cart.classList.remove('is-empty');
            if (!this.error) this.submitButton.removeAttribute('aria-disabled');
            this.querySelector('.loading-overlay__spinner').classList.add('hidden');
          });
      }

      handleErrorMessage(errorMessage = false) {
        if (this.hideErrors) return;

        this.errorMessageWrapper =
          this.errorMessageWrapper || this.querySelector('.product-form__error-message-wrapper');
        if (!this.errorMessageWrapper) return;
        this.errorMessage = this.errorMessage || this.errorMessageWrapper.querySelector('.product-form__error-message');

        this.errorMessageWrapper.toggleAttribute('hidden', !errorMessage);

        if (errorMessage) {
          this.errorMessage.textContent = errorMessage;
        }
      }
    }
  );
}


// variant change title
let des_holder = document.querySelector('.product__description')
let input_options = document.querySelectorAll('.product-form__input input');
input_options.forEach((inputs)=>{
  inputs.addEventListener('click',(input)=>{
     let target = input.target;
     let checked_title = target.getAttribute('value');
     let clicked_des = document.querySelector('[var_title="'+checked_title+'"]').innerHTML;
     des_holder.innerHTML = clicked_des
     // variant descripiton
     // let opt_one_desc = document.querySelectorAll('.opiton_1_description')
     // let opt_two_desc = document.querySelectorAll('.opiton_2_description')
     // let opt_three_desc = document.querySelectorAll('.opiton_3_description')
     let all_desc = document.querySelectorAll('.variant_desc');
     all_desc.forEach((des)=>{
       des.style.display = 'none'
     })
     let index = target.getAttribute('index');
     // prod_tit.innerText = checked_title;
  })
})

// product bundles
// product accordians

let inputs = document.querySelectorAll('.product__accordion input');
let first_input = document.querySelector('.product__accordion input')
// select the first radio bundle
document.addEventListener('DOMContentLoaded',()=>{
if(first_input){
  first_input.click()
  first_input.classList.add('greyed')
  first_input.style.pointerEvents = 'none';
  first_input.style.accentColor = 'grey';
}
})
// end
let inputs_length = inputs.length;
let imgs_width =  100 / inputs_length;

let target_append = document.querySelector('.product-bundle-images')
let priceArray = [];
const imageMap = new Map();

  inputs.forEach((input)=>{
    input.addEventListener('click',(e)=>{
     // enable / disable the inputs    
     let checked_count = 0;
     let inputs = document.querySelectorAll('.product__accordion input');
     inputs.forEach((input, idx, array)=>{
       if(input.checked){
         checked_count++
       }
       if(checked_count >= 2){
         inputs.forEach((input)=>{
          input.classList.remove('greyed')
          input.style.pointerEvents = null;
          input.style.accentColor = null;
        })
       }
       else{
         inputs.forEach((input)=>{
          if(input.checked){
          input.classList.add('greyed')
          input.style.pointerEvents = 'none';
          input.style.accentColor = 'grey';
         }  
        })         
       }
     })
     // end
     let input = e.target
     let price = input.getAttribute('price')
     let to_format_price = priceFormatting(price/100);
     let integ_price = parseInt(to_format_price)
     let var_id = parseInt(input.getAttribute('value'))      
     let img = input.getAttribute('img');
            
      async function array_update(){
      if(input.checked){
    
        let new_img = document.createElement('img');
         new_img.style.width = imgs_width + '%'; 
         new_img.src = `${img}`
         new_img.classList.add('image-fade');
         
        imageMap.set(input, new_img) 
        target_append.appendChild(new_img); 
        new_img.getBoundingClientRect();
        new_img.style.opacity = 1;
        priceArray.push(integ_price)
      }else{

        const existing_img = imageMap.get(input);
        if (existing_img) {
        existing_img.style.opacity = 0;
        target_append.removeChild(existing_img);
        imageMap.delete(input);
        } 
        priceArray = priceArray.filter(item => item !== integ_price)
      }      
      // add array values
      let sum = 0;
      for (let i = 0; i < priceArray.length; i++ ) {
        sum += priceArray[i];
      }
      document.querySelector('.product_bundle_price').textContent = `AED ${sum}.00` ;
    }
    array_update();    
  }) // input click
})


// add to cart button
let btn = document.querySelector('.product-bundle-button');
let variant_Array = [];
if(btn){
btn.addEventListener('click',(e)=>{
 e.preventDefault();
 variant_Array = [];
 inputs.forEach((e)=>{
   let input = e;
   if(input.checked){
     let id = parseInt(input.getAttribute('value'));
     let quantity = 1;
     let maxQuantity = parseInt(input.getAttribute('max_quantity'))
     variant_Array.push({id,quantity,properties: {'maxQuantity': maxQuantity}})
   }  
 })
     multiple_cart(variant_Array);
})
}
