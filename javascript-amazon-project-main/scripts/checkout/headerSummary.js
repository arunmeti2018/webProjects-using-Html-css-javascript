import { getCartQuantity } from '../../data/cart.js'
export function renderHeaderSummary() {
  let cartQuantity = getCartQuantity();


    let html = `
        Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a>)
      `;
    document.querySelector('.js-header-summary')
      .innerHTML = html;

}
