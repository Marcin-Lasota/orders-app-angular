import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { ProductService } from '../../shared/service/product.service';
import { Product } from '../../shared/model/product';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { CartService } from '../cart/service/cart.service';
import { OrderItem } from '../../shared/model/order-item';
import { NotificationService } from '../../shared/service/notification.service';
import { MatListItemIcon } from '@angular/material/list';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, DatePipe, MatButton, MatIcon, CurrencyPipe, MatListItemIcon],
})
export class ProductsTableComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Product>;

  protected totalProductsElements: number = 0;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private notificationService: NotificationService) {
  }

  displayedColumns = ['id', 'name', 'description', 'price', 'stockQuantity', 'actions'];

  ngAfterViewInit(): void {
    const page = this.paginator.pageIndex;
    const pageSize = this.paginator.pageSize;

    this.getProducts(page, pageSize, this.sort.active, this.sort.direction);

    this.sort.sortChange.subscribe((sort: Sort) => {
      this.paginator.pageIndex = 0;
      this.getProducts(0, this.paginator.pageSize, sort.active, sort.direction);
    });

    this.paginator.page.subscribe((page: PageEvent) => {
      this.getProducts(page.pageIndex, page.pageSize, this.sort.active, this.sort.direction);
    });
  }

  addToCart(product: Product) {
    if (product.stockQuantity > 0) {
      this.cartService.addToCart(new OrderItem(product));
      this.notificationService.showSuccess('Added to cart');
    }
  }

  private getProducts(page: number, pageSize: number, sortField: string, direction: string) {
    this.productService.getProducts(page, pageSize, sortField, direction).subscribe(products => {
      this.table.dataSource = products.content;
      this.totalProductsElements = products.totalElements;
    });
  }
}
