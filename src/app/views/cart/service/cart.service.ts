import { Injectable } from '@angular/core';
import { OrderItem } from '../../../shared/model/order-item';
import { LOCAL_STORAGE_KEYS } from '../../../app.properties';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartItems: OrderItem[] = [];

  constructor() {
    this.cartItems = this.getCartItemsFromLocalStorage();
  }

  addToCart(item: OrderItem) {
    const index = this.findIndexById(item);

    if (index !== -1) {
      this.cartItems[index].quantity += 1;
    } else {
      this.cartItems.push(item);
    }

    this.updateCartInLocalStorage();
  }

  removeOneFromCart(item: OrderItem) {
    const index = this.findIndexById(item);

    if (index !== -1) {
      this.cartItems[index].quantity -= 1;
      this.updateCartInLocalStorage();
    }
  }

  removeFromCart(item: OrderItem) {
    const index = this.findIndexById(item);

    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateCartInLocalStorage();
    }
  }

  updateCartInLocalStorage() {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(this.cartItems));
  }

  getCartItemsFromLocalStorage(): OrderItem[] {
    const storedItems = localStorage.getItem(LOCAL_STORAGE_KEYS.CART);
    return storedItems ? JSON.parse(storedItems) : [];
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }

  clearCart() {
    this.cartItems.length = 0;
    this.updateCartInLocalStorage();
  }

  private findIndexById(item: OrderItem) {
    return this.cartItems
    .findIndex(orderItem => orderItem.product.id === item.product.id);
  }
}
