import {NgModule} from '@angular/core'
import { Router, RouterModule, Routes } from '@angular/router'
import { ProductDetailsComponent } from './product-details.component';


const routes: Routes = [
    {path:'details/:id',component:ProductDetailsComponent}
  ];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ProductDetailsRoutingModule{}