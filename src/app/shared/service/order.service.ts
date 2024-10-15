import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { REST_BASE_URL } from '../../app.properties';
import { Order } from '../model/order';
import { Page } from '../model/page/page';
import { OrderInfo } from '../model/order-info';
import { OrderDetails } from '../model/order-details';
import { OrderStatus } from '../model/enum/order-status';

const ORDERS_URL = REST_BASE_URL + '/orders';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  constructor(private httpClient: HttpClient) {
  }

  getOrders(page: number, size: number, sortField: string, direction: string) {
    const queryParams = {
      page,
      size,
      sortField,
      direction,
    };

    return this.httpClient.get<Page<OrderInfo>>(ORDERS_URL, { params: queryParams });
  }

  createOrder(order: Order) {
    return this.httpClient.post(ORDERS_URL, order);
  }

  getOrderDetails(orderId: number) {
    return this.httpClient.get<OrderDetails>(`${ORDERS_URL}/${orderId}`);
  }

  changeStatus(orderId: number, orderStatus: OrderStatus) {
    const patch = {
      status: orderStatus,
    };
    return this.httpClient.patch<OrderDetails>(`${ORDERS_URL}/${orderId}`, patch);
  }
}
