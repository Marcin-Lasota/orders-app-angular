import { Component, Inject, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe, NgForOf, NgIf } from '@angular/common';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../shared/service/order.service';
import { NotificationService } from '../../shared/service/notification.service';
import { OrderDetails } from '../../shared/model/order-details';
import { MatFormField } from '@angular/material/form-field';
import { MatListItem } from '@angular/material/list';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatInput, MatLabel } from '@angular/material/input';
import { PaymentMethod } from '../../shared/model/enum/payment-method';
import { OrderStatus } from '../../shared/model/enum/order-status';
import { DialogService } from '../service/dialog.service';
import { OrderInfo } from '../../shared/model/order-info';

@Component({
  selector: 'app-order-details-dialog',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatAccordion,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    NgForOf,
    ReactiveFormsModule,
    MatFormField,
    MatListItem,
    MatGridList,
    MatGridTile,
    MatInput,
    MatLabel,
    DatePipe,
    NgIf,
  ],
  templateUrl: './order-details-dialog.component.html',
  styleUrl: './order-details-dialog.component.scss',
})
export class OrderDetailsDialogComponent implements OnInit {
  orderDetails?: OrderDetails;
  canPay = false;
  canCancel = false;

  private orderInfo: OrderInfo;

  constructor(private dialogRef: MatDialogRef<OrderDetailsDialogComponent>,
              private orderService: OrderService,
              private dialogService: DialogService,
              private notificationService: NotificationService,
              @Inject(MAT_DIALOG_DATA) private data: { orderInfo: OrderInfo }) {
    this.orderInfo = data.orderInfo;
  }

  ngOnInit(): void {
    this.dialogRef.updateSize('80vw', 'auto');
    this.getOrderDetails();
  }

  private getOrderDetails() {
    this.orderService.getOrderDetails(this.orderInfo.id).subscribe({
        next: (orderDetails) => {
          this.orderDetails = orderDetails;
          this.checkIfCanPay();
          this.checkIfCanCancel();
        },
        error: (error) => {
          this.notificationService.showError(error, 'Could not get order details');
        },
      },
    );
  }

  checkIfCanPay() {
    this.canPay = this.orderDetails?.status === OrderStatus.CREATED &&
      this.orderDetails?.paymentMethod !== PaymentMethod.CASH;
  }

  checkIfCanCancel() {
    const order = this.orderDetails;
    this.canCancel = order?.status === OrderStatus.CREATED ||
      (order?.status === OrderStatus.ACCEPTED && order?.paymentMethod === PaymentMethod.CASH);
  }

  confirmOrderCancellation(orderId: number | undefined) {
    if (orderId) {
      this.confirmOrderStatusChange(orderId, OrderStatus.CANCELLED);
    }
  }

  confirmPay(orderId: number | undefined) {
    if (orderId) {
      this.confirmOrderStatusChange(orderId, OrderStatus.ACCEPTED);
    }
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
        if (this.orderDetails) {
          this.orderDetails.status = orderDetails.status;
          this.orderInfo.status = orderDetails.status;
        }
        this.dialogRef.close();
        this.notificationService.showSuccess(`Changed order status to: ${status}`);
      },
      error: error => this.notificationService.showError(error, `Cannot change order status to: ${status}`),
    });
  }
}
