import{NgModule} from '@angular/core'
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AdminComponent } from './admin.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardOverviewComponent } from './dashboard-overview/dashboard-overview.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';

@NgModule({
    declarations:[
        AdminComponent,
        AdminOrdersComponent,
        OrderDetailsComponent,
        DashboardOverviewComponent,
        FilterPipe
    ],
    imports:[
        CommonModule,
        MatPaginatorModule,
        FontAwesomeModule,
        HttpClientModule,
        AdminRoutingModule,
        FormsModule,
       

    ]
})
export class AdminModule{}