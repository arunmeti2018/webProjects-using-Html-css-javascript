import { cart } from "../../data/cart.js";
import { getDeliveryOption } from "../../data/deliveryoptions.js";
import { getProduct } from '../../data/products.js'
import { currencyConversion } from "../utils/money.js";
export function renderpaymnetSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let cartQuantity = 0;
    cart.forEach(cartItem => {
        cartQuantity += cartItem.quantity;
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.deliveryPriceCent;


    });

    const totalBeforTaxCents = productPriceCents + shippingPriceCents;
    const taxCents = totalBeforTaxCents * 0.1;
    const totalCents = totalBeforTaxCents + taxCents;


    let paymentSummaryHTML = `
      <div class="payment-summary-title">
          Order Summary
        </div>

        <div class="payment-summary-row">
          <div>Items (${cartQuantity}):</div>
          <div class="payment-summary-money">$${currencyConversion(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Shipping &amp; handling:</div>
          <div class="payment-summary-money">$${currencyConversion(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
          <div>Total before tax:</div>
          <div class="payment-summary-money">$${currencyConversion(totalBeforTaxCents)}</div>
        </div>

        <div class="payment-summary-row">
          <div>Estimated tax (10%):</div>
          <div class="payment-summary-money">$${currencyConversion(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
          <div>Order total:</div>
          <div class="payment-summary-money">$${currencyConversion(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary">
          Place your order
        </button>
    `;


    document.querySelector('.js-payment-summary')
        .innerHTML = paymentSummaryHTML;
    // for top checkout ( 3 items to make interactive)  and chane value accordingly
    document.querySelector('.js-checkout-cartQuantity')
        .innerHTML = `${cartQuantity}`;


}