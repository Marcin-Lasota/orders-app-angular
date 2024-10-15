import { PaymentMethod } from './enum/payment-method';
import { OrderItem } from './order-item';

export class Order implements Order {
  customerId: number;
  orderItems: OrderItem[];
  paymentMethod: PaymentMethod;

  constructor(customerId: number, orderItems: OrderItem[], paymentMethod: PaymentMethod) {
    this.customerId = customerId;
    this.orderItems = orderItems;
    this.paymentMethod = paymentMethod;
  }
}
