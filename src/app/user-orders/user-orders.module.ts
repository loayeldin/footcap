
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { UserOrdersComponent } from "./user-orders.component";
import { UserOredersRoutingModule } from "./user-orders-routing.module";


@NgModule({
    declarations:[
        UserOrdersComponent
    ],
    imports:[
      
      
        CommonModule,
        HttpClientModule,
        UserOredersRoutingModule
     
    ]
})


export class UserOrdersModule{}