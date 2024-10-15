import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { OrderService } from '../../shared/service/order.service';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListItemIcon } from '@angular/material/list';
import { OrderInfo } from '../../shared/model/order-info';
import { NotificationService } from '../../shared/service/notification.service';
import { DialogService } from '../../dialog/service/dialog.service';
import { OrderStatus } from '../../shared/model/enum/order-status';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrl: './orders-table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, DatePipe, MatButton, MatIconModule, CurrencyPipe, MatListItemIcon],
})
export class OrdersTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource: OrderInfo[] = [];
  totalOrdersElements: number = 0;

  displayedColumns = ['id', 'customerId', 'orderDate', 'status', 'paymentMethod', 'actions'];

  constructor(private orderService: OrderService,
              private notificationService: NotificationService,
              private dialogService: DialogService) {
  }

  ngAfterViewInit(): void {
    const page = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;
    const direction = this.sort.direction;

    this.getOrders(page, pageSize, this.sort.active, direction);

    this.sort.sortChange.subscribe((sort: Sort) => {
      this.paginator.pageIndex = 0;
      this.getOrders(0, this.paginator.pageSize, sort.active, sort.direction);
    });

    this.paginator.page.subscribe((page: PageEvent) => {
      this.getOrders(page.pageIndex, page.pageSize, this.sort.active, this.sort.direction);
    });
  }

  private getOrders(page: number, pageSize: number, sortField: string, direction: string) {
    this.orderService.getOrders(page, pageSize, sortField, direction).subscribe({
      next: orders => {
        this.dataSource = orders.content;
        this.totalOrdersElements = orders.totalElements;
      },
      error: error => this.notificationService.showError(error, 'Could not get orders'),
    });
  }

  confirmOrderSent(orderId: number) {
    const status = OrderStatus.SENT;
    this.confirmOrderStatusChange(orderId, status);
  }

  confirmOrderDelivered(orderId: number) {
    const status = OrderStatus.DELIVERED;
    this.confirmOrderStatusChange(orderId, status);
  }

  private confirmOrderStatusChange(orderId: number, status: OrderStatus) {
    this.dialogService.openConfirmationDialog(`Are you sure you want to change order status to ${status}?`)
    .then(confirmed => {
      if (confirmed) {
        this.changeStatus(orderId, status);
      }
    });
  }

  private changeStatus(orderId: number, status: OrderStatus) {
    this.orderService.changeStatus(orderId, status).subscribe({
      next: orderDetails => {
        let foundOrder = this.dataSource.find(order => order.id === orderId);

        if (foundOrder) {
          foundOrder.status = orderDetails.status;
        }

        this.notificationService.showSuccess(`Changed order status to: ${status}`);
      },
      error: error => this.notificationService.showError(error, `Cannot change order status to: ${status}`),
    });
  }

  showOrderDetails(orderInfo: OrderInfo) {
    this.dialogService.openOrderDetailsDialog(orderInfo);
  }

  canBeSent(order: OrderInfo) {
    return order.status === OrderStatus.ACCEPTED;
  }

  canBeDelivered(order: OrderInfo) {
    return order.status === OrderStatus.SENT;
  }
}
