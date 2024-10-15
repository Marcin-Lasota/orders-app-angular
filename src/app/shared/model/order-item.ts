import { Product } from './product';

export class OrderItem {
  id: number | undefined;
  product: Product;
  quantity: number;
  unitPrice: number;

  constructor(product: Product, quantity: number = 1, unitPrice: number = product.price) {
    this.product = product;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
  }
}
