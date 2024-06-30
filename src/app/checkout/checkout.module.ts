
import { NgModule } from "@angular/core";
import { AddressComponent } from "./address/address.component";
import { CheckoutComponent } from "./checkout.component";
import { DeliveryComponent } from "./delivery/delivery.component";
import { ReviewComponent } from "./review/review.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckoutRoutingModule } from "./checkout-routing.module";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations:[
        CheckoutComponent,
        AddressComponent,
        DeliveryComponent,
        ReviewComponent,
    ],
    imports:[
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        CheckoutRoutingModule,
        HttpClientModule,
    ]
})


export class CheckoutModule{}