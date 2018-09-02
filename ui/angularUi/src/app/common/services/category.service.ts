import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from '../../../../node_modules/rxjs';
import { Category } from '../../model/category';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  path = environment.path;
  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(this.path + '/category/list');
  }

  addCategory(category: Category) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post(this.path + '/category/add', category, {headers: headers}).subscribe(data => {
      if (data) {
        alert('kategori kaydedildi');
      }
    });

  }
}
