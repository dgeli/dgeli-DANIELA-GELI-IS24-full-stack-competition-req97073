import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../shared/confirm/confirm.component';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProductsService } from '../../services/products.service';
import { ProductModel } from 'src/app/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-application',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: ProductModel = new ProductModel();
  productForm!: FormGroup;

  countAddDevControl: number = 0;
  countDeleteDevControl: number = 0;

  message: String = "";
  messageAlert: String = "";
  isAlertSuccess: boolean = false;
  isAlertDanger: boolean = false;

  constructor( public dialog:MatDialog, private fb: FormBuilder, private activatedRoute: ActivatedRoute,
    public productsService: ProductsService) {
    this.createForm();

  }
  ngOnInit(): void{

    /*Gets the product received as a parameter*/
    this.activatedRoute.paramMap.subscribe(params => {
      const productId = Number(params.get('product'));
      this.product = history.state.product;
    });
    if (this.product){
      this.getProduct(this.product);
    }
  }

  /*Initializes the editing form with the data received from the product to be edited*/
  getProduct(prod: ProductModel) {
    this.productForm.patchValue({
      productName: prod.productName,
      scrumMasterName: prod.scrumMasterName,
      productOwnerName: prod.productOwnerName,
      startDate: prod.startDate,
      methodology: prod.methodology
    });
    setTimeout(() => {
      this.product.Developers.forEach((developer: String) => {
        this.Developers.push(this.fb.control(developer));
      });
    });
  }


  /*Initialize the form*/
  createForm(){
    this.productForm = this.fb.group({
      productName: ['', Validators.required ],
      scrumMasterName: ['', Validators.required ],
      productOwnerName: ['', Validators.required ],
      Developers: this.fb.array([], Validators.required),
      startDate: ['', [Validators.required, Validators.pattern(/^\d{4}\/\d{2}\/\d{2}$/)]],
      methodology: ['', Validators.required ],
    });
  }

  /*** Methods to validate form fields **** */
    get productNameNotValid() {
      return this.productForm.get('productName')?.invalid && this.productForm.get('productName')?.touched
    }

    get scrumMasterNameNotValid() {
      return this.productForm.get('scrumMasterName')?.invalid && this.productForm.get('scrumMasterName')?.touched
    }

    get productOwnerNameNotValid() {
      return this.productForm.get('productOwnerName')?.invalid && this.productForm.get('productOwnerName')?.touched
    }

    get startDateNotValid() {
      return this.productForm.get('startDate')?.invalid && this.productForm.get('startDate')?.touched
    }

    get startDateFormatNotValid() {
      return this.productForm.get('startDate')?.dirty || this.productForm.get('startDate')?.touched
    }

    get DevelopersNotValid() {
      return this.productForm.get('Developers')?.dirty || this.productForm.get('Developers')?.touched
    }

    get Developers() {
      return this.productForm.get('Developers') as FormArray;
    }
  /*** ************************* **** */


  /*Add a developer in the form*/
  addDeveloper() {
    this.Developers.push(  this.fb.control('')  );
    this.countAddDevControl = this.countAddDevControl + 1;

    if (this.countAddDevControl > 4) {
      const addDeveloperBtn = document.getElementById('addDeveloper') as HTMLButtonElement;
      addDeveloperBtn.disabled = true;
    }

    if (this.countDeleteDevControl > 4){
      const addDeveloperBtn = document.getElementById('addDeveloper') as HTMLButtonElement;
      addDeveloperBtn.disabled = true;
    }
  }


  /*Delete a developer in the form*/
  deleteDeveloper(i: number) {
    this.Developers.removeAt(i);
    const addDeveloperBtn = document.getElementById('addDeveloper') as HTMLButtonElement;
    addDeveloperBtn.disabled = false;
    this.countDeleteDevControl = this.countDeleteDevControl + 1;
  }


  /*If the product already exists, it allows to edit it, if it does not exist, add it*/
  save(){
      if(this.productForm.invalid){
        this.productForm.markAllAsTouched();
      } 
      else {
        /*Product Editing*/
        if (this.product?.productId){
          const productCopy = Object.assign({}, this.product);
          productCopy.Developers = this.productForm.get('Developers')?.value;
          productCopy.methodology = this.productForm.get('methodology')?.value;
          this.message = "Are you sure you want to edit the product?"
        
           /*Open confirmation dialog*/
          const dialog = this.dialog.open(ConfirmComponent, {
            position: { left: '45%', top: '-40%' },
            width:'18rem',
            data: this.message,
          });
    
          /*Edit the product*/
          dialog.afterClosed().subscribe(
            (result) => {
              if(result){
                this.product.Developers = productCopy.Developers;
                this.product.methodology = productCopy.methodology;
                this.productsService.editProduct(this.product).subscribe(resp => {this.isAlertSuccess = true, 
                  this.messageAlert= "The product was edit"},
                  (error: HttpErrorResponse) => {this.isAlertDanger = true,
                    this.messageAlert= "An error occurred while editing the product"})
              }
            }, (error) => {this.isAlertDanger = true,
              this.messageAlert= "An error occurred while editing the product"}
          )
        } else {
          /*Product Saving*/
          const productCopy = Object.assign({}, this.product);
          productCopy.productName = this.productForm.get('productName')?.value;
          productCopy.scrumMasterName = this.productForm.get('scrumMasterName')?.value;
          productCopy.productOwnerName = this.productForm.get('productOwnerName')?.value;
          productCopy.Developers = this.productForm.get('Developers')?.value;
          productCopy.startDate = this.productForm.get('startDate')?.value;
          productCopy.methodology = this.productForm.get('methodology')?.value;
          this.message = "Are you sure you want to save the product?"

           /*Open confirmation dialog*/
          const dialog = this.dialog.open(ConfirmComponent, {
            position: { left: '45%', top: '-40%' },
            width:'18rem',
            data: this.message
          })

          /*Add the product*/
          dialog.afterClosed().subscribe(
            (result) => {
              if (result) {
                this.productsService.addProduct(productCopy).subscribe(
                  resp => {
                    this.productForm.reset(),
                    this.isAlertSuccess = true,
                    this.messageAlert= "The product was saved"
                  },
                  (error: HttpErrorResponse) => {
                    this.isAlertDanger = true,
                    this.messageAlert= "An error occurred while saving the product"
                  }
                )
              }
            }
          )     
        }
      }
    }   
}
