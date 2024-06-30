import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { AdminOrdersComponent } from "./admin-orders/admin-orders.component";
import { AdminComponent } from "./admin.component";

const routes: Routes = [
    { path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'admin-orders', pathMatch: 'full' },
      { path: 'admin-orders', component: AdminOrdersComponent },
      { path: 'order-details/:id', component: OrderDetailsComponent }
    ]}
  ];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AdminRoutingModule{}