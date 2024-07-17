import { renderOrderSummary } from './checkout/orderSummary.js'
import { renderpaymnetSummary } from './checkout/paymnetSummary.js';
import { renderHeaderSummary } from './checkout/headerSummary.js';
import { products, loadProducts } from '../data/products.js'
loadProducts(() => {
  renderOrderSummary();
  renderpaymnetSummary();
  renderHeaderSummary();
})
