import { Component, Input } from '@angular/core';
import { AdminService } from '../admin.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {
  ordersData:any[] =[]
  paginatedOrders: any[] = []; 

  statusFliter = 'All'
  searchText: string = '';
  searchId: string = '';
  searchDate: string = '';


  totalLength = 0; 
  pageSize = 2; 
  pageSizeOptions = [2,5, 10,25, 50]; 

  constructor(private adminService:AdminService){}
  ngOnInit() {
   
    console.log(this.ordersData);
      this.adminService.Data.subscribe(data=>{
        if(data){
       
          console.log(data);
          
        
          data.forEach((order: any) => {
            console.log(order.userInfo.name);
            // this.userName = order.userInfo.name
            
            if (order.orders) { 
              order.orders.forEach((orderItem: any) => {
                console.log(orderItem); 
                this.ordersData.push(orderItem)
              });
            }
          });
        
          console.log(this.ordersData);
          


          this.totalLength = this.ordersData.length; // Update totalLength with the length of ordersData

          this.updatePaginator();
        }
      })
   
  }

  

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    const startIndex = event.pageIndex * event.pageSize;
    // Slice the array to get the orders for the current page
    this.paginatedOrders = this.ordersData.slice(startIndex, startIndex + event.pageSize);
  }

  private updatePaginator() {
    // Initialize paginatedOrders with data for the first page
    this.paginatedOrders = this.ordersData.slice(0, this.pageSize); 
  
  }
  onStatusChange(event: any): void {
    console.log(this.statusFliter);
    
  }
}
