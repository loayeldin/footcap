import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductDetailsRoutingModule } from "./product-details-routing.module";
import { ProductDetailsComponent } from "./product-details.component";

@NgModule({
    declarations:[
     
    ProductDetailsComponent,
    ],
    imports:[
        
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ProductDetailsRoutingModule,
        HttpClientModule,
    ]
})


export class ProductDetailsModule{}






