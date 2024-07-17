import { cart, deleteFromCart, getCartQuantity, updatedeliveryOption } from '../../data/cart.js'
import { products, getProduct } from '../../data/products.js'
import { currencyConversion } from '../utils/money.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryoptions.js'
import { renderpaymnetSummary } from './paymnetSummary.js'
import { renderHeaderSummary } from './headerSummary.js'

export function renderOrderSummary() {


  let orderSummaryHTML = '';
  cart.forEach((cartItem) => {
    let matchingProduct = getProduct(cartItem.productId);


    if (matchingProduct) {

      const deliveryOptionId = cartItem.deliveryOptionId;
      let deliveryOption = getDeliveryOption(deliveryOptionId);
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      orderSummaryHTML += `
          <div class="cart-item-container js-item-container-${matchingProduct.id} ">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCents / 100).toFixed(2)}
                </div>
                <div class="product-quantity>
              
                    Quantity:
                   <span class="quantity-label product-quantity-container"> 
                        <button class="quantity-decrement " 
                        onclick="${updateCartQuantity(cartItem, '-')}">-</button>
                        <span class="quantity-value js-quantity-${cartItem.productId}">${cartItem.quantity}</span>
                        <button class="quantity-increment"
                       onclick="${updateCartQuantity(cartItem, '+')}" >+</button>
                 
                  </span>
               
                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
              </div>
            </div>
          </div>
        `
    }

  });

  document.querySelector('.js-order-summary')
    .innerHTML = orderSummaryHTML;


  function deliveryOptionsHTML(matchingProduct, cartItem) {


    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();

      const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      let priceString = deliveryOption.deliveryPriceCent;
      if (priceString === 0)
        priceString = 'FREE';
      else
        priceString = `$ ${currencyConversion(priceString)}`;


      const isChecked = deliveryOption.id === cartItem.deliveryOptionId ? 'checked' : '';

      html += `
   
     
      <div class="delivery-option js-delivery-option "
          data-product-id="${matchingProduct.id}" 
          data-delivery-option-id="${deliveryOption.id}" >
         

         <input type="radio" ${isChecked}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
         ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div >
        </div >
       </div >
      `

    });

    return html;
  }



  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {

        let productId = link.dataset.productId;
        deleteFromCart(productId);

        document.querySelector(`.js-item-container-${productId}`)
          .remove();
        renderpaymnetSummary();
        renderHeaderSummary();

      })
    });


  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {

      element.addEventListener('click', () => {
        let productId = element.dataset.productId;

        let deliveryOptionId = element.dataset.deliveryOptionId;

        updatedeliveryOption(productId, deliveryOptionId)
        renderOrderSummary();
        renderpaymnetSummary();
      });
    });




  function updateCartQuantity(cartItem, operation) {
    // console.log(cartItem);
    // console.log(operation);

    if (operation === '-') {
      cartItem.quantity -= 1;

    }
    else if (operation === '+') {
      cartItem.quantity += 1;

    }


    document.querySelector(`.js-quantity-${cartItem.productId}`);


  }
}