import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent {

  constructor(private router:Router,private adminService:AdminService,private activatedRoute:ActivatedRoute){}
  orderId!:any
  order!:any
  userId!:any
  ngOnInit(){
    this.activatedRoute.params.subscribe(params=>{
      this.orderId = params['id']
      console.log(this.orderId);
      
    })


    this.adminService.getOrderById(this.orderId).subscribe(data=>{
      console.log(data);
      this.order = data
      this.userId = this.order.userId
      
    })
  }

  save(){
   this.adminService.saveUpdatedOrder(this.userId,this.order).subscribe(data=>{
    console.log(data);
    this.router.navigate(['/admin'])
    
   });
  // console.log(this.order);
  
    
  }

}
