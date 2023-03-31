import { RouterModule, Routes} from "@angular/router";
import { ProductListComponent } from "./components/product-list/product-list.component";
import { AddProductComponent } from "./components/add-product/add-product.component";


const APP_ROUTES: Routes = [
    {path: 'home', component: ProductListComponent, title: 'Home - Web Applications Management' },
    {path: 'addProduct', component: AddProductComponent, title: 'Add application - Web Applications Management' },
    {path: 'editProduct/:product', component: AddProductComponent, title: 'Edit application - Web Applications Management' },
    {path: '**', pathMatch:'full', redirectTo:'home', title: 'Home'},
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);