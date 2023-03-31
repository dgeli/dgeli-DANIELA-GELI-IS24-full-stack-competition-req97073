import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog} from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';

import { ProductModel } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';

import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  public productsList: ProductModel[] = []
  product = new ProductModel;
  productIdToDelete!: number;

  public countProducts = 0;

  searchForm!: FormGroup;
  filteredProductsList: ProductModel[] = [];
  
  message: String = "";
  messageAlert: String = "";
  
  isAlertSuccess: boolean = false;
  isAlertDanger: boolean = false;

  isModalOpen: boolean = false; 

  selectedProductId!: number;
  selectedProductIndex!: number;

  constructor (public dialog:MatDialog, public productsService: ProductsService, private activatedRoute: ActivatedRoute, 
    private router: Router, public modalRef: BsModalRef ){
    this.createSearchForm();
  }

  ngOnInit(){
  this.getProducts();
  }

  /*gets all products*/
  getProducts(){
    this.productsService.getProducts().subscribe(resp => {
      if (resp.length != 0){
        this.productsList = resp;
        this.filteredProductsList = resp;
      this.countProducts = this.productsList.length;
      } else {
        this.isAlertSuccess = true,
        this.messageAlert = "No product found"
      }
    },
    (error: HttpErrorResponse) => {this.isAlertDanger = true,
                this.messageAlert = "An error occurred while getting  the product";
                this.productsList= []}
    )
  }


  /*Initialize the search form*/
    createSearchForm (){
     this.searchForm = new FormGroup({
     scrumMasterItem: new FormControl(''),
     developerItem: new FormControl('')
     }); 
   }


 /*Sends the add-product component the data of the product to be edited*/
  setSelectedProduct(productId: number, index: number) {
    this.selectedProductId = productId;
    this.selectedProductIndex = index;

    const navigationExtras = {
      state: {
        product: this.filteredProductsList[this.selectedProductIndex]
      }
    };
    this.router.navigate([`/editProduct/${productId}`], navigationExtras);
}


  /*Delete a product*/
  delete(productIdToDelete: number) {
   this.productsService.deleteProduct(productIdToDelete).subscribe(resp => {
         this.isAlertSuccess = true;
         this.messageAlert = "The product was delete";
         this.filteredProductsList.splice(this.selectedProductIndex, 1);
         this.countProducts = this.filteredProductsList.length; 
         this.productsService.getProducts().subscribe(resp => {
         this.filteredProductsList =resp;

         });
       },
       (error: HttpErrorResponse) => {
         this.isAlertDanger = true;
         this.message = error.message;
       });
   }


  /*Filter products by scrum master and/or developer name*/
  search() {
      const scrumMaster = this.searchForm.get('scrumMasterItem')?.value;
      const developer = this.searchForm.get('developerItem')?.value;
    
      if (scrumMaster || developer) {
        this.filteredProductsList = this.productsList.filter(product => 
          (scrumMaster ? product.scrumMasterName?.toLowerCase().includes(scrumMaster.toLowerCase()) : true) && 
          (developer ? product.Developers?.some(d => d.toLowerCase().includes(developer.toLowerCase())) : true) 
        );
        this.countProducts = this.filteredProductsList.length;
      } else { 
        this.filteredProductsList = this.productsList;
        this.countProducts = this.filteredProductsList.length;
      }
    }
    
}