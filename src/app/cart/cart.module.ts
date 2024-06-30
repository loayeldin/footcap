
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { CartComponent } from "./cart.component";
import { CartRoutingModule } from "./cart-routing.module";

@NgModule({
    declarations:[
        CartComponent,
    ],
    imports:[
      
      
        CommonModule,
        HttpClientModule,
        CartRoutingModule
     
    ]
})


export class CartModule{}