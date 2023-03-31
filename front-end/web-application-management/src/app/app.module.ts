import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_ROUTING } from './app.routes';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ConfirmComponent } from './components/shared/confirm/confirm.component';

import {ProductsService} from './services/products.service'

import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    AddProductComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    APP_ROUTING,
  ],
  exports: [
    MatDialogModule,
  ],

  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
