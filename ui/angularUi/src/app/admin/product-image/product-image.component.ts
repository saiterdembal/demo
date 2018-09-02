import { Component, OnInit, DoCheck } from '@angular/core';
import { ProductImageService } from '../../common/services/product-image.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.css'],
  providers: [ProductImageService]
})

export class ProductImageComponent implements OnInit, DoCheck {
  images: String[];
  folderId: string;
  selectedFile: File = null;
  path = environment.path;
  constructor(
    private productImageService: ProductImageService,
    private http: HttpClient
    ) {}
    onFileSelected(e) {
      this.selectedFile = <File>e.target.files[0];
    }
  imgform() {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    fd.append('folderid', this.folderId);
      this.http.post(this.path + '/image/add', fd, {
        reportProgress: true,
        observe: 'events'
      }).subscribe(e => {
        if (e.type === HttpEventType.UploadProgress) {
          console.log('Upload Progress' + Math.round(e.loaded / e.total * 100 ) + '%');
        } else if (e.type === HttpEventType.Response) {
          console.log(e);
        }
        });
  }

  ngOnInit() {
  }

  ngDoCheck() {
}

  loadImages(id: string) {
    this.folderId = id;
    this.productImageService.getImages(id).subscribe(i => this.images = i);
  }


  deleteImage(imgName: string, id: string) {
    id = this.folderId;
    this.productImageService.deleteImage(imgName, id);
  }

  setDefaultImage(imgName: string, id: string) {
    id = this.folderId;
    this.productImageService.setDefaultImage(imgName, id);
  }


}

