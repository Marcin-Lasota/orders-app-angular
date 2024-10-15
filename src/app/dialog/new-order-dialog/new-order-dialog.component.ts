import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { CartService } from '../../views/cart/service/cart.service';
import { OrderItem } from '../../shared/model/order-item';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { MatListItem } from '@angular/material/list';
import { MatBadge } from '@angular/material/badge';
import { PaymentMethod } from '../../shared/model/enum/payment-method';
import { Order } from '../../shared/model/order';
import { OrderService } from '../../shared/service/order.service';
import { NotificationService } from '../../shared/service/notification.service';

@Component({
  selector: 'app-new-order-dialog',
  standalone: true,
  imports: [
    MatExpansionPanelTitle,
    MatInput,
    ReactiveFormsModule,
    MatFormField,
    MatDialogTitle,
    MatIconButton,
    MatButton,
    MatExpansionPanelHeader,
    MatAccordion,
    MatExpansionPanel,
    MatIcon,
    MatSelect,
    MatOption,
    NgForOf,
    MatLabel,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    CurrencyPipe,
    MatGridList,
    MatGridTile,
    MatListItem,
    MatBadge,
    MatMiniFabButton,
    FormsModule,
  ],
  templateUrl: './new-order-dialog.component.html',
  styleUrl: './new-order-dialog.component.scss',
})
export class NewOrderDialogComponent implements OnInit {
  orderForm: FormGroup;
  cartItems: OrderItem[];
  paymentMethods = Object.values(PaymentMethod);

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewOrderDialogComponent>,
    private cartService: CartService,
    private orderService: OrderService,
    private notificationService: NotificationService,
  ) {
    this.cartItems = this.cartService.getCartItemsFromLocalStorage();
    this.orderForm = this.fb.group({
      customerId: ['', [Validators.required, Validators.min(1)]],
      paymentMethod: ['', Validators.required],
      message: [''],
    });
  }

  ngOnInit() {
    this.dialogRef.updateSize('700px', 'auto');
  }

  createOrder() {
    if (!this.orderForm.valid) {
      return;
    }

    const customerId = this.orderForm.value.customerId;
    const paymentMethod = this.orderForm.value.paymentMethod.replace(' ', '_');
    const order = new Order(customerId, this.cartItems, paymentMethod);

    this.orderService.createOrder(order).subscribe({
        next: (response) => {
          let message = 'Order placed';
          if (order.paymentMethod !== PaymentMethod.CASH) {
            message += '. You can pay for order in order details view.';
          }
          this.notificationService.showSuccess(message);
          this.cartService.clearCart();
          this.dialogRef.close();
        },
        error: (error) => {
          this.notificationService.showError(error, 'Could not place order');
        },
      },
    );
  }

  getTotalPrice() {
    return this.cartService.getTotalPrice();
  }
}
