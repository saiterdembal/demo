import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from '../../../../node_modules/rxjs';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {
  path = environment.path;
  selectedFile: File = null;
  constructor(private http: HttpClient) {}
  getImages(id: string): Observable<String[]> {
    return this.http.get<String[]>(this.path + '/image/list/', {params : {pid : id} });
  }
  onFileSelected(e) {
    this.selectedFile = <File>e.target.files[0];
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(this.path + '/image/add', fd).subscribe(res => {
      console.log('b');
    });
  }

  deleteImage(imgName: string, id: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post(this.path + '/image/delete', {name: imgName, id: id} , {headers: headers} )
      .subscribe();
  }

  setDefaultImage(imgName: string, id: string) {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    this.http.post(this.path + '/product/image/update', { name: imgName, id: id }, { headers: headers }).subscribe();
  }

}
