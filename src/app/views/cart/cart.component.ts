import { Component } from '@angular/core';
import { MatList, MatListItem, MatListItemIcon } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatLine } from '@angular/material/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatDialogTitle } from '@angular/material/dialog';
import { OrderItem } from '../../shared/model/order-item';
import { CartService } from './service/cart.service';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatGridList, MatGridTile } from '@angular/material/grid-list';
import { DialogService } from '../../dialog/service/dialog.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    MatList,
    MatIcon,
    MatLine,
    MatIconButton,
    MatDialogTitle,
    MatListItem,
    CurrencyPipe,
    NgForOf,
    MatCard,
    MatCardContent,
    MatDivider,
    MatGridList,
    MatGridTile,
    MatButton,
    MatListItemIcon,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {

  cartItems: OrderItem[];

  constructor(private cartService: CartService, private dialogService: DialogService) {
    this.cartItems = this.cartService.cartItems;
  }

  addToCart(item: OrderItem) {
    this.cartService.addToCart(item);
  }

  removeFromBasket(item: OrderItem) {
    this.cartService.removeFromCart(item);
  }

  removeOneFromBasket(item: OrderItem) {
    this.cartService.removeOneFromCart(item);
  }

  getTotalPrice(): number {
    return this.cartService.getTotalPrice();
  }

  placeOrder() {
    this.dialogService.openCreateOrderDialog();
  }
}
