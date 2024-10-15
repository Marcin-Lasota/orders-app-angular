import { OrderStatus } from './enum/order-status';
import { PaymentMethod } from './enum/payment-method';
import { Customer } from './customer';
import { OrderItem } from './order-item';

export interface OrderDetails {
  id: number;
  customer: Customer;
  orderItems: OrderItem[];
  totalItems: number;
  totalPrice: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  orderDate: Date;
}
