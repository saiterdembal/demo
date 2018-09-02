import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../../model/product';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
  path = environment.path;
  getProducts(catId: string, currentPage: any, pageSize: any): Observable<Product[]> {
    return this.http.get<Product[]>(this.path + '/product/list/',
      {
        params: {
          catId: catId,
          currentPage: currentPage,
          productCount: pageSize
        }
      });
  }
  getTotalProducts(catId: string): Observable<any> {
    return this.http.get<any>(this.path + '/product/getproductcount',
      { params: { catId: catId } });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(this.path + '/product/id/', { params: { pid: id } });
  }

  getProductsAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.path + '/product/list/all', );
  }

  addProduct(product: Product ) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http
      .post(this.path + '/product/add', product, { headers: headers })
      .subscribe(data => {
        if (data) {
        }
      });

  }

  deleteProduct(id: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http
      .post(this.path + '/product/delete', {id : id}, { headers: headers }).subscribe(data => {
        if (data) {
        }
      });
  }

  editProduct(product: Product) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post(this.path + '/product/update', product , { headers: headers }).subscribe(data => {
      if (data) {
        alert('ürün başarıyla kaydedildi');
      }
    });
  }
}
