import { OrderStatus } from './enum/order-status';
import { PaymentMethod } from './enum/payment-method';

export interface OrderInfo {
  id: number;
  customerId: number;
  totalItems: number;
  totalPrice: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  orderDate: Date;
}
