import { Component, Input, SimpleChanges } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent {
   Data!:any
    constructor(private adminService:AdminService){}
  usersCount!:any
  ordersCount :number = 0
  totalSales:number = 0

  ngOnInit(){
    this.adminService.Data.subscribe(data=>{
      this.Data = data
      if(this.Data)
      {
        this.usersCount = this.Data.length
        this.getOrdersCount() 
        this.getSales()
       
        console.log(this.Data);
      }
    
      
    })
  }

  getOrdersCount() {
    for(let x=0 ; x<this.Data.length;x++){
      if(this.Data[x].hasOwnProperty('orders')){
        this.ordersCount+= this.Data[x].orders.length

      }
      



    }
  
    
  }

  getSales()
  {
    for(let x=0 ; x<this.Data.length;x++){
      
      if(this.Data[x].hasOwnProperty('orders')){
        let orders = this.Data[x].orders
        console.log(orders);
        
        for(let j =0; j<orders.length;j++){
          this.totalSales += orders[j].totalPrice
          console.log(orders[j].totalPrice);
          
         } 
      }
    



    }

    
    
  }
}
