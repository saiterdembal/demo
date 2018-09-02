import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';


import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';

import { CategoryComponent } from './admin/category/category.component';
import { ProductComponent } from './admin/product/product.component';
import { HomeComponent } from './home/home.component';
import { SiteProductComponent } from './site-product/site-product.component';
import { SiteCategoryComponent } from './site-category/site-category.component';
import { ProductImageComponent } from './admin/product-image/product-image.component';
import { ProductEditComponent } from './admin/product-edit/product-edit.component';
import { ProductFilterPipe } from './site-product/product-filter.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthService } from './common/services/auth.service';
import { CartService } from './common/services/cart.service';
import { CartComponent } from './cart/cart.component';
import { CartSummaryComponent } from './cart/cart-summary/cart-summary.component';
import { ShippingDetailComponent } from './shipping-detail/shipping-detail.component';
import { AuthInterceptorService } from './common/services/auth-interceptor.service';

export const appRoute: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home', },
  {
    path: 'home', component: HomeComponent,
    children: [
      { path: '', component: SiteProductComponent },
      { path: 'product/list', component: SiteProductComponent },
      { path: 'product/list/:catId', component: SiteProductComponent },
      { path: 'my-cart', component: CartComponent },
      { path: 'shipping-detail', component: ShippingDetailComponent,  canActivate: [AuthGuard], },
    ]
  },
  { path: 'home/login', component: LoginComponent },
  { path: 'home/register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: CategoryComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'product', component: ProductComponent},

    ]
    
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    CategoryComponent,
    ProductComponent,
    HomeComponent,
    SiteProductComponent,
    SiteCategoryComponent,
    ProductImageComponent,
    ProductEditComponent,
    ProductFilterPipe,
    LoginComponent,
    RegisterComponent,
    CartComponent,
    CartSummaryComponent,
    ShippingDetailComponent,
  ],
  exports: [ProductFilterPipe],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoute),
    HttpClientModule,
    FormsModule,
  ],
  providers: [AuthService, CartService, AuthGuard , 
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
