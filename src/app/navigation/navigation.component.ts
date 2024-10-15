import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { OrdersTableComponent } from '../views/orders-table/orders-table.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DialogService } from '../dialog/service/dialog.service';
import { MatBadge } from '@angular/material/badge';
import { CartService } from '../views/cart/service/cart.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    OrdersTableComponent,
    RouterOutlet,
    RouterLink,
    MatBadge,
  ],
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay(),
  );


  constructor(private dialogService: DialogService, private cartService: CartService) {
  }

  openCreateOrderModal() {
    if (this.getCartItemsCount() !== 0) {
      this.dialogService.openCreateOrderDialog();
    }
  }

  getCartItemsCount() {
    return this.cartService.cartItems.length;
  }
}
