import { Routes } from '@angular/router';
import { OrdersTableComponent } from './views/orders-table/orders-table.component';
import { ProductsTableComponent } from './views/products-table/products-table.component';
import { CartComponent } from './views/cart/cart.component';

export const routes: Routes = [
  { path: '', component: ProductsTableComponent },
  { path: 'orders', component: OrdersTableComponent },
  { path: 'products', component: ProductsTableComponent },
  { path: 'cart', component: CartComponent },
];
