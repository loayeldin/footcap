import {NgModule} from '@angular/core'
import { Router, RouterModule, Routes } from '@angular/router'
import { CheckoutComponent } from './checkout.component'
import { AddressComponent } from './address/address.component'
import { DeliveryComponent } from './delivery/delivery.component'
import { ReviewComponent } from './review/review.component'

const routes: Routes = [
    { path: '', component: CheckoutComponent, children: [
      { path: '', redirectTo: 'address', pathMatch: 'full' },
      { path: 'address', component: AddressComponent },
      { path: 'delivery', component: DeliveryComponent },
      { path: 'review', component: ReviewComponent }
    ]}
  ];
@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class CheckoutRoutingModule{}