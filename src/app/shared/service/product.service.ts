import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../model/page/page';
import { REST_BASE_URL } from '../../app.properties';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private httpClient: HttpClient) {
  }

  getProducts(page: number, size: number, sortField: string, direction: string): Observable<Page<Product>> {
    const queryParams = {
      page,
      size,
      sortField,
      direction,
    };

    return this.httpClient
    .get<Page<Product>>(REST_BASE_URL + '/products', { params: queryParams });
  }
}
